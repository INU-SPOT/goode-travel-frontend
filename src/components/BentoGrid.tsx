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
  grid-template-columns: repeat(10, 1fr);
  gap: 18px;
  grid-auto-rows: 20px;
`;

const GridItemWrapper = styled.div<{ width: number; height: number }>`
  grid-row-end: span ${({ height }) => height};
  grid-column-end: span ${({ width }) => width};
`;

export default function BentoGrid({ items }: BentoGridProps) {
  return (
    <GridContainer>
      {items.map((item) => (
        <GridItemWrapper key={item.id} width={item.width} height={item.height}>
          {item.component}
        </GridItemWrapper>
      ))}
    </GridContainer>
  );
}
