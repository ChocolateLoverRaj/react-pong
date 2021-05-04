import "./styles.css";
import styles from "./Game.module.css";
import { useComponentSize } from "react-use-size";
import { useEffect, useRef } from "react";
import scaleFullscreen from "./lib/scaleFullscreen";

const Game = (props) => {
  const { scaleSize, tickTime, logic, render, initialGame } = props;

  const {
    ref: divRef,
    width: maxWidth,
    height: maxHeight
  } = useComponentSize();
  const canvasRef = useRef(null);

  const game = useRef(initialGame);

  const { width, height, scale } = scaleFullscreen(
    maxWidth,
    maxHeight,
    scaleSize
  );

  // Tick logic
  useEffect(() => {
    const handle = setInterval(() => {
      logic(game);
    }, tickTime);
    return () => {
      clearInterval(handle);
    };
  }, [tickTime, logic]);

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
        render(game, ctx);
        requestFrame();
      });
    };
    requestFrame();
    return () => {
      cancelAnimationFrame(handle);
    };
  }, [canvasRef, scale, render]);

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
};

export default Game;
