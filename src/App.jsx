import "./styles.css";
import styles from "./App.module.css";
import { useComponentSize } from "react-use-size";
import { useEffect, useRef } from "react";
import scale from "./lib/scale";

const aspectRatio = 16 / 9;
const tickTime = 1000;

export default function App() {
  const {
    ref: divRef,
    width: maxWidth,
    height: maxHeight
  } = useComponentSize();
  const canvasRef = useRef(null);

  const game = useRef(0);

  const { width, height } = scale(maxWidth, maxHeight, aspectRatio);

  // Tick logic
  useEffect(() => {
    const handle = setInterval(() => {
      game.current++;
    }, tickTime);
    return () => {
      clearInterval(handle);
    };
  }, []);

  // Render
  useEffect(() => {
    let handle;
    const requestFrame = () => {
      handle = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.fillText(`hi ${game.current}`, 0, 100);
        requestFrame();
      });
    };
    requestFrame();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [canvasRef, width, height]);

  return (
    <div className={styles.div} ref={divRef}>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={width}
        height={height}
      />
    </div>
  );
}
