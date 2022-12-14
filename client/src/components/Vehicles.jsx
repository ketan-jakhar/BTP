import styled from "styled-components";
import { AvailableVehicles } from "../data";
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
const Desc = styled.p`
	margin: 5px 0px;
	font-size: 20px;
	font-weight: 500;
	letter-spacing: 3px;
`;
const Title = styled.h1`
	font-size: 20px;
`;
const Vehicles = () => {
	return (
		<Container>
			{AvailableVehicles.map((item) => (
				<div>
					<Product item={item} key={item.id} />
					<InfoContainer>
						<Title>{item.title}</Title>
						<Desc>{item.desc}</Desc>
					</InfoContainer>
				</div>
			))}
		</Container>
	);
};

export default Vehicles;
