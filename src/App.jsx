import "./styles.css";
import styles from "./App.module.css";
import { useComponentSize } from "react-use-size";
import { useEffect, useRef } from "react";
import scaleFullscreen from "./lib/scaleFullscreen";
import { blue } from "@ant-design/colors";
import useKeysPressed from "./lib/useKeysPressed";

const scaleSize = {
  width: 1600,
  height: 900
};
const tickTime = 50;
const paddleWidth = 20;
const paddleHeight = 100;
const paddleColor = blue.primary;
const scoreColor = blue.primary;
const scoreSize = 100;
const ballColor = "lightGray";
const ballWidth = 20;
const ballHeight = 20;
const playerKeys = [
  {
    up: "w",
    down: "s"
  },
  {
    up: "ArrowUp",
    down: "ArrowDown"
  }
];
const paddleXs = [0, 1600 - paddleWidth];
const scoreXs = [400, 1200];
const paddleSpeed = 10;

export default function App() {
  const {
    ref: divRef,
    width: maxWidth,
    height: maxHeight
  } = useComponentSize();
  const canvasRef = useRef(null);

  const keysPressed = useKeysPressed();

  const game = useRef({
    players: [
      { paddleY: 400, score: 0 },
      { paddleY: 400, score: 0 }
    ],
    ball: { x: 800 - ballWidth / 2, y: 450 - ballHeight / 2 }
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
      const playerCount = game.current.players.length;
      for (let i = 0; i < playerCount; i++) {
        const player = game.current.players[i];
        const { up, down } = playerKeys[i];
        const upPressed = keysPressed.has(up);
        const downPressed = keysPressed.has(down);
        if (upPressed && !downPressed) {
          player.paddleY = Math.max(player.paddleY - paddleSpeed, 0);
        } else if (downPressed && !upPressed) {
          player.paddleY = Math.min(
            player.paddleY + paddleSpeed,
            900 - paddleHeight
          );
        }
      }
    }, tickTime);
    return () => {
      clearInterval(handle);
    };
  }, [keysPressed]);

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
        const playerCount = game.current.players.length;
        // Paddles
        ctx.fillStyle = paddleColor;
        for (let i = 0; i < playerCount; i++) {
          const player = game.current.players[i];
          const paddleX = paddleXs[i];
          ctx.fillRect(paddleX, player.paddleY, paddleWidth, paddleHeight);
        }
        // Ball
        ctx.fillStyle = ballColor;
        ctx.fillRect(
          game.current.ball.x,
          game.current.ball.y,
          ballWidth,
          ballHeight
        );
        // Score
        ctx.fillStyle = scoreColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = `${scoreSize}px Arial`;
        for (let i = 0; i < playerCount; i++) {
          const player = game.current.players[i];
          const scoreX = scoreXs[i];
          ctx.fillText(player.score, scoreX, 0);
        }
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
