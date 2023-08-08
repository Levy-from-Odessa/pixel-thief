import { GameStates, LevelStateValue, LevelStates } from "../../machine/gameMachine/types";
import level1Background from '../../assets/images/level1Background.png';
import level2Background from '../../assets/images/level2Background.png';
import level3Background from '../../assets/images/level3Background.png';
import { LevelBackgroundImage } from "../LevelBackgroundImage";
import { Grid } from "../Grid";
import { Treasure } from "../Treasure";

interface PropsType {
  isItLevel: (e: LevelStateValue) => Boolean,
  onGoForward: () => void,
  onGoBack: () => void,
  children?: React.ReactNode
}

export const Levels = ({isItLevel, onGoForward, onGoBack, children}: PropsType) => {

  let level = null;
  let treasure = null

  if (isItLevel(`${GameStates.PLAYING}.${LevelStates.LEVEL_1}`)) {
    level = (<LevelBackgroundImage src={level1Background} alt="level 1" />)
  }

  if (isItLevel(`${GameStates.PLAYING}.${LevelStates.LEVEL_2}`)) {
    level =  (<LevelBackgroundImage src={level2Background} alt="level 2" />)
  }

  if (isItLevel(`${GameStates.PLAYING}.${LevelStates.LEVEL_3}`)) {
    level = (<LevelBackgroundImage src={level3Background} alt="level 3" />)
    treasure = <Treasure/>
  }
  if (!level) {
    throw new Error("Level not Found "); 
  }


  return (
    <>
      {level}
      <Grid>
        {children}
        {treasure}
      </Grid>
    </>
  )

}