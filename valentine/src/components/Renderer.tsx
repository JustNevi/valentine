import Engine from "./Physics/Engine";
import { Particle } from "./Physics/Matter/Particle";

import { Shape } from "./Shapes/Basic/Shape";
import Circle from "./Shapes/Basic/Circle";
import Rectangle from "./Shapes/Basic/Rectangle";

import ShapesDrawer from "./Shapes/ShapesDrawer";

function Renderer(): (context: CanvasRenderingContext2D) => void {
  let shapes: Shape[] = [
    Circle({ circle: { x: 0, y: 0, r: 5, color: "red" } }),
    Circle({ circle: { x: 20, y: 20, r: 10, color: "green" } }),
    Rectangle({ rectangle: { x: 50, y: 50, w: 20, h: 40, color: "blue" } }),
  ];
  let shapesDrawer = ShapesDrawer({ shapes: shapes });

  const particlesToCircles = (
    particles: Particle[],
    color: string = "red"
  ): Shape[] => {
    const shps: Shape[] = particles.map((p) =>
      Circle({
        circle: { x: p.x, y: p.y, r: 5, color: color },
      })
    );

    return shps;
  };

  const handleEndCalculate = (
    particles: Particle[],
    help_particles?: Particle[]
  ) => {
    shapes = particlesToCircles(particles);
    if (help_particles) {
      shapes = shapes.concat(particlesToCircles(help_particles, "blue"));
    }
  };

  const engine = Engine({ endCalculate: handleEndCalculate });
  engine.start();

  const draw = (context: CanvasRenderingContext2D) => {
    shapesDrawer = ShapesDrawer({ shapes: shapes });
    shapesDrawer.draw(context, true);
    engine.run();
  };

  return draw;
}

export default Renderer;
