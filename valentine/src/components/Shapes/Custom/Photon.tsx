import { ShapeProps, Shape } from "../Shape";

export interface PhotonProps extends ShapeProps {
  r: number;
}

interface Props {
  photon: PhotonProps;
}

function Photon({ photon }: Props): Shape {
  const draw = (context: CanvasRenderingContext2D) => {
    const { x, y, r, color } = photon;

    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    context.closePath();
  };

  return { draw };
}

export default Photon;
