import { isEqual } from "lodash";
import { CoordType } from "../types";
import { gridCoordsList } from "./gridCoordsList";


// todo: refactor
export const getIsOnGrid = (coords: CoordType) => {
  return gridCoordsList.some((gridCoord) => isEqual(gridCoord, coords))
}