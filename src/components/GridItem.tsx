import React from "react";
import styled from "styled-components";

interface GridItemProps {
  width: number;
  height: number;
  color: string;
}

const Item = styled.div<GridItemProps>`
  background-color: ${({ color }) => color};
  grid-row-end: span ${({ height }) => height};
  grid-column-end: span ${({ width }) => width};
`;

export default function GridItem({ width, height, color }: GridItemProps) {
  return <Item width={width} height={height} color={color} />;
}
