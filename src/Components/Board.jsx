import React, { useEffect, useRef } from "react";
import { BallMovement } from "./BallMovement";
import data from "../utils/data";
import WallCollision from "../utils/WallCollision";
import Paddle from "./Paddle";
import Brick from "./Brick";

let bricks = [];

const Board = () => {
  const canvasRef = useRef(null);
  const { ballObj, paddleProps, brickObj } = data;

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let newBrickSet = Brick(2, bricks, canvas, brickObj);
      if (newBrickSet && newBrickSet.length) {
        bricks = newBrickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bricks.map((brick) => brick.draw(ctx));
      BallMovement(ctx, ballObj);
      WallCollision(ballObj, canvas);
      Paddle(ctx, canvas, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  });

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        height={"400px"}
        width={"500px"}
        onMouseMove={(e) => {
          paddleProps.x = e.clientX - paddleProps.width / 2 - 80;
        }}
      ></canvas>
    </div>
  );
};

export default Board;
