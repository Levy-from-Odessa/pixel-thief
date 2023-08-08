import { CoordType } from "../types"
import { getRandomCoords } from "../utils/getRandomCoords"

export const GRID_SQUARE_SIZE = 64
export const NUMBER_OF_GRID_ROWS = 4
export const NUMBER_OF_GRID_COLS = 12


export const PLAYER_STARTING_COORD: CoordType = [0, 1]


export const NEXT_DOOR_COORDS: CoordType = [11, 1]
// export const BACK_DOOR_COORDS = [0, 1]

export const TREASURE_COORDS = getRandomCoords()

export const RESERVED_COORDS: CoordType[] = [NEXT_DOOR_COORDS, TREASURE_COORDS, PLAYER_STARTING_COORD]