exports.validateEmail = (req, res, next) => {
	const { email } = req.body;
	let regexEmail = /^[A-Za-z0-9._%+-]+@lnmiit.ac.in$/;
	if (email.match(regexEmail)) {
		next();
	} else {
		const statusCode = 400;
		return res.status(statusCode).json({
			status: "error",
			message: "Use the registered email address to access",
			statusCode,
		});
	}
};

exports.validateRegister = (req, res, next) => {
	const { password, passwordConfirm, phoneNumber } = req.body;
	// password min length 6
	if (!password || password.length < 6) {
		const statusCode = 400;
		return res.status(statusCode).json({
			status: "error",
			message: "Password must be equal to atleast 6 characters",
			statusCode,
		});
	}

	if (!phoneNumber) {
		const statusCode = 400;
		return res.status(statusCode).json({
			status: "error",
			message: "Please enter a valid Mobile Number",
			statusCode,
		});
	}

	// password confirm
	if (!passwordConfirm || password != passwordConfirm) {
		const statusCode = 400;
		return res.status(statusCode).json({
			status: "error",
			message: "Both the passwords must match",
			statusCode,
		});
	}
	next();
};

exports.validateUser = (req, res, next) => {
	if (req.session && req.session.UserId) {
		//Authorization successful
		next();
	} else {
		//Unauthorized
		const statusCode = 403;
		return res.status(statusCode).json({
			status: "error",
			data: null,
			message: "User Authentication failed. Please login to continue.",
			statusCode,
		});
	}
};

exports.validateAdmin = (req, res, next) => {
	if (req.session && req.session.Admin) {
		//Authorization successful
		next();
	} else {
		//Unauthorized
		const statusCode = 401;
		return res.status(statusCode).json({
			status: "error",
			data: null,
			message: "Admin Authentication failed. Please login to continue.",
			statusCode,
		});
	}
};
