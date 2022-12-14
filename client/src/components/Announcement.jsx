import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #ff5050;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>One stop for LNMIITians, Get 50% OFF on your first order</Container>;
};

export default Announcement;
