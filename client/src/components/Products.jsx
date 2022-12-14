import React, { useState } from "react";

import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
`;
const Title = styled.h1`
	font-size: 20px;
`;
const InfoContainer = styled.div`
	flex: 1;
	padding: 10px;
`;

const Wrapper = styled.div`
	padding: 20px;
	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 8px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(1px);
	-webkit-backdrop-filter: blur(1px);
	border-radius: 15px;
`;
const Desc = styled.p`
	margin: 5px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;

const Products = () => {
	// const [post, setPost] = useState(null);

	// React.useEffect(() => {
	// 	axios
	// 		.get("/api/shop/all", {
	// 			body: {},
	// 		})
	// 		.then((response) => {
	// 			setPost(response.data);
	// 		});
	// }, []);
	return (
    <Container>
      
			{popularProducts.map((item, index) => (
				<Wrapper>
					<Product item={item} key={item.id} />
					<InfoContainer>
						<Title>{item.title}</Title>
						<Desc>{item.desc}</Desc>
					</InfoContainer>
				</Wrapper>
			))}
		</Container>
	);
};

export default Products;
