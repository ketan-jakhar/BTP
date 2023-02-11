import React, { useEffect } from "react";

import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
	height: 60px;
	${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
	padding: 10px 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
`;

const Language = styled.span`
	font-size: 14px;
	cursor: pointer;
	${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
	border: 0.5px solid lightgray;
	display: flex;
	align-items: center;
	margin-left: 25px;
	padding: 5px;
`;

const Input = styled.input`
	border: none;
	${mobile({ width: "50px" })}
`;

const Center = styled.div`
	flex: 1;
	text-align: center;
`;

const Logo = styled.h1`
	font-weight: bold;
	${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
	font-size: 14px;
	cursor: pointer;
	margin-left: 25px;
	transition: all 0.25s ease-in;
	&:hover {
		background-color: #e9f5f5;
	}
	${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
	const isLoggedIn = localStorage.getItem("token");

	const navigate = useNavigate();
	// const handleLogout = async (e) => {
	// 	// e.preventDefault();
	// 	try {
	// 		await axios.get("http://localhost:4000/api/auth/logout");
	// 		localStorage.removeItem("token");
	// 		navigate("/");
	// 		// redirect to login or home page
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const handleLogout = async (e) => {
		console.log("handleLogout called");
		try {
			await axios.get("http://localhost:4000/api/auth/logout");
			console.log("Logout successful");
			localStorage.removeItem("token");
			document.cookie = "access_token=; max-age=0; path=/;";
			document.cookie = "logged_in=; max-age=0; path=/;";
			document.cookie = "refresh_token=; max-age=0; path=/;";
			navigate("/");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Container>
			<Wrapper>
				<Left>
					<Language>EN</Language>
					{/* <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer> */}
				</Left>
				<Center>
					<NavLink style={{ color: "black" }} to='/'>
						<Logo>Good Find</Logo>
					</NavLink>
				</Center>
				<Right>
					{!isLoggedIn && (
						<>
							<MenuItem>
								<NavLink style={{ color: "black" }} to='/Register'>
									REGISTER
								</NavLink>
							</MenuItem>
							<MenuItem>
								<NavLink style={{ color: "black" }} to='/Login'>
									SIGN IN
								</NavLink>
							</MenuItem>
						</>
					)}

					{isLoggedIn && (
						<MenuItem>
							<NavLink
								style={{ color: "black" }}
								onClick={(e) => handleLogout(e)}
							>
								LOGOUT
							</NavLink>
						</MenuItem>
					)}

					<MenuItem>
						<NavLink style={{ color: "black" }} to='/Cart'>
							<Badge color='primary'>
								<ShoppingCartOutlined />
							</Badge>
						</NavLink>
					</MenuItem>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
