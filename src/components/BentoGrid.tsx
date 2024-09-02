import React from "react";
import styled from "styled-components";

interface GridItemData {
  id: number;
  width: number;
  height: number;
  component: React.ReactNode;
}

interface BentoGridProps {
  items: GridItemData[];
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 13px;
  grid-auto-rows: 100px;
`;

const GridItemWrapper = styled.div<{ width: number; height: number }>`
  grid-row-end: span ${({ height }) => height};
  grid-column-end: span ${({ width }) => width};
`;

const BentoGrid: React.FC<BentoGridProps> = ({ items }) => {
  return (
    <GridContainer>
      {items.map((item) => (
        <GridItemWrapper key={item.id} width={item.width} height={item.height}>
          {item.component}
        </GridItemWrapper>
      ))}
    </GridContainer>
  );
};

export default BentoGrid;
