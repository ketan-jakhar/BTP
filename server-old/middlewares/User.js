const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

// const { validateOwner } = require("../helpers/Validate");

const { encrypt, decrypt, encryptId } = require("../server/helpers/Crypto");

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: "root",
	password: "root",
	database: "lnm_btp",
	multipleStatements: true,
});

exports.validateOwner = (req, res, next) => {
	const UserId = req.params.id;

	db.query(
		"SELECT ownerId FROM product WHERE UserId = ?",
		[UserId],
		(err, result) => {
			if (err) {
				console.log("******ERROR******");
				console.log(err);
				console.log("*****************");

				return res.json({
					status: "error",
					data: null,
					message: err.message,
					statusCode: res.statusCode,
				});
			} else {
				const { ownerId } = result[0];
				if (Number(ownerId) !== Number(decrypt(req.session.UserId))) {
					const statusCode = 403;
					return res.status(statusCode).json({
						status: "error",
						data: null,
						message: "Forbidden. Unauthorized access",
						statusCode,
					});
				} else {
					next();
				}
			}
		}
	);
};
