import Engine from "./Physics/Engine";
import { Particle } from "./Physics/Matter/Particle";

import { Shape } from "./Shapes/Shape";
import Circle from "./Shapes/Basic/Circle";
import Rectangle from "./Shapes/Basic/Rectangle";
import Heart from "./Shapes/Custom/Heart";
import Photon from "./Shapes/Custom/Photon";

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

  const particlesToHeart = (
    particles: Particle[],
    color: string = "red",
    size: number = 5
  ): Shape[] => {
    const shps: Shape[] = particles.map((p) =>
      Heart({
        heart: { x: p.x, y: p.y, size: size, color: color },
      })
    );

    return shps;
  };

  const particlesToPhoton = (
    particles: Particle[],
    color: string = "red",
    r: number = 5
  ): Shape[] => {
    const shps: Shape[] = particles.map((p) =>
      Photon({
        photon: { x: p.x, y: p.y, r: r, color: color },
      })
    );

    return shps;
  };

  const handleEndCalculate = (
    particles_heart: Particle[],
    particles_photons: Particle[]
  ) => {
    shapes = [];

    shapes = shapes.concat(particlesToPhoton(particles_photons, "white", 2));
    shapes = shapes.concat(particlesToHeart(particles_heart, "red", 10));
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
