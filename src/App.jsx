import "./styles.css";
import styles from "./App.module.css";
import { useComponentSize } from "react-use-size";
import { useEffect, useRef } from "react";
import scaleFullscreen from "./lib/scaleFullscreen";

const scaleSize = {
  width: 1600,
  height: 900
};
const tickTime = 1000;

export default function App() {
  const {
    ref: divRef,
    width: maxWidth,
    height: maxHeight
  } = useComponentSize();
  const canvasRef = useRef(null);

  const game = useRef(0);

  const { width, height, scale } = scaleFullscreen(
    maxWidth,
    maxHeight,
    scaleSize
  );

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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.setTransform({
      a: scale,
      d: scale
    });
    const requestFrame = () => {
      handle = requestAnimationFrame(() => {
        ctx.clearRect(0, 0, 1600, 900);
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, 800, 450);
        ctx.fillStyle = "white";
        ctx.font = '50px Trebuchet MS'
        ctx.fillText(`hi ${game.current}`, 0, 100);
        requestFrame();
      });
    };
    requestFrame();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [canvasRef, scale]);

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
