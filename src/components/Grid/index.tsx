import { styled } from "styled-components";
import { GRID_SQUARE_SIZE, NUMBER_OF_GRID_COLS, NUMBER_OF_GRID_ROWS } from "../../constants";
import {  ReactNode } from "react";
import { gridCoordsList } from "../../utils/gridCoordsList";

const Layout = styled.section`
  width: ${NUMBER_OF_GRID_COLS * GRID_SQUARE_SIZE}px;
  height: ${NUMBER_OF_GRID_ROWS * GRID_SQUARE_SIZE}px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${props => props.theme.color.white};
`

interface GridSquarePropsType {
  x: number
  y: number
}

const GridSquare = styled.div<GridSquarePropsType>`
  width: ${GRID_SQUARE_SIZE}px;
  height: ${GRID_SQUARE_SIZE}px;
  position: absolute;
  top: ${p => p.y * GRID_SQUARE_SIZE}px;
  left: ${p => p.x * GRID_SQUARE_SIZE}px;

  border: 1px solid ${props => props.theme.color.white};
`

type GridPropsType = {
  children?: ReactNode
}


export const Grid = ({children}: GridPropsType) => (
  <Layout>  
    {gridCoordsList.map(([x, y]) => <GridSquare key={`${x}${y}`} x={x} y={y} />)}
    {children}
  </Layout>
)
