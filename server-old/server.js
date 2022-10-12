const compression = require("compression");
const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// const path = require("path");

// defining routes
const adminRoutes = require("../routes/admin");
const authRoutes = require("../routes/auth");
const carPoolRoutes = require("../routes/carPool");
const recycleRoutes = require("../routes/recycle");
const shopRoutes = require("../routes/shop");
const userRoutes = require("../routes/user");

//dotenv config
dotenv.config({ path: "./.env" });

require("./config/db.config.js");

const app = express();

// CORS middleware
app.use(cors());

// Parsing middleware

// morgan logger middleware
app.use(morgan("dev"));

// gzip compression for optimization
app.use(compression());

// Express session
app.use(
	session({
		secret: process.env.SESSION_SK,
		resave: true,
		saveUninitialized: true,
		expires: Date.now() + 30 * 24 * 60 * 60 * 1000,
	})
);

// Cookie Parser
app.use(cookieParser());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json());

// Parse text/html
app.use(express.text());

//All routes

// Admin Routes
app.use("/admin", adminRoutes);

// Authentication Routes
app.use("/", authRoutes);

// Car Pool Routes
app.use("/carpool", carPoolRoutes);

// Recycle Routes
app.use("/recycle", recycleRoutes);

// Shop Routes
app.use("/shop", shopRoutes);

// User Routes
app.use("/profile", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
