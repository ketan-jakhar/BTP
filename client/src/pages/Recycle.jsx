import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Recycled from "../components/Recycled";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Title = styled.h1`
	margin: 20px;
	text-align: center;
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

const H2 = styled.h2`
	margin: 20px;
	text-align: center;
`;

const Button = styled.button`
	width: 100%;
	border: none;
	padding: 15px 20px;
	background-color: teal;
	color: white;
	cursor: pointer;
	border-radius: 15px;
	margin: 10px auto;
`;

const RecycleList = () => {
	return (
		<Container>
			<Navbar /> <hr />
			<Title>Recycleable Products</Title>
			<H2>Don't throw it, recycle it!!</H2>
			<Button>Create a recycle request</Button>
			<Recycled />
			<hr /> <Footer />
		</Container>
	);
};

export default RecycleList;
