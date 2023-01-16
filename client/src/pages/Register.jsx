import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";

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
	width: 40%;
	padding: 20px;
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 15px;
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
	flex-wrap: wrap;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 20px 10px 0px 0px;
	padding: 10px;
	border-radius: 15px;
	border: none;
`;

const Agreement = styled.span`
	font-size: 12px;
	margin: 20px 0px;
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

const Register = () => {
	const [name, setName] = useState("");
	const [contactNumber, setContactNumber] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [email, setEmail] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		contactNumber: "",
		password: "",
		passwordConfirm: "",
		email: "",
	});
	const navigate = useNavigate();

	function validate() {
		let isValid = true;
		const errorMessages = {
			name: "",
			contactNumber: "",
			password: "",
			passwordConfirm: "",
			email: "",
		};

		if (!name) {
			isValid = false;
			errorMessages.name = "Name is required";
		}
		if (!contactNumber) {
			isValid = false;
			errorMessages.contactNumber = "Contact Number is required";
		}
		if (!password) {
			isValid = false;
			errorMessages.password = "Password is required";
		}
		if (!passwordConfirm) {
			isValid = false;
			errorMessages.passwordConfirm = "Confirm Password is required";
		}
		if (!email) {
			isValid = false;
			errorMessages.email = "Email is required";
		}

		setErrors(errorMessages);
		return isValid;
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!validate()) {
			return;
		}
		try {
			const body = {
				name,
				contact_number: parseInt(contactNumber),
				password,
				password_confirm: passwordConfirm,
				email,
			};
			const response = await axios.post(
				"http://localhost:4000/api/auth/register",
				body
			);
			if (response.data.status === "success") {
				navigate("/login");
			} else {
				setErrors({ email: response.data.message });
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Input
						type='text'
						placeholder='Name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						error={errors.name}
					/>
					<Input
						type='text'
						placeholder='Contact Number'
						value={contactNumber}
						onChange={(e) => setContactNumber(e.target.value)}
						error={errors.contactNumber}
					/>
					<Input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={errors.password}
					/>
					<Input
						type='password'
						placeholder='Confirm Password'
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						error={errors.passwordConfirm}
					/>
					<Input
						type='email'
						placeholder='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={errors.email}
					/>
					<Agreement>
						By creating an account, I consent to the processing of my personal
						data in accordance with the <b>PRIVACY POLICY</b>
					</Agreement>
					<Button type='submit'>CREATE ACCOUNT</Button>
					{/* <Input placeholder='Register' type='submit' value='Register' /> */}
				</Form>
			</Wrapper>
		</Container>
	);
};

export default Register;
