import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
			rgba(255, 255, 255, 0.5),
			rgba(255, 255, 255, 0.5)
		),
		url("https://www.orchidfoundation.info/sites/default/files/2021-03/The%20LNM%20Institute%20of%20Information%20Technology%20-%20%5BLNMIIT%5D%2C%20Jaipur.png")
			center;
	background-size: cover;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Wrapper = styled.div`
	width: 25%;
	padding: 20px;
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 32px;
	font-weight: 700;
	text-align: center;
	padding-bottom: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
	border-radius: 15px;
	border: none;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 15px;
	margin: 10px auto;
`;

const Link = styled.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
	color: navy;
`;
const Error = styled.div`
	color: red;
	font-size: 14px;
	padding: 10px;
`;

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:4000/api/auth/login",
				{
					email,
					password,
				}
			);
			localStorage.setItem("token", response.data.access_token);

			console.log(response);
			if (response.data.status === "success") {
				document.cookie = "access_token=" + response.data.access_token;
				document.cookie = "logged_in=" + response.data.logged_in;
				document.cookie = "refresh_token=" + response.data.refresh_token;

				navigate("/");
			} else {
				setError({ email: response.data.message });
			}
		} catch (err) {
			console.log(err);
			// setError(err.response.data.message);
		}
	};

	return (
		<Container>
			<Wrapper>
				<Title>SIGN IN</Title>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<Input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<Button type='submit'>Login</Button>
					{error && <Error>{error}</Error>}
					<Link to='/Register'>CREATE A NEW ACCOUNT</Link>
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Login;
