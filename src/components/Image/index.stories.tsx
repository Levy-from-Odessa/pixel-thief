import { Meta } from "@storybook/react";
import { Image, ImageSizeType } from ".";
import thiefGif from '../../assets/images/thief.gif'


export default {
  title: 'UI Components/Image'
} as Meta


export const Index = () => <Image src={thiefGif} />
export const Large = () => <Image src={thiefGif} size={ImageSizeType.LARGE}/>
export const Small = () => <Image src={thiefGif} size={ImageSizeType.SMALL}/>
