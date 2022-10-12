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

// Get all products
exports.getShop = (req, res) => {
	try {
		db.query(`SELECT * FROM product`, (err, result) => {
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

// Get one product
exports.getProduct = (req, res) => {
	try {
		const { id } = req.params;
		db.query(
			`SELECT productName, category, price, owner, created_at FROM product WHERE productId = ?`,
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

// Create a new product
exports.makeProduct = (req, res) => {
	try {
		console.log("--------------------------------");
		console.log("req.session in after /create request: ", req.session);
		console.log("--------------------------------");

		const { productName, category, price, description, additionalRemarks } =
			req.body;
		// price = Number(price);
		// const ProductId = decrypt(req.session.ProductId);
		let { ProductId } = req.session;
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
					console.log("query result(makeProduct): ", result);
					console.log("--------------------------------");
					return res.json({
						status: "error",
						data: null,
						message: err.message,
						statusCode: res.statusCode,
					});
				} else {
					console.log("--------------------------------");
					console.log("query result(makeProduct): ", result);
					console.log("--------------------------------");
					console.log("session before product insertion: ", req.session);
					console.log("--------------------------------");
					if (result.length) req.session.owner = result[0].name;

					db.query(
						`INSERT INTO product SET productName = ?, price = ?, category = ?, owner = ?, ownerId = ?,ownerContact = ?, description = ?, additionalRemarks = ?`,
						[
							productName,
							price,
							category,
							req.session.owner,
							UserId,
							result[0].phoneNumber,
							description,
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
								ProductId = response.insertId; //store product id in session
								console.log("--------------------------------");
								console.log("response: ", response);
								console.log("--------------------------------");
								console.log("session after product insertion: ", req.session);
								console.log("--------------------------------");
								db.query(
									"SELECT * FROM product WHERE productId = ?",
									[ProductId],
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
												message: "Product published successfully",
												statusCode: res.statusCode,
												productId: response.insertId,
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

//Update a Product
exports.updateProduct = (req, res) => {
	const ProductId = req.params.id;

	const { productName, category, price, description, additionalRemarks } =
		req.body;

	db.query(
		"UPDATE product SET productName = ?, category = ?, price = ?, description = ?, additionalRemarks = ? WHERE productId = ?",
		[
			productName,
			category,
			Number(price),
			description,
			additionalRemarks,
			ProductId,
		],
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
					"SELECT * FROM product WHERE productId = ?",
					[ProductId],
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
								message: "Product updated successfully",
								statusCode: res.statusCode,
								ProductId,
							});
						}
					}
				);
			}
		}
	);
};

//Delete a Product
exports.deleteProduct = (req, res) => {
	const ProductId = req.params.id;

	db.query(
		"DELETE FROM product WHERE productId = ?",
		[ProductId],
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
					message: "Product deleted successfully",
					statusCode: res.statusCode,
					ProductId,
				});
			}
		}
	);
};
