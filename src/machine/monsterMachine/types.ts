import { Actor, ActorRef } from "xstate";
import { CoordType } from "../../types";
import { PlayerMovementType } from "../gameMachine/types";


export enum MonsterStates {
  ACTIVE = "ACTIVE",
}
export enum MonsterEvents {
  MOVE = "MOVE",
  PLAYER_MOVED = "PLAYER_MOVED",
}

export type MonsterEventType = PlayerMovementType

export interface MonsterContextType {
  coords: CoordType
  playerCoords?: CoordType
}

export type MonsterStateType = { 
  context: MonsterContextType; 
  value: MonsterStates.ACTIVE
}


export type MonsterActorType = ActorRef<MonsterEventType, MonsterContextType>
