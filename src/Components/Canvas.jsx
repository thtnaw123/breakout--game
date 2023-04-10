import React, { useEffect, useRef } from "react";

let x = 0;
const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillStyle = "red";
      ctx.arc(x, 75, 30, 0, 2 * Math.PI);
      x += 3;
      ctx.stroke();
      requestAnimationFrame(render);
      let allCircles = [];
      let theX = 50;
      let circleCounter = 1;

      for (let i = 0; i < 5; i++) {
        let myCircle = new Circle(theX, 200, 40, "red", circleCounter);
        allCircles.push(myCircle);
        theX += 100;
        circleCounter++;
      }
      for (let i = 0; i < allCircles.length; i++) {
        allCircles[i].draw(ctx);
      }
    };
    render();
  });

  class Circle {
    constructor(xpos, ypos, radius, color, text) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.radius = radius;
      this.color = color;
      this.text = text;
    }
    draw(context) {
      context.beginPath();
      context.strokeStyle = this.color;
      context.fillText(this.text, this.xpos, this.ypos);
      context.textAlign = "center";
      context.lineWidth = 5;
      context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false);
      context.stroke();
    }
  }
  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        height={"400px"}
        width={"500px"}
      ></canvas>
    </div>
  );
};

export default Canvas;
