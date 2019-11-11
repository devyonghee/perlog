const express = require('express');
const http = require('http');
const axios = require('axios');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const io = require('socket.io');
const logger = require('./Logger');

const Server = class {
    constructor(authUrl, secretKey) {
        this.app = express();
        this.authUrl = authUrl;
        this.secretKey = secretKey;
        this._setRouter();
    }

    openSocket(host, port) {
        const server = http.createServer(this.app).listen(port, host);
        logger.info(`listening... ${host}:${port}`);
        return io(server);
    }

    _setRouter() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST, HEAD');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.head('/', (request, response) => response.status(200).send());
        this.app.post('/login', async (request, response) => {
            try {
                let { id } = request.body;
                const { password, token } = request.body;

                if (token) {
                    id = this._getIdFromToken(token);
                } else {
                    await this._checkAuth(id)(password);
                }

                const newToken = jwt.sign({ id }, this.secretKey, { expiresIn: '1d' });
                response.status(200).send(newToken);

            } catch (e) {
                return response.status(401).send(e.message);
            }

        });
    }

    _getIdFromToken(token) {
        const decoded = jwt.verify(token, this.secretKey);
        return decoded.id;
    }

    _checkAuth(id) {
        return async (password) => {
            if (!this.authUrl) return;
            if (!id || !password) throw new Error('undefined data');
            const loginResponse = await axios.post(this.authUrl, querystring.stringify({
                username: id,
                password
            }), { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

            if (loginResponse.status !== 200) {
                throw new Error('Unauthorized');
            }
        }
    }

};

module.exports = Server;