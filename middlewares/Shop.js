exports.categoryBypassCheck = (req, res, next) => {
	let { category } = req.body;

	let productCategories = [
		"electronics",
		"sports",
		"accessories",
		"clothing",
		"study",
		"other",
	];

	const categoryCheck = (c) => {
		let checkCategory = productCategories.includes(c);
		return checkCategory;
	};
	console.log("++++++++++++++++++++");
	console.log(categoryCheck(category));
	console.log("++++++++++++++++++++");

	if (categoryCheck(category) == true) {
		next();
	} else {
		let statusCode = 400;
		return res.status(statusCode).json({
			status: "error",
			data: null,
			message: "Invalid category",
			statusCode,
		});
	}
};
