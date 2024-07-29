import React, { useRef, useEffect } from 'react';

const Color = {
  home: '#DE173E', // Define your color constants here
  away: '#0790FF',
};

const CanvasIncident = ({ data = [], height, width }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = (data.length - 1) * 5;
    canvas.height = 200;
    canvas.width = canvasWidth;

    const ctx = canvas.getContext('2d');
    const path = createPath(ctx, data, canvasWidth);

    ctx.fillStyle = Color.home;
    ctx.fill(path);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 100, canvasWidth, 200);
    ctx.clip('nonzero');
    ctx.fillStyle = Color.away;
    ctx.fill(path);
    ctx.restore();

    ctx.beginPath();
    ctx.strokeStyle = Color.home;
    ctx.lineWidth = 2;
    ctx.moveTo(canvasWidth, 0); // Adjust the coordinates as needed
    ctx.lineTo(canvasWidth, 200); // Adjust the coordinates as needed
    ctx.stroke();
  }, [data]);

  const createPath = (ctx, data, canvasWidth) => {
    const path = new Path2D();
    path.moveTo(0, 100);
    data.forEach((pos, idx) => {
      path.lineTo(idx * 5, 100 - pos * 6);
    });
    path.lineTo(canvasWidth, 100);
    return path;
  };

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};

export default CanvasIncident;
