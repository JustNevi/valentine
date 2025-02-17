import { ShapeProps, Shape } from "../Shape";

export interface CircleProps extends ShapeProps {
  r: number;
}

interface Props {
  circle: CircleProps;
}

function Circle({ circle }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    const { x, y, r, color } = circle;

    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  };

  return { draw };
}

export default Circle;
