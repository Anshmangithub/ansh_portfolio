import { useEffect, useRef } from "react";

// Lightweight canvas2D starfield used site-wide (cheap enough to run on every
// page); the heavier WebGL particle scene is reserved for the Home hero only.
const Starfield = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];
    let width = 0;
    let height = 0;

    const buildStars = () => {
      const count = Math.floor((width * height) / 9000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.2,
        speed: Math.random() * 0.15 + 0.02,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      buildStars();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        star.twinkle += 0.02;
        star.y += star.speed;
        if (star.y > height) star.y = 0;

        const opacity = 0.4 + Math.sin(star.twinkle) * 0.35;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210, 220, 255, ${Math.max(opacity, 0.08)})`;
        ctx.fill();
      }
      animationId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};

export default Starfield;
