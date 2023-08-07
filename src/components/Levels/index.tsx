import { GameStates, LevelStateValue, levelStates } from "../../machine/gameMachine/types";
import level1Background from '../../assets/images/level1Background.png';
import level2Background from '../../assets/images/level2Background.png';
import level3Background from '../../assets/images/level3Background.png';
import { LevelBackgroundImage } from "../LevelBackgroundImage";

interface PropsType {
  isItLevel: (e: LevelStateValue) => Boolean,
  onGoForward: () => void,
  onGoBack: () => void,
}

export const Levels = ({isItLevel, onGoForward, onGoBack}: PropsType) => {

  if (isItLevel(`${GameStates.PLAYING}.${levelStates.LEVEL_1}`)) {
    return (<LevelBackgroundImage src={level1Background} alt="level 1" />)
  }

  if (isItLevel(`${GameStates.PLAYING}.${levelStates.LEVEL_2}`)) {
    return (<LevelBackgroundImage src={level2Background} alt="level 2" />)
  }

  if (isItLevel(`${GameStates.PLAYING}.${levelStates.LEVEL_3}`)) {
    return (<LevelBackgroundImage src={level3Background} alt="level 3" />)
  }

  throw new Error("Level not Found "); 
}