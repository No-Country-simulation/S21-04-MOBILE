const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
const path = require("path");

// config .env 
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const conn = {
    user: process.env.USER_DB,
    password: process.env.USER_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.HOST_DB,
    port: process.env.PORT_DB
};

const database = mysql.createPool(conn);

module.exports = database;