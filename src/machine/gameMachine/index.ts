import { assign, createMachine, log, send } from "xstate";
import { GameEvents,  GameStateType, GameStates, GameEventType, LevelStates, LevelEvents, playerId, GamePlayerEvents, PlayerMovementType, monsterId } from "./types";
import { playerMachine } from "../playerMachine";
import { choose, forwardTo, sendParent } from "xstate/lib/actions";
import { isEqual } from "lodash";
import { NEXT_DOOR_COORDS, TREASURE_COORDS } from "../../constants";
import { PlayerEvents } from "../playerMachine/types";
import { monsterMachine } from "../monsterMachine";


const levelMachine = {
  initial: LevelStates.LEVEL_1,
  context: {
    level: LevelStates.LEVEL_1
  },
  states: {
    [LevelStates.LEVEL_1]: {
      entry: ['resetPlayerCoords', 'adjustLevel'],
      on:{
        [LevelEvents.GO_FORWARD]: LevelStates.LEVEL_2,
      }
    },
    [LevelStates.LEVEL_2]: {
      invoke: {
        id: monsterId,
        src: monsterMachine,
      },
      entry: ['resetPlayerCoords', 'adjustLevel'],
      on:{
        [LevelEvents.GO_BACK]: LevelStates.LEVEL_1,
        [LevelEvents.GO_FORWARD]: LevelStates.LEVEL_3,
      }
    },
    [LevelStates.LEVEL_3]: {
      entry: ['resetPlayerCoords','adjustLevel'],
      on:{
        [LevelEvents.GO_BACK]: LevelStates.LEVEL_2,
      }
    },
  }
}

export const gameMachine = createMachine<any, GameEventType, GameStateType>({
  id: 'game',
  initial: GameStates.HOME,
  states: {
    [GameStates.HOME]: {
      on: {
        [GameEvents.START]: GameStates.PLAYING
      }
    },
    [GameStates.PLAYING]: {
      invoke: { 
        id: playerId,
        src: playerMachine,
      },
      on: {
        [GameEvents.PLAYER_DIED]: GameStates.GAME_OVER,
        [GameEvents.PLAYER_GOT_TREASURE]: GameStates.GAME_COMPLETE,
        [GamePlayerEvents.PLAYER_MOVED]: {actions: 'onPlayerMoved'},
        [GamePlayerEvents.PLAYER_ATTACKED]: {actions: 'forwardToPlayer'}
      },
      ...levelMachine,
    },
    [GameStates.GAME_OVER]: {
      on: {
        [GameEvents.RESTART]: GameStates.PLAYING,
      }
    },
    [GameStates.GAME_COMPLETE]: {
      on: {
        [GameEvents.TO_HOME]: GameStates.HOME,
      }
    }
  }

}, 
{
  actions: {
    onPlayerMoved: choose([
      {
        cond: 'isPlayerAtNextDoor',
        actions: 'goToNextLevel'
      },
      {
        cond: 'isPlayerAtMonster',
        actions: 'forwardToMonster'
      },
      {
        cond: 'isPlayerAtTreasure',
        actions: 'goToTreasure'
      }
    ]),
    goToNextLevel: send(LevelEvents.GO_FORWARD),
    goToTreasure: send(GameEvents.PLAYER_GOT_TREASURE),
    forwardToMonster: forwardTo(monsterId),
    forwardToPlayer: forwardTo(playerId),
    resetPlayerCoords: send(PlayerEvents.ON_RESET_PLAYER_COORDS, {to: playerId}),
    adjustLevel: assign({
      level: (context, event) => {
        const {type} = event
        const {level:currLevel} = context
        if (type === GameEvents.START) return LevelStates.LEVEL_1
        const levelsArray = Object.values(LevelStates)
        const currentLevelIndex = levelsArray.findIndex(level => level === currLevel)

        if (type === LevelEvents.GO_FORWARD) {
          return levelsArray[currentLevelIndex + 1]
        }

        // go back
        return levelsArray[currentLevelIndex - 1]
        }
      }),
    attack: sendParent(GamePlayerEvents.PLAYER_ATTACKED),
  },
  guards: {
    isPlayerAtNextDoor: (_, event) => {
      if(event.type !== GamePlayerEvents.PLAYER_MOVED) return false
      const {coords} = event
      return isEqual(coords, NEXT_DOOR_COORDS) 
    },
    isPlayerAtTreasure: (context, event) => {
      const {level} = context
      // todo
      const {coords} = event as PlayerMovementType

      if(level !== LevelStates.LEVEL_3 
        || event.type !== GamePlayerEvents.PLAYER_MOVED) return false

      return isEqual(coords, TREASURE_COORDS)
    },
    isPlayerAtMonster: (context, event, condMeta) => {
      const {level} = context
      // todo
      const {coords} = event as PlayerMovementType

      return (!!condMeta.state.children[monsterId]
        && event.type !== GamePlayerEvents.PLAYER_MOVED) 
        
    }
  },
  services: {
    playerMachine,
    monsterMachine
  }
}
)

