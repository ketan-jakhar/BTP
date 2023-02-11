import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { recycledProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const InfoContainer = styled.div`
	flex: 1;
	padding: 50px;
`;

const Title = styled.h1`
	font-size: 20px;
`;

const Recycled = () => {
	const [recycledItems, setRecycledItems] = useState([]);

	useEffect(() => {
		axios
			.get("/api/recycle/all")
			.then((res) => {
				console.log("res: ", res);
				console.log("res.data: ", res.data);
				setRecycledItems(res.data.products);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container>
			{recycledItems.map((item) => (
				<div>
					<Product item={item} key={item.id} />
					<InfoContainer>
						<Title>{item.title}</Title>
					</InfoContainer>
				</div>
			))}
		</Container>
	);
};

export default Recycled;
