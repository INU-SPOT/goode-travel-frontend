import styled from "styled-components";
import GoodeCard from "./GoodeCard";
import { ItemsResponse } from "../../types/item";

interface GoodeListProps {
  goodes: ItemsResponse[];
}

export default function GoodeList({ goodes }: GoodeListProps) {
  return (
    <StyledGoodeList>
      {goodes.map((goode, index) => (
        <GoodeCard key={index} goode={goode} />
      ))}
    </StyledGoodeList>
  );
}

const StyledGoodeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 24px 0 24px;
`;
