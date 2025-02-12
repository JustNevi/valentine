import { ShapeProps, Shape } from "./Shape";

export interface RectangleProps extends ShapeProps {
  w: number;
  h: number;
}

interface Props {
  rectangle: RectangleProps;
}

function Rectangle({ rectangle }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    context.fillStyle = rectangle.color;
    context.fillRect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
  };

  return { draw };
}

export default Rectangle;
