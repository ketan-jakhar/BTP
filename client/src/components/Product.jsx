import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import { mobile } from "../responsive";

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
	${mobile({ width: "100%" })}
`;

const ProductImage = styled.img`
	max-width: 100%;
	margin-bottom: 20px;
	border-radius: 50%;
`;

const Button = styled.button`
	width: 100%;
	border: none;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 15px;
	margin: 15px auto;
	padding: 8px 15px;
`;

const ProductList = () => {
	const [products, setProducts] = useState(new Array());

	useEffect(() => {
		axios
			.get("/api/shop/all")
			.then((res) => {
				console.log("res: ", res);
				console.log("res.data: ", res.data);
				setProducts(res.data.data.products);
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
					<Button>Add to Cart</Button>
				</ProductCard>
			))}

			{/* <ProductCard key='{product.id}'>
				<ProductImage src='{product.image}' alt='{product.name}' />
				<h3>asdas</h3>
				<p>sdas</p>
				<p>Price: asdasd</p>
				<Button>Add to Cart</Button>
			</ProductCard>
			<ProductCard key='{product.id}'>
				<ProductImage src='32' alt='{product.name}' />
				<h3>asdas</h3>
				<p>sdas</p>
				<p>Price: asdasd</p>
				<Button>Add to Cart</Button>
			</ProductCard>
		 */}
		</ProductContainer>
	);
};

export default ProductList;
