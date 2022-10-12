const mysql = require("mysql2");

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: "root",
	database: process.env.DB_NAME,
	multipleStatements: true,
});

db.connect((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log("DB connected successfully.");
	}
});
