
import { Meta } from "@storybook/react";
import { LevelBackgroundImage } from ".";
import levelBackgroundImage from '../../assets/images/level1Background.png'


export default {
  title: 'UI Components/LevelBackgroundImage'
} as Meta


export const Index = () => <LevelBackgroundImage src={levelBackgroundImage} />