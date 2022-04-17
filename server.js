const compression = require("compression");
const morgan = require("morgan");
const express = require("express");

const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
const session = require("express-session");
const cookieParser = require("cookie-parser");

// const path = require("path");

// routes
const authRoutes = require("./routes/auth");

const shopRoutes = require("./routes/shop");

dotenv.config({ path: "./.env" });

require("./config/db.config.js");

const app = express();

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

// Authentication Routes
app.use("/", authRoutes);

// LNM Shop Routes
app.use("/shop", shopRoutes);

app.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
