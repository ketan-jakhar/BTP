import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

// const Title = styled.h1`
// 	margin: 20px;
// `;

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
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
	border-radius: 15px;
	border: 1px solid #ccc;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	// font-size: 16px;
	appearance: none;
	background-color: white;

	${mobile({
		margin: "10px 0px",
	})}
`;

const Option = styled.option`
	margin: 10px 0;
	padding: 10px;
	border-radius: 15px;
	// font-size: 16px;
`;

const Wrapper = styled.div`
	margin: 20px;
	padding: 20px;
	background: teal;
	box-shadow: 0 5px 3px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	${mobile({ width: "75%" })}
`;

const Title = styled.h1`
	font-size: 32px;
	font-weight: 700;
	text-align: center;
	padding-top: 20px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	margin-right: 20px;
	margin-left: 20px;
`;

const Input = styled.input`
	flex: 1;
	min-width: 40%;
	margin: 10px 0;
	padding: 10px;
	border-radius: 15px;
	border: none;
`;

const Button = styled.button`
	width: 40%;
	border: none;
	padding: 15px 20px;
	background-color: navy;
	color: white;
	cursor: pointer;
	border-radius: 15px;
	margin: 10px auto;
`;

const Link = styled.a`
	margin: 5px 0px;
	font-size: 12px;
	text-decoration: underline;
	cursor: pointer;
	color: navy;
`;
const Error = styled.div`
	color: red;
	font-size: 14px;
	padding: 10px;
`;

const CreateRecycle = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Container>
			<Navbar /> <hr />
			<hr />
			<Title>Create a request to recycle products</Title>
			<Wrapper>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<Input type='text' placeholder='Product name' required />
					<Input type='text' placeholder='Price' required />
					<Select>
						<Option selected>Select Category</Option>
						<Option>ELECTRONICS</Option>
						<Option>SPORTS</Option>
						<Option>CLOTHING</Option>
						<Option>ACCESSORIES</Option>
						<Option>OTHERS</Option>
					</Select>
					<Input type='text' placeholder='Description	' required />
					<Input type='text' placeholder='Additional remarks' required />
					<Button type='submit'>Create</Button>
				</Form>
			</Wrapper>
			<hr /> <Footer />
		</Container>
	);
};

export default CreateRecycle;
