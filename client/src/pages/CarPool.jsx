import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Vehicles from "../components/Vehicles";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
	margin: 20px;
`;

const FilterContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

const Filter = styled.div`
	margin: 20px;
	${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
	padding: 10px;
	margin-right: 20px;
	${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
	return (
		<Container>
			<Navbar />
			<Announcement />
			<Title>Available Carpools</Title>
			<h2>
				<tab>Choose your destination</tab>
			</h2>
			<Vehicles />
			<Newsletter />
			<Footer />
		</Container>
	);
};

export default ProductList;
