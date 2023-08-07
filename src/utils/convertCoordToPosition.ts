import { GRID_SQUARE_SIZE } from "../constants"
import { CoordType } from "../types"


export const convertCoordToPosition = (coord: CoordType) => { 
  const [x, y] = coord
  return [x * GRID_SQUARE_SIZE, y * GRID_SQUARE_SIZE]
}