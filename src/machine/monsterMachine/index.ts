import { createMachine } from "xstate";
import { MonsterContextType, MonsterEventType, MonsterEvents, MonsterStateType, MonsterStates } from "./types";
import { assign, isEqual } from "lodash";
import { PLAYER_STARTING_COORD } from "../../constants";
import { choose } from "xstate/lib/actions";



export const monsterMachine = createMachine<MonsterContextType, MonsterEventType, MonsterStateType>({
  id: 'monster',
  context:{
    coords: [8,1],
    playerCoords: undefined
  },
  initial: MonsterStates.ACTIVE,
  states: {
    [MonsterStates.ACTIVE]:{
      on: {
        [MonsterEvents.PLAYER_MOVED]: {
          actions: ['setPlayerCoords', 'attemptAttack']
        }
      }
      // TODO: Create a monster machine that moves every second
      // invoke: {
      //   src: (context) => (cb) => {
      //     const interval = setInterval(() => {
      //         cb(MonsterEvents.MOVE);
      //     }, 1000);
      //     return () => {
      //         clearInterval(interval);
      //     };
      //   },
      // },
      // on:{
      //   [MonsterEvents.MOVE]: {
      //     actions: 'moveAction'
      //   },
      // }
    }
  }
},{
  actions: {
    moveAction: assign(() => {
      return{
        coords: PLAYER_STARTING_COORD
      }
    }),
    setPlayerCoords: assign((context, event) => {
      return{
        playerCoords: event.coords
      }
    }),
    attemptAttack: choose([
      {
        cond: 'isPlayerAttacked',
        actions: 'attackPlayer'
      }
    ])
  },
  guards: {
    isPlayerAttacked: (context) => {
      return isEqual(context.coords, context.playerCoords)
    }
  }
})