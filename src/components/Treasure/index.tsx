import { styled } from "styled-components"
import { convertCoordToPosition } from "../../utils/convertCoordToPosition"
import { TREASURE_COORDS } from "../../constants"
import treasureImage from '../../assets/images/treasure.png';
import { Image } from "../Image";


const Layout= styled.div`
  position: absolute;
`


export const Treasure = () => {
  const [x,y ] = convertCoordToPosition(TREASURE_COORDS)


  return (
    <Layout style={{top: y, left: x}}>
      <Image src={treasureImage} alt="treasure" />
    </Layout>
  )
  
}