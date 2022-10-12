const mysql = require("mysql2");
require("dotenv").config({ path: "../.env" });

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: "root",
	password: "root",
	database: "lnm_btp",
	multipleStatements: true,
});

// const db = require("../config/db.config");
const bcrypt = require("bcryptjs");

const { encrypt, decrypt, encryptId } = require("../server/helpers/Crypto");

// GET /REGISTER
exports.getRegister = (req, res) => {
	try {
		return res.json({
			status: "success",
			data: null,
			message: "Page loaded successfully",
			statusCode: res.statusCode,
		});
	} catch (err) {
		console.log(err);
		return res.json({
			status: "error",
			data: null,
			message: err.message,
			statusCode: res.statusCode,
		});
	}
};

// POST /REGISTER
exports.register = (req, res) => {
	// console.log(req.body);
	const { name, email, password, phoneNumber } = req.body;

	db.query(
		"SELECT phoneNumber FROM user WHERE LOWER(email) = ?",
		[email.toLowerCase()],
		async (err, results) => {
			if (!err) {
				if (results.length > 0) {
					const statusCode = 400;
					return res.json({
						status: "error",
						data: results,
						message: "Email or Phone Number is already in use.",
						statusCode,
					});
				} else {
					bcrypt.hash(password, 10, (err, hash) => {
						console.log("------------------");
						console.log(`Password Hash: ${hash}`);
						console.log("------------------");
						if (!err) {
							db.query(
								"INSERT INTO user SET name = ?, email = ?, phoneNumber = ?, password = ?",
								[name, email.toLowerCase(), Number(phoneNumber), hash],
								(err, result) => {
									if (!err) {
										const ed = encryptId(result.insertId);
										const dd = decrypt(ed);
										console.log("UserId(encrypted):", ed);
										console.log("UserId(decrypted):", dd);
										return res.json({
											status: "success",
											data: result,
											message: "User registered successfully",
											UserId: dd,
											statusCode: res.statusCode,
										});
									} else {
										const statusCode = 500;
										console.log(err);
										return res.status(statusCode).json({
											status: "error",
											data: null,
											message: err.message,
											statusCode,
										});
									}
								}
							);
						} else {
							const statusCode = 500;
							console.log(err);
							return res.status(statusCode).json({
								status: "error",
								data: null,
								message: err.message,
								statusCode,
							});
						}
					});
				}
			} else {
				const statusCode = 500;
				console.log(err);
				return res.status(statusCode).json({
					status: "error",
					data: null,
					message: err.message,
					statusCode,
				});
			}
		}
	);
};

// GET /LOGIN
exports.getLogin = (req, res) => {
	try {
		return res.json({
			status: "success",
			data: null,
			message: "Page loaded successfully",
			statusCode: res.statusCode,
		});
	} catch (err) {
		console.log(err);
		return res.json({
			status: "error",
			data: null,
			message: err.message,
			statusCode: res.statusCode,
		});
	}
};

// POST /LOGIN
exports.login = (req, res) => {
	const { email, password } = req.body;
	db.query(
		"SELECT * FROM user WHERE email = ?",
		[email.toLowerCase()],
		(err, result) => {
			if (!err) {
				console.log("------------------");
				console.log(`ResultLength: ${result.length}`);
				console.log("------------------");
				if (!result.length) {
					const statusCode = 404;
					return res.status(statusCode).json({
						status: "error",
						data: null,
						message: "Login credentials invalid",
						statusCode,
					});
				}

				bcrypt.compare(password, result[0].password, (bErr, bResult) => {
					if (bErr) {
						console.log("********************************");
						console.log(bErr);
						console.log("********************************");

						const statusCode = 400;
						return res.status(statusCode).json({
							status: "error",
							data: null,
							message: bErr.message,
							statusCode,
						});
					}

					if (bResult) {
						// password matches
						console.log(`bResult: ${bResult}`);

						// -----------------------
						db.query(
							"UPDATE user SET last_login = now() WHERE id = ?",
							[result[0].id],
							(error, response) => {
								if (error) {
									const statusCode = 500;
									console.log(error);
									return res.status(statusCode).json({
										status: "error",
										data: null,
										message: error.message,
										statusCode,
									});
								} else {
									// store user id in session
									req.session.UserId = encryptId(result[0].id);
									const dd = Number(decrypt(req.session.UserId));
									console.log("Encrypted uid: ", req.session.UserId);
									console.log("Decrypted uid: ", dd);
									req.session.cookie.originalMaxAge = 60 * 60 * 1000 * 30;
									req.session.cookie._expires =
										Date.now() + 60 * 60 * 1000 * 30;

									console.log("***********************");
									console.log(req.session);
									console.log("***********************");

									return res.json({
										status: "success",
										data: null,
										message: "Logged in successfully",
										statusCode: res.statusCode,
										UserId: dd,
									});
								}
							}
						);
					} else {
						const statusCode = 400;
						return res.status(statusCode).json({
							status: "error",
							data: null,
							message: "Login credentials invalid",
							statusCode,
						});
					}
				});
			} else {
				return res.status(res.statusCode).json({
					status: "error",
					data: null,
					message: "Login credentials invalid",
					statusCode: res.statusCode,
				});
			}
		}
	);
};

// GET /LOGOUT
exports.logout = (req, res) => {
	try {
		console.log("------------");
		console.log("Session before logout: ", req.session);
		console.log("------------");
		req.session.destroy();
		// console.log("Session after logout: ", req);
		return res.status(res.statusCode).json({
			status: "success",
			data: null,
			message: "Logged out successfully",
			statusCode: res.statusCode,
		});
	} catch (err) {
		return res.status(res.statusCode).json({
			status: "error",
			data: null,
			message: err.message,
			statusCode: res.statusCode,
		});
	}
};
