import styled from "styled-components";
import ItemContainer from "./ItemContainer";
import { ItemPostResponse } from "../../types/item";

export default function ItemsContainer({
  itemPosts,
}: {
  itemPosts: ItemPostResponse[];
}) {
  return (
    <Container>
      {itemPosts.map((item, index) => (
        <ItemContainer key={index} itemPost={item} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
