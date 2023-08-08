import { useMachine } from "@xstate/react";
import { gameMachine } from "../../machine/gameMachine";
import { GameEvents, GameStateValue, GameStates, LevelEvents, playerId } from "../../machine/gameMachine/types";
import { Menu } from "../Menu";

import thiefGif from '../../assets/images/thief.gif'
import skullImage from '../../assets/images/skull.png';
import treasureImage from '../../assets/images/treasure.png';
import { useEffect } from "react";
import { getFastForwardEvent } from "./getFastForwardEvent";
import { Levels } from "../Levels";
import { Grid } from "../Grid";
import { Player } from "../Player";


interface PropsType {
  fastForwardState?: GameStateValue
}


export const Game = ({fastForwardState}: PropsType) => {
  const [state, send] = useMachine(gameMachine);
  const playerActor = state.children[playerId];

  useEffect(() => {
    if (fastForwardState) {
      const fastForwardEvents = getFastForwardEvent(fastForwardState);
      
      fastForwardEvents.forEach((event) => {
        send(event);
      })
    }

  }, [fastForwardState, send])


  if (state.matches(GameStates.HOME)) {
    return (
      <Menu 
        title="Pixel Thief" 
        image={thiefGif}
        buttonLabel="Start Game"
        buttonAction={() => send(GameEvents.START)}
      />
    )
  }
  if (state.matches(GameStates.PLAYING)) {
    
    return (
      <>
        <Levels
          isItLevel={(e) => state.matches(e)}
          onGoBack={() => send(LevelEvents.GO_BACK)}
          onGoForward={() => send(LevelEvents.GO_FORWARD)}
        />
        <Grid>
          {playerActor ? <Player actor={playerActor} /> : null}
        </Grid>
      </>
    )
  }
  if (state.matches(GameStates.GAME_OVER)) {
    return (
      <Menu 
        title="Game Over"
        image={skullImage}
        buttonLabel="restart"
        buttonAction={() => send(GameEvents.RESTART)}
      />
    )
  }
  if (state.matches(GameStates.GAME_COMPLETE)) {
    return (
      <Menu 
        title="You Win!"
        image={treasureImage}
        buttonLabel="go home"
        buttonAction={() => send(GameEvents.TO_HOME)}
      />
    )
  }
    
  throw new Error("Game state not found " + state.value); 

}