import useCanvas from "./useCanvas";

interface Props {
  draw: (context: CanvasRenderingContext2D) => void;
  onClick?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
}

function Canvas({ draw, onClick, onMouseMove, onMouseDown, onMouseUp }: Props) {
  const canvasRef = useCanvas({
    draw,
    onClick,
    onMouseMove,
    onMouseDown,
    onMouseUp,
  });

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
