import { useEffect, useRef, useState } from "react";

interface Props {
  draw: (context: CanvasRenderingContext2D) => void;
  onClick?: (event: MouseEvent) => void;
}

function useCanvas({ draw, onClick }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const setHandlers = (context: CanvasRenderingContext2D) => {
    const resizeCanvas = () => {
      context.canvas.width = window.innerWidth;
      context.canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (onClick) {
      window.addEventListener("click", onClick);
    }
  };

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
      setHandlers(context);

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
