import { ShapeProps, Shape } from "../Shape";

export interface HeartProps extends ShapeProps {
  size: number;
}

interface Props {
  heart: HeartProps;
}

function Heart({ heart }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    const { x, y, size, color } = heart;

    context.save();
    context.globalAlpha = 0.6;

    context.beginPath();
    context.moveTo(x, y + size / 4);

    context.bezierCurveTo(
      x - size / 2,
      y - size / 2, // Left control point
      x - size,
      y + size / 3, // Left bottom control point
      x,
      y + size // Bottom point
    );

    context.bezierCurveTo(
      x + size,
      y + size / 3, // Right bottom control point
      x + size / 2,
      y - size / 2, // Right control point
      x,
      y + size / 4 // Top center point
    );

    context.fillStyle = color;
    context.fill();
    context.closePath();

    context.restore();
  };

  return { draw };
}

export default Heart;
