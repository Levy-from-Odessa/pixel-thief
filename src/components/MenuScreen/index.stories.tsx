
import { Meta } from "@storybook/react";
import { MenuScreen } from ".";
import thiefGif from '../../assets/images/thief.gif'


export default {
  title: 'UI Components/MenuScreen'
} as Meta

const mockData = {
  title: "Pixel thief",
  image: thiefGif,
  buttonLabel: "start game",
  buttonAction: () => {}
}

export const Index = () => <MenuScreen {...mockData} />
