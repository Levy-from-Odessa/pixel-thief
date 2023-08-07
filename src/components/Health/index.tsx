import styled from "styled-components";
import { space } from "../../styles/space";
import { Image, ImageSizeType } from "../Image";
import heart from '../../assets/images/heart.png'



const Layout = styled.div`
  display: flex;

  > *:not(:first-child) {
    margin-left: ${space(2)};
  }
`

interface PropsType {
  health: number
}


export const Health = ({health}: PropsType) => {
  let hearts = []
  for(let i = 0; i < health; i++){
    hearts.push(<Image src={heart} alt="heart" size={ImageSizeType.SMALL} />)
  }

  return (
    <Layout>
      {hearts}
    </Layout>
  )
}