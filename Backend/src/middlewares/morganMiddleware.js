const morgan = require('morgan');
const logger = require('../utils/logger');

const stream = {
    write: message => logger.info(message.substring(0, message.lastIndexOf('\n')))
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream });

module.exports = morganMiddleware;