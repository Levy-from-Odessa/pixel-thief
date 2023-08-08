import { Meta } from "@storybook/react";
import { Game } from '.';
import { GameStates, LevelStates } from "../../machine/gameMachine/types";


export default {
  title: 'Game'
} as Meta


export const Index = () => <Game/>
export const Level1 = () => <Game fastForwardState={`${GameStates.PLAYING}.${LevelStates.LEVEL_1}`}/>
export const Level2 = () => <Game fastForwardState={`${GameStates.PLAYING}.${LevelStates.LEVEL_2}`}/>
export const Level3 = () => <Game fastForwardState={`${GameStates.PLAYING}.${LevelStates.LEVEL_3}`}/>

export const GameOver = () => <Game fastForwardState={GameStates.GAME_OVER}/>
export const GameComplete = () => <Game fastForwardState={GameStates.GAME_COMPLETE}/>