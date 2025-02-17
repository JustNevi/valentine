import { Shape } from "./Shape";

export interface ShapesDrawer {
  draw: (context: CanvasRenderingContext2D, refresh?: boolean) => void;
}

interface Props {
  shapes: Shape[];
}

function ShapesDrawer({ shapes }: Props): ShapesDrawer {
  const draw = (context: CanvasRenderingContext2D, refresh = true) => {
    if (refresh) {
      context.fillStyle = "Black"; // Set the fill color to black
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    shapes.forEach((shape) => shape.draw(context));
  };

  return { draw };
}

export default ShapesDrawer;
