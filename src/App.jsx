import "./styles.css";
import styles from "./App.module.css";
import { useComponentSize } from "react-use-size";
import { useEffect, useRef } from "react";
import scaleFullscreen from "./lib/scaleFullscreen";
import { blue } from "@ant-design/colors";
const scaleSize = {
  width: 1600,
  height: 900
};
const tickTime = 50;
const paddleWidth = 20;
const paddleHeight = 100;
const paddleColor = blue.primary;

export default function App() {
  const {
    ref: divRef,
    width: maxWidth,
    height: maxHeight
  } = useComponentSize();
  const canvasRef = useRef(null);

  const game = useRef({
    player0: { paddleY: 400, score: 0 },
    player1: { paddleY: 400, score: 0 }
  });

  const { width, height, scale } = scaleFullscreen(
    maxWidth,
    maxHeight,
    scaleSize
  );

  // Tick logic
  useEffect(() => {
    const handle = setInterval(() => {
      // Logic goes here
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
        // Paddles
        ctx.fillStyle = paddleColor;
        ctx.fillRect(
          0,
          game.current.player0.paddleY,
          paddleWidth,
          paddleHeight
        );
        ctx.fillRect(
          1600 - paddleWidth,
          game.current.player0.paddleY,
          paddleWidth,
          paddleHeight
        );
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
