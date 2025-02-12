export interface ShapeProps {
  x: number;
  y: number;
  color: string;
}

export interface Shape {
  draw: (context: CanvasRenderingContext2D) => void;
}
