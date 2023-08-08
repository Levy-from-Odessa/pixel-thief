import { isEqual } from "lodash";
import { NUMBER_OF_GRID_COLS, NUMBER_OF_GRID_ROWS, RESERVED_COORDS } from "../constants";
import { CoordType } from "../types";

export const getRandomCoords = (): CoordType => {
  const maxRow = NUMBER_OF_GRID_ROWS - 1 
  const maxCol = NUMBER_OF_GRID_COLS - 1 
  const x = Math.floor(Math.random() * (maxCol))
  const y = Math.floor(Math.random() * (maxRow))

  const isReserved = RESERVED_COORDS.some((coord) => isEqual(coord, [x, y]))
  if(isReserved) return getRandomCoords()

  return [x, y]
}