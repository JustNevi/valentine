import { useEffect, useRef, useState } from "react";

interface Props {
  draw: (context: CanvasRenderingContext2D) => void;
}

function useCanvas({ draw }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (ref.current) {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);

  useEffect(() => {
    let animationFrameId = 0;

    if (context) {
      const render = () => {
        draw(context);
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context]);

  return ref;
}

export default useCanvas;
