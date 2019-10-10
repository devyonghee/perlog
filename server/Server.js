const express = require('express');
const http = require('http');
const axios = require('axios');
const querystring = require('querystring');
const jwt = require('jsonwebtoken');
const io = require('socket.io');

const Server = class {
    constructor(authUrl, secretKey) {
        this.app = express();
        this.authUrl = authUrl;
        this.secretKey = secretKey;
        this._setRouter();
    }

    openSocket(host, port) {
        const server = http.createServer(this.app).listen(port, host);
        console.log(`listening... ${host}:${port}`);
        return io(server);
    }

    _setRouter() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use('*', function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'POST');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        });

        this.app.post('/login', async (request, response) => {
            try {

                const { id, password } = request.body;

                if (!id || !password) {
                    return response.status(400).send('bad request');
                }

                const loginResponse = await axios.post(`${this.authUrl}/api/auth/login`, querystring.stringify({
                    username: id,
                    password
                }), { headers: { 'content-type': 'application/x-www-form-urlencoded' } });

                if (loginResponse.status !== 200) {
                    response.status(401).send('Unauthorized');
                }

                const token = jwt.sign({ id }, this.secretKey, { expiresIn: '1h' });
                response.status(200).send(token);

            } catch (e) {
                response.status(401).send(e.message);
            }

        });
    }
};

module.exports = Server;