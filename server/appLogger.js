const path = require('path');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

let logsLocation = process.env.LOG_FILE_LOCATION;
if (!logsLocation) {
  logsLocation = path.resolve(__dirname, '../../logs');
}

const errorLogFile = path.resolve(logsLocation, 'node-global-search-service-error.log');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true }),
  ),
  defaultMeta: { service: 'node-global-search-service' },
  exitOnError: false,
  transports: [
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.colorize(),
      winston.format.simple(),
      winston.format.timestamp(),
    ),
  }));
} else {
  logger.add(new DailyRotateFile({
    zippedArchive: true,
    maxSize: '500m',
    maxFiles: 20, // 10gb max considering 500m each
    dirname: logsLocation,
  }));

  //
  // - Write all logs with importance level of `error` or less to `error.log`
  // - Write all logs with importance level of `info` or less to `combined.log`
  //
  logger.add(new winston.transports.File({ filename:  errorLogFile, level: 'error',  handleExceptions: false }));
  // logger.add(new winston.transports.File({ filename: infoLogFile }));
}

// for morgan
logger.stream.write = function(message, encoding){
  logger.info(message);
};

function createLoggers() {
  global.logger = {
    server: logger.child({ namespace: `${process.env.SERVICE_KEY_PREFIX}:server`, worker: global.workerId }),
    db: logger.child({ namespace: `${process.env.SERVICE_KEY_PREFIX}:server:db`, worker: global.workerId }),
    routes: logger.child({ namespace: `${process.env.SERVICE_KEY_PREFIX}:server:routes`, worker: global.workerId }),
    failure: logger.child({ namespace: `${process.env.SERVICE_KEY_PREFIX}:server:failure`, worker: global.workerId }),
  };
  global.logger.server.info('Loggers Initialized');
}

logger.initGlobalLoggers = createLoggers;

module.exports = logger;