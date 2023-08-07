import { useActor } from '@xstate/react';
import thiefGif from '../../assets/images/thief.gif'
import { PlayerActorType, playerEvents } from '../../machine/playerMachine/types'
import { Image } from '../Image';
import { styled } from 'styled-components';
import { convertCoordToPosition } from '../../utils/convertCoordToPosition';
import { usePlayerControls } from '../../hooks/usePlayerControls';
import { DirectionType } from '../../types';

interface PropsType {
  actor: PlayerActorType
}


const Layout = styled.div`
  position: absolute;
`


export const Player = ({actor}: PropsType) => {
  const [state, send] = useActor(actor);
  const {coords} = state.context;
  const [x, y] = convertCoordToPosition(coords);

  usePlayerControls({
    handleArrowDown: () => send({type: playerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.DOWN}),
    handleArrowUp: () => send({type:playerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.UP}),
    handleArrowLeft: () => send({type:playerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.LEFT}),
    handleArrowRight: () => send({type:playerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.RIGHT})
  })
  

  return (
    <Layout style={{left: x, top: y}}>
      <Image src={thiefGif} alt="thief" />
    </Layout>
  )
}