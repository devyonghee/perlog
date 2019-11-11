const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const { combine, timestamp, printf } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}][${level}]: ${message}`;
});

const logger = new winston.createLogger({
    transports: [
        new DailyRotateFile({
            filename: `logs/%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            handleExceptions: true,
            json: false,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: true,
            format: combine(
                timestamp(),
                myFormat
            )
        })
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        format: combine(
            timestamp(),
            myFormat
        )
    }));
}

module.exports = logger;