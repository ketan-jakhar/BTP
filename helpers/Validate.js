// exports.validateOwner = (req, res, next) => {
// 	exports.queryBuilder = (getId, tableName, checkId) => {
// 		const { id } = req.params;

// 		let sqlQuery = `SELECT ${getId} FROM ${tableName} WHERE ${checkId} = ?`;

// 		db.query(sqlQuery, [id], (err, result) => {
// 			if (err) {
// 				console.log("******ERROR******");
// 				console.log(err);
// 				console.log("*****************");

// 				return res.json({
// 					status: "error",
// 					data: null,
// 					message: err.message,
// 					statusCode: res.statusCode,
// 				});
// 			} else {
// 				const { getId } = result[0];
// 				if (Number(getId) !== Number(decrypt(req.session.UserId))) {
// 					const statusCode = 403;
// 					return res.status(statusCode).json({
// 						status: "error",
// 						data: null,
// 						message: "Forbidden. Unauthorized access",
// 						statusCode,
// 					});
// 				} else {
// 					next();
// 				}
// 			}
// 		});
// 	};
// };
