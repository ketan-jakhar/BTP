import styled from "styled-components";
import { BuySell } from "../data";
import { CarPool } from "../data";
import { Recycle } from "../data"; // three different items categorie
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container>
      {BuySell.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}

      {CarPool.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}

      {Recycle.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
