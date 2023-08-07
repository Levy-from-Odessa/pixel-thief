import  flatten from "lodash/flatten"
import { NUMBER_OF_GRID_COLS, NUMBER_OF_GRID_ROWS } from "../constants"

const row = (rowIndex: number) :number[][] => {
  return Array(NUMBER_OF_GRID_COLS).fill(0).map((_, colIndex) => [colIndex, rowIndex])
}

export const gridCoordsList = flatten(Array(NUMBER_OF_GRID_ROWS).fill(0).map((_, rowIndex) => row(rowIndex)))