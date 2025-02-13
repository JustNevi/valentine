import useCanvas from "./useCanvas";

interface Props {
  draw: (context: CanvasRenderingContext2D) => void;
  onClick?: (event: MouseEvent) => void;
}

function Canvas({ draw, onClick }: Props) {
  const canvasRef = useCanvas({ draw, onClick });

  return (
    <canvas
      ref={canvasRef}
      width={window.window.innerWidth}
      height={window.window.innerHeight}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

export default Canvas;
