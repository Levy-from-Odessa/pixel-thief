import { useActor } from "@xstate/react";
import { MonsterActorType } from "../../machine/monsterMachine/types"
import { convertCoordToPosition } from "../../utils/convertCoordToPosition";
import monsterGif from '../../assets/images/monster.gif'
import { styled } from "styled-components";
import { Image } from "../Image";


const Layout = styled.div`
  position: absolute;
`

interface PropsType{
  actor: MonsterActorType
}

export const Monster = ({actor}: PropsType) => {
  const [state, send] = useActor(actor);
  

  const [x, y] = convertCoordToPosition(state.context.coords);
  

  return(
    <Layout style={{left: x, top: y}}>
      <Image src={monsterGif} alt="monster" />
    </Layout>
  )


}