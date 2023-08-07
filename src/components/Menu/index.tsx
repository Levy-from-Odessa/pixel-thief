import { Heading } from "../Heading";
import { Button } from "../Button";
import { MenuScreen } from "../MenuScreen";
import { Image, ImageSizeType } from "../Image";

interface PropsType {
  title: string,
  image: string,
  buttonLabel: string,
  buttonAction: () => void,
}

export const Menu = ({title, image, buttonLabel, buttonAction}: PropsType) => {
  return (
    <MenuScreen>
      <Heading>{title}</Heading>
      <Image src={image} alt="thief image" size={ImageSizeType.LARGE} />
      <Button onClick={buttonAction}>{buttonLabel}</Button>
    </MenuScreen>
  );
}