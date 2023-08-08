import { PlayerAttackedType } from '../gameMachine/types';
import { CoordType, DirectionType } from './../../types/index';
import { ActorRef } from "xstate";

export enum PlayerStates {
  ALIVE = "ALIVE",
  DEAD = "DEAD",
  DETERMINING = "DETERMINING",
}


export enum PlayerEvents  {
  ON_ARROW_BUTTON_CLICKED = "ON_ARROW_BUTTON_CLICKED",
  ON_RESET_PLAYER_COORDS = "ON_RESET_PLAYER_COORDS"
}
export type ArrowButtonClickedType = {
  type: PlayerEvents.ON_ARROW_BUTTON_CLICKED,
  direction: DirectionType
}

export type ResetPlayerCoordsType = {
  type: PlayerEvents.ON_RESET_PLAYER_COORDS,
}

export type PlayerEventType = ArrowButtonClickedType | ResetPlayerCoordsType | PlayerAttackedType

export interface PlayerContextType {
  coords: CoordType
  health: number
}

export type PlayerStateType = { 
  context: PlayerContextType; 
  value: PlayerStates.ALIVE | PlayerStates.DEAD | PlayerStates.DETERMINING
}


export type PlayerActorType = ActorRef<any, PlayerStateType>