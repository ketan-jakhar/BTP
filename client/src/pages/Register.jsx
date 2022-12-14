import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
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
	function handleRegister(e) {
		console.log("c");
		e.preventDefault();
		const form = e.target;
		// console.log("form: ", form[0].value);
		const body = {
			name: form[0].value,
			contact_number: parseInt(form[1].value),
			password: form[2].value,
			password_confirm: form[3].value,
			email: form[4].value,
		};
		console.log(body);

		axios
			.post("http://localhost:4000/api/auth/register", body)
			.then((response) => {
				console.log("res.data: ", response.data);
				if (response.data.status === "success") {
					console.log("z");
					<Navigate to='http://localhost:3000/login' />;
				} else {
					console.log("e");
					<Navigate to='http://localhost:3000/login' />;
				}
			})
			.catch((e) => console.error(e));
	}

	useEffect(() => {
		axios
			.get("http://localhost:3000/register")
			.then((response) => {
				console.log("res.data: ", response.data);
				if (response.data.status === "success") {
					console.log("s");
					<Navigate to='http://localhost:3000/login' />;
				} else {
					console.log("l");
					<Navigate to='http://localhost:3000/login' />;
				}
			})
			.catch((e) => console.error(e));
	}, []);
	// const [name, setName] = useState("");

	// async function logout() {
	// 	localStorage.removeItem("access-token");
	// }
	// window.addEventListener("beforeunload", (e) => {
	// 	e.preventDefault();
	// 	cookies.remove("access_token");
	// 	cookies.remove("refresh_token");
	// 	cookies.remove("logged_in");
	// });

	// React.useEffect(() => {
	// 	axios.get(`${baseURL}/1`).then((response) => {
	// 		setPost(response.data);
	// 	});
	// }, []);
	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form onSubmit={(e) => handleRegister(e)}>
					<Input placeholder='Name' type='text' />
					<Input placeholder='Contact Number' type='number' />
					<Input placeholder='Password' type='password' />
					<Input placeholder='Password Confirm' type='password' />
					<Input
						placeholder='Email Address (LNMIIT email id only)'
						type='email'
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
