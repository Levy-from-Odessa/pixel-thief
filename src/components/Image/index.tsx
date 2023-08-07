import { space } from "../../styles/space"
import {GRID_SQUARE_SIZE} from '../../constants'
import { styled } from "styled-components"

export enum ImageSizeType{
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}


const getDimension = (size?: ImageSizeType) => {
  if(size === ImageSizeType.LARGE) return space(20)
  if(size === ImageSizeType.SMALL) return space(10)
  return `${GRID_SQUARE_SIZE}px`
}

interface PropsType {
  size?: ImageSizeType
}


export const Image = styled.img<PropsType>`
  width: ${p => getDimension(p.size)};
  height: ${p => getDimension(p.size)};
  object-fit: contain;
`