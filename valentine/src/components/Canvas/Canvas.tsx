import useCanvas from "./useCanvas";

interface Props {
  draw: (context: CanvasRenderingContext2D) => void;
}

function Canvas({ draw }: Props) {
  const canvasRef = useCanvas({ draw });

  return <canvas ref={canvasRef} width={"800px"} height={"500px"} />;
}

export default Canvas;
