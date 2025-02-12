import { Shape } from "./Shapes/Basic/Shape";
import Circle from "./Shapes/Basic/Circle";
import Rectangle from "./Shapes/Basic/Rectangle";

import ShapesDrawer from "./Shapes/ShapesDrawer";

function Renderer(): (context: CanvasRenderingContext2D) => void {
  const shapes: Shape[] = [
    Circle({ circle: { x: 0, y: 0, r: 5, color: "red" } }),
    Circle({ circle: { x: 20, y: 20, r: 10, color: "green" } }),
    Rectangle({ rectangle: { x: 50, y: 50, w: 20, h: 40, color: "blue" } }),
  ];
  const shapesDrawer = ShapesDrawer({ shapes: shapes });

  const draw = (context: CanvasRenderingContext2D) => {
    shapesDrawer.draw(context, false);
  };

  return draw;
}

export default Renderer;
