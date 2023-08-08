import { assign, createMachine } from "xstate";
import { PlayerContextType, PlayerEventType, PlayerStateType, PlayerStates, PlayerEvents, ArrowButtonClickedType } from "./types";
import { PLAYER_STARTING_COORD, PLAYER_STARTING_HEALTH } from "../../constants";
import { choose, log, sendParent } from "xstate/lib/actions";
import { getTargetCoords } from "../../utils/getTargetCoords";
import { getIsOnGrid } from "../../utils/getIsOnGrid";
import { GameEvents, GamePlayerEvents } from "../gameMachine/types";


export const playerMachine = createMachine<PlayerContextType, PlayerEventType, PlayerStateType>({
  id: "player",
  context: {
    coords: PLAYER_STARTING_COORD,
    health: PLAYER_STARTING_HEALTH
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
        },
        [GamePlayerEvents.PLAYER_ATTACKED]: {
          actions:  'playerAttacked',
          target: PlayerStates.DETERMINING
        }
      }
    },
    [PlayerStates.DETERMINING]: {
      always: [
        {
          cond: 'isPlayerDead',
          target: PlayerStates.DEAD
        },
        {
          target: PlayerStates.ALIVE
        }
      ]
    },
    [PlayerStates.DEAD]: {
      entry: ['broadcastPlayerDied']
    }
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

    }),
    playerAttacked: assign((context) => ({
      health: context.health - 1
    })),
    broadcastPlayerDied: sendParent(GameEvents.PLAYER_DIED)
  },
  guards: {
    isSquareAvalible: (context: PlayerContextType, event: PlayerEventType): boolean => {
      if(event.type !== PlayerEvents.ON_ARROW_BUTTON_CLICKED) return false

      const {coords} = context
      const {direction} = event
      const targetCoords = getTargetCoords({coords, direction})

      return getIsOnGrid(targetCoords)
    },
    isPlayerDead: (context) => context.health === 0
  }
})