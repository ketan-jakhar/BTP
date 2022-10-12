const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

const { encrypt, decrypt, encryptId } = require("../server/helpers/Crypto");

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: "root",
	password: "root",
	database: "lnm_btp",
	multipleStatements: true,
});

// Get user details
exports.getProfile = (req, res) => {
	try {
		const { id } = req.params;
		db.query(`SELECT * FROM user WHERE id = ?`, [id], (err, result) => {
			if (err) {
				console.log("******ERROR******");
				console.log(err);
				console.log("*****************");
				return res.status(res.statusCode).json({
					status: "error",
					data: result[0],
					message: err.message,
					statusCode: res.statusCode,
				});
			} else {
				return res.status(res.statusCode).json({
					status: "success",
					data: result,
					message: null,
					statusCode: res.statusCode,
				});
			}
		});
	} catch (error) {
		console.log("******ERROR******");
		console.log(error);
		console.log("*****************");
		return res.status(res.statusCode).json({
			status: "error",
			data: null,
			message: error.message,
			statusCode: res.statusCode,
		});
	}
};
