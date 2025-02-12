import Canvas from "./Canvas/Canvas";
import Renderer from "./Renderer";

function ValentineCanvas() {
  return <Canvas draw={Renderer()}></Canvas>;
}

export default ValentineCanvas;
