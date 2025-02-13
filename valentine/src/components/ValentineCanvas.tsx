import Canvas from "./Canvas/Canvas";
import Renderer from "./Renderer";

function ValentineCanvas() {
  const renderer = Renderer();
  return (
    <Canvas
      draw={renderer.draw}
      onClick={renderer.onClickHandler}
      onMouseMove={renderer.onMouseMoveHandler}
      onMouseDown={renderer.onMouseDownHandler}
      onMouseUp={renderer.onMouseUpHandler}
    ></Canvas>
  );
}

export default ValentineCanvas;
