import { CoordType, DirectionType } from './../../types/index';
import { ActorRef } from "xstate";

export enum PlayerStates {
  ALIVE = "ALIVE",
  DEAD = "DEAD",
}


export enum playerEvents  {
  ON_ARROW_BUTTON_CLICKED = "ON_ARROW_BUTTON_CLICKED",
}
export type ArrowButtonClickedType = {
  type: playerEvents.ON_ARROW_BUTTON_CLICKED,
  direction: DirectionType
}

export type PlayerEventType = ArrowButtonClickedType

export interface PlayerContextType {
  coords: CoordType
}

export type PlayerStateType = { 
  context: PlayerContextType; 
  value: PlayerStates.ALIVE | PlayerStates.DEAD
}


export type PlayerActorType = ActorRef<any, PlayerStateType>