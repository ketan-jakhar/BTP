import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Image = styled.img`
	width: 50%;
	margin: 20px 0;
`;

const Description = styled.p`
	font-size: 16px;
	text-align: center;
	margin: 20px;
`;

const Title = styled.h1`
	font-size: 32px;
	font-weight: 700;
	text-align: center;
	margin: 20px 0;
`;

const Price = styled.p`
	font-size: 20px;
	font-weight: 600;
	text-align: center;
	margin: 20px 0;
`;

const ProductDetail = ({ products }) => {
	const { id } = useParams();
	const product = products.find((product) => product.id === id);

	return (
		<Container>
			<Image src={product.image} alt={product.name} />
			<Title>{product.name}</Title>
			<Price>${product.price}</Price>
			<Description>{product.description}</Description>
		</Container>
	);
};

export default ProductDetail;
