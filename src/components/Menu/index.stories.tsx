
import { Meta } from "@storybook/react";
import { Menu } from ".";
import thiefGif from '../../assets/images/thief.gif'


export default {
  title: 'Menu/Menu'
} as Meta

const mockData = {
  title: "Pixel thief",
  image: thiefGif,
  buttonLabel: "start game",
  buttonAction: () => {}
}

export const Index = () => <Menu {...mockData} />
