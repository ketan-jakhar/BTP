import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ProductContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 20px 0;
`;

const ProductCard = styled.div`
	width: 30%;
	margin-bottom: 20px;
	padding: 20px;
	box-shadow: 0px 0px 10px #ccc;
	border-radius: 10px;
	text-align: center;
`;

const ProductImage = styled.img`
	max-width: 100%;
	margin-bottom: 20px;
	border-radius: 50%;
`;

const ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("/shop/all")
			.then((res) => {
				setProducts(res.data.products);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<ProductContainer>
			{products.map((product) => (
				<ProductCard key={product.id}>
					<ProductImage src={product.image} alt={product.name} />
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<p>Price: {product.price}</p>
					<button>Add to Cart</button>
				</ProductCard>
			))}
		</ProductContainer>
	);
};

export default ProductList;
