import { ShapeProps, Shape } from "../Shape";

export interface RectangleProps extends ShapeProps {
  w: number;
  h: number;
}

interface Props {
  rectangle: RectangleProps;
}

function Rectangle({ rectangle }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    const { x, y, w, h, color } = rectangle;

    context.fillStyle = color;
    context.fillRect(x, y, w, h);
  };

  return { draw };
}

export default Rectangle;
