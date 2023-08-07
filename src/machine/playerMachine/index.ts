import { assign, createMachine } from "xstate";
import { PlayerContextType, PlayerEventType, PlayerStateType, PlayerStates, playerEvents } from "./types";
import { PLAYER_STARTING_COORD } from "../../constants";
import { choose, log } from "xstate/lib/actions";
import { getTargetCoords } from "../../utils/getTargetCoords";
import { getIsOnGrid } from "../../utils/getIsOnGrid";


export const playerMachine = createMachine<PlayerContextType, PlayerEventType, PlayerStateType>({
  id: "player",
  context: {
    coords: PLAYER_STARTING_COORD

  },
  initial: PlayerStates.ALIVE,
  states: {
    [PlayerStates.ALIVE]: {
      on: {
        [playerEvents.ON_ARROW_BUTTON_CLICKED]: {
          actions: 'arrowButtonClickedAction'
        }
      }
    },
    [PlayerStates.DEAD]: {}
  },
},
{
  actions: {
    arrowButtonClickedAction: choose([
      {
        cond: 'isSquareAvalible',
        actions: 'move'
      }
    ]),
    move: assign((context: PlayerContextType, event: PlayerEventType) => {
      const {coords} = context
      const {direction} = event
      const targetCoords = getTargetCoords({coords, direction})
      return{
        coords: targetCoords
      }

    })
  },
  guards: {
    isSquareAvalible: (context: PlayerContextType, event: PlayerEventType): boolean => {
      if(event.type !== playerEvents.ON_ARROW_BUTTON_CLICKED) return false

      const {coords} = context
      const {direction} = event
      const targetCoords = getTargetCoords({coords, direction})

      return getIsOnGrid(targetCoords)
    }
  }
})