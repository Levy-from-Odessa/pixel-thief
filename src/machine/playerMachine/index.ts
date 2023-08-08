import { assign, createMachine } from "xstate";
import { PlayerContextType, PlayerEventType, PlayerStateType, PlayerStates, PlayerEvents, ArrowButtonClickedType } from "./types";
import { PLAYER_STARTING_COORD } from "../../constants";
import { choose, log, sendParent } from "xstate/lib/actions";
import { getTargetCoords } from "../../utils/getTargetCoords";
import { getIsOnGrid } from "../../utils/getIsOnGrid";
import { GamePlayerEvents } from "../gameMachine/types";


export const playerMachine = createMachine<PlayerContextType, PlayerEventType, PlayerStateType>({
  id: "player",
  context: {
    coords: PLAYER_STARTING_COORD

  },
  initial: PlayerStates.ALIVE,
  states: {
    [PlayerStates.ALIVE]: {
      on: {
        [PlayerEvents.ON_ARROW_BUTTON_CLICKED]: {
          actions:  'arrowButtonClickedAction'
        },
        [PlayerEvents.ON_RESET_PLAYER_COORDS]: {
          actions:  'resetPlayerCoords'
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
        actions: ['move', 'broadcastPlayerMoved']
      }
    ]),
    resetPlayerCoords: assign(() => {
      return{
        coords: PLAYER_STARTING_COORD
      }
    }),
    broadcastPlayerMoved: sendParent((context: PlayerContextType) => {
      const {coords} = context
      return {
        type: GamePlayerEvents.PLAYER_MOVED,
        coords
      }
    }),
    move: assign((context: PlayerContextType, event: ArrowButtonClickedType) => {
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
      if(event.type !== PlayerEvents.ON_ARROW_BUTTON_CLICKED) return false

      const {coords} = context
      const {direction} = event
      const targetCoords = getTargetCoords({coords, direction})

      return getIsOnGrid(targetCoords)
    }
  }
})