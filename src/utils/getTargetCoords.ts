import { CoordType, DirectionType } from './../types/index';


export const getTargetCoords = ({coords, direction}: {coords: CoordType, direction: DirectionType}): CoordType => {
  const [x, y] = coords
  switch(direction){
    case DirectionType.UP: 
      return [x, y - 1]
    case DirectionType.DOWN: 
      return [x, y + 1]
    case DirectionType.LEFT: 
      return [x - 1, y]
    case DirectionType.RIGHT: 
      return [x + 1, y]

    default: 
      throw new Error("Unknown direction "+ direction)
  }
 
}