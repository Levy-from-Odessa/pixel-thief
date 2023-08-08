import { useActor } from '@xstate/react';
import thiefGif from '../../assets/images/thief.gif'
import { PlayerActorType, PlayerEvents } from '../../machine/playerMachine/types'
import { Image } from '../Image';
import { styled } from 'styled-components';
import { convertCoordToPosition } from '../../utils/convertCoordToPosition';
import { usePlayerControls } from '../../hooks/usePlayerControls';
import { DirectionType } from '../../types';
import { space } from '../../styles/space';
import { Health } from '../Health';

interface PropsType {
  actor: PlayerActorType
}


const Layout = styled.div`
  position: absolute;
`
const HealthLayout = styled.div`
  position: absolute;
  top: -${space(30)};
  left: -${space(2)};
  display: flex;
`


export const Player = ({actor}: PropsType) => {
  const [state, send] = useActor(actor);
  const {coords, health} = state.context;
  const [x, y] = convertCoordToPosition(coords);

  usePlayerControls({
    handleArrowDown: () => send({type: PlayerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.DOWN}),
    handleArrowUp: () => send({type:PlayerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.UP}),
    handleArrowLeft: () => send({type:PlayerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.LEFT}),
    handleArrowRight: () => send({type:PlayerEvents.ON_ARROW_BUTTON_CLICKED, direction: DirectionType.RIGHT})
  })
  

  return (
    <>
      <HealthLayout>
        <Health health={health}/>
      </HealthLayout>

      <Layout style={{left: x, top: y}}>
        <Image src={thiefGif} alt="thief" />
      </Layout>
    </>
  )
}