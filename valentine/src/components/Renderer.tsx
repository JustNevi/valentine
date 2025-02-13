import Engine from "./Physics/Engine";
import { Particle, initParticle } from "./Physics/Matter/Particle";

import { Shape } from "./Shapes/Basic/Shape";
import Circle from "./Shapes/Basic/Circle";
import Rectangle from "./Shapes/Basic/Rectangle";

import ShapesDrawer from "./Shapes/ShapesDrawer";

export interface Renderer {
  draw: (context: CanvasRenderingContext2D) => void;
  onClickHandler: (event: MouseEvent) => void;
  onMouseMoveHandler: (event: MouseEvent) => void;
  onMouseDownHandler: (event: MouseEvent) => void;
  onMouseUpHandler: (event: MouseEvent) => void;
}

function Renderer(): Renderer {
  let shapes: Shape[] = [
    Circle({ circle: { x: 0, y: 0, r: 5, color: "red" } }),
    Circle({ circle: { x: 20, y: 20, r: 10, color: "green" } }),
    Rectangle({ rectangle: { x: 50, y: 50, w: 20, h: 40, color: "blue" } }),
  ];
  let shapesDrawer = ShapesDrawer({ shapes: shapes });

  const particlesToCircles = (
    particles: Particle[],
    color: string = "red",
    r: number = 5
  ): Shape[] => {
    const shps: Shape[] = particles.map((p) =>
      Circle({
        circle: { x: p.x, y: p.y, r: r, color: color },
      })
    );

    return shps;
  };

  const handleEndCalculate = (
    particles: Particle[],
    help_particles?: Particle[],
    mouse_pos?: { x: number; y: number; r: number }
  ) => {
    shapes = [];

    if (mouse_pos) {
      let p = initParticle;
      p.x = mouse_pos.x;
      p.y = mouse_pos.y;
      shapes = shapes.concat(particlesToCircles([p], "green", mouse_pos.r));
    }

    shapes = shapes.concat(particlesToCircles(particles));

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

  const onClickHandler = engine.onClickHandler;
  const onMouseMoveHandler = engine.onMouseMoveHandler;
  const onMouseDownHandler = engine.onMouseDownHandler;
  const onMouseUpHandler = engine.onMouseUpHandler;

  return {
    draw,
    onClickHandler,
    onMouseMoveHandler,
    onMouseDownHandler,
    onMouseUpHandler,
  };
}

export default Renderer;
