import { useCallback, useMemo } from "react";
import { blue } from "@ant-design/colors";
import useKeysPressed from "./lib/useKeysPressed";
import bounce from "./lib/bounce";
import colide1D from "./lib/colide1D";
import Game from "./Game";

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
const initialBall = {
  x: 800 - ballWidth / 2,
  y: 450 - ballHeight / 2,
  velocity: { speed: 15, direction: (Math.PI * 1) / 4 }
};

const App = () => {
  const initialGame = useMemo(
    () => ({
      players: [
        { paddleY: 400, score: 0 },
        { paddleY: 400, score: 0 }
      ],
      ball: { ...initialBall }
    }),
    []
  );

  const keysPressed = useKeysPressed();

  const logic = useCallback((game) => {
    const playerCount = game.current.players.length;
    // Paddle movement
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
    // Ball movement
    const movementX =
      Math.cos(game.current.ball.velocity.direction) *
      game.current.ball.velocity.speed;
    const movementY =
      Math.sin(game.current.ball.velocity.direction) *
      game.current.ball.velocity.speed;
    game.current.ball.x += movementX;
    game.current.ball.y += movementY;
    // Wall bounce
    const bounceHorizontal = () => {
      game.current.ball.velocity.direction = bounce(
        0,
        game.current.ball.velocity.direction
      );
    };
    if (game.current.ball.y < 0) {
      game.current.ball.y += 0 - game.current.ball.y;
      bounceHorizontal();
    } else if (game.current.ball.y + ballHeight > 900) {
      game.current.ball.y -= game.current.ball.y + ballHeight - 900;
      bounceHorizontal();
    }
    // Paddle bounce
    const collidePaddle = (paddle) =>
      colide1D(
        game.current.players[paddle].paddleY,
        paddleHeight,
        game.current.ball.y,
        ballHeight
      );
    const bounceVertical = () => {
      game.current.ball.velocity.direction = bounce(
        Math.PI / 2,
        game.current.ball.velocity.direction
      );
    };
    if (game.current.ball.x < paddleWidth && collidePaddle(0)) {
      game.current.ball.x += paddleWidth - game.current.ball.x;
      bounceVertical();
    } else if (
      game.current.ball.x + ballWidth > 1600 - paddleWidth &&
      collidePaddle(1)
    ) {
      game.current.ball.x -=
        game.current.ball.x + ballWidth - (1600 - paddleWidth);
      bounceVertical();
    }
    // Scoring
    const resetBall = () => {
      game.current.ball = { ...initialBall };
    };
    if (game.current.ball.x + ballWidth < 0) {
      resetBall();
      game.current.players[1].score++;
    } else if (game.current.ball.x > 1600) {
      resetBall();
      game.current.players[0].score++;
    }
  }, []);

  const render = useCallback((game, ctx) => {
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
  });

  return (
    <Game
      scaleSize={scaleSize}
      tickTime={tickTime}
      initialGame={initialGame}
      logic={logic}
      render={render}
    />
  );
};

export default App;
