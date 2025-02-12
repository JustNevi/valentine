import { ShapeProps, Shape } from "./Shape";

export interface CircleProps extends ShapeProps {
  r: number;
}

interface Props {
  circle: CircleProps;
}

function Circle({ circle }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    context.fillStyle = circle.color;
    context.fill();
    context.closePath();
  };

  return { draw };
}

export default Circle;
