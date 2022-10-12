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

// Get all Pools
exports.getCarPool = (req, res) => {
	try {
		db.query(`SELECT * FROM carpool`, (err, result) => {
			if (err) {
				console.log("******ERROR******");
				console.log(err);
				console.log("*****************");
				return res.status(res.statusCode).json({
					status: "error",
					data: null,
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

// Get one pool
exports.getCabInfo = (req, res) => {
	try {
		const { id } = req.params;
		db.query(
			`SELECT owner, ridersCount, pickupLocation, dropLocation, created_at, additionalRemarks FROM carpool WHERE carPoolId = ?`,
			[id],
			(err, result) => {
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
			}
		);
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

// Create a new car pool
exports.createCarPool = (req, res) => {
	try {
		console.log("--------------------------------");
		console.log("req.session in after /create request: ", req.session);
		console.log("--------------------------------");

		const { ridersCount, pickupLocation, dropLocation, additionalRemarks } =
			req.body;
		// price = Number(price);
		// const ProductId = decrypt(req.session.ProductId);
		let { CarPoolId } = req.session;
		const UserId = decrypt(req.session.UserId);

		db.query(
			"SELECT name, phoneNumber, id FROM user WHERE id = ?",
			[UserId],
			(err, result) => {
				if (err) {
					console.log("******ERROR******");
					console.log(err);
					console.log("*****************");

					console.log("--------------------------------");
					console.log("query result(createCarPool): ", result);
					console.log("--------------------------------");
					return res.json({
						status: "error",
						data: null,
						message: err.message,
						statusCode: res.statusCode,
					});
				} else {
					console.log("--------------------------------");
					console.log("query result(createCarPool): ", result);
					console.log("--------------------------------");
					console.log("session before carpool insertion: ", req.session);
					console.log("--------------------------------");
					if (result.length) req.session.owner = result[0].name;

					db.query(
						`INSERT INTO carpool SET ridersCount = ?, pickupLocation = ?, dropLocation = ?, owner = ?, userId = ?, phoneNumber = ?,additionalRemarks = ?`,
						[
							ridersCount,
							pickupLocation,
							dropLocation,
							req.session.owner,
							UserId,
							result[0].phoneNumber,
							additionalRemarks,
						],
						(err, response) => {
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
								CarPoolId = response.insertId; //store car pool id in session
								console.log("--------------------------------");
								console.log("response: ", response);
								console.log("--------------------------------");
								console.log("session after car pool insertion: ", req.session);
								console.log("--------------------------------");
								db.query(
									"SELECT * FROM carpool WHERE carPoolId = ?",
									[CarPoolId],
									(err, resp) => {
										if (err) {
											console.log("******ERROR******");
											console.log(err);
											console.log("*****************");
											return res.json({
												status: "error",
												data: null,
												message: error.message,
												statusCode: res.statusCode,
											});
										} else {
											return res.json({
												status: "success",
												data: resp,
												message: "Car Pool published successfully",
												statusCode: res.statusCode,
												CarPoolId: response.insertId,
											});
										}
									}
								);
							}
						}
					);
				}
			}
		);
	} catch (error) {
		console.log("******ERROR******");
		console.log(error);
		console.log("*****************");
		return res.json({
			status: "error",
			data: null,
			message: error.message,
			statusCode: res.statusCode,
		});
	}
};

//Update a Car Pool
exports.updateCarPool = (req, res) => {
	const CarPoolId = req.params.id;

	const { ridersCount, pickupLocation, dropLocation, additionalRemarks } =
		req.body;
	db.query(
		"UPDATE carpool SET ridersCount = ?, pickupLocation = ?, dropLocation = ?,additionalRemarks = ? WHERE carPoolId = ?",
		[ridersCount, pickupLocation, dropLocation, additionalRemarks, CarPoolId],
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
				db.query(
					"SELECT * FROM carpool WHERE carPoolId = ?",
					[CarPoolId],
					(err, results) => {
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
							return res.json({
								status: "success",
								data: results,
								message: "CarPool updated successfully",
								statusCode: res.statusCode,
								CarPoolId,
							});
						}
					}
				);
			}
		}
	);
};

//Delete a Car Pool
exports.deleteCarPool = (req, res) => {
	const CarPoolId = req.params.id;

	db.query(
		"DELETE FROM carpool WHERE carPoolId = ?",
		[CarPoolId],
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
				return res.json({
					status: "success",
					data: null,
					message: "CarPool deleted successfully",
					statusCode: res.statusCode,
					CarPoolId,
				});
			}
		}
	);
};
