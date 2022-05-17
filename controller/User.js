const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

const { encrypt, decrypt, encryptId } = require("../helpers/Crypto");

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: "root",
	password: "root",
	database: "lnm_btp",
	multipleStatements: true,
});
