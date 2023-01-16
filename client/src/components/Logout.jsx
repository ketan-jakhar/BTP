import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
	const navigate = useNavigate();
	const handleLogout = async (e) => {
		// e.preventDefault();
		try {
			await axios.get("http://localhost:4000/api/auth/logout");
			localStorage.removeItem("isLoggedIn");
			navigate("/");
			// redirect to login or home page
		} catch (err) {
			console.log(err);
		}
	};

	return <button onClick={(e) => handleLogout(e)}>Logout</button>;
};

export default Logout;
