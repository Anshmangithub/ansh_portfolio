import { useEffect, useRef, useState } from "react";

// A soft glowing cursor + trailing ring, disabled automatically on touch
// devices. Expands and shows a text label when hovering any element with a
// data-cursor="LABEL" attribute (e.g. project cards say "VIEW").
const CursorGlow = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onDown = () => ring.classList.add("scale-75", "opacity-80");
    const onUp = () => ring.classList.remove("scale-75", "opacity-80");

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      label.textContent = target.getAttribute("data-cursor");
      ring.classList.add("h-16", "w-16", "border-cyan-300/80", "bg-neutral-950/60");
      ring.classList.remove("h-8", "w-8");
    };

    const onOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (!target) return;
      label.textContent = "";
      ring.classList.remove("h-16", "w-16", "border-cyan-300/80", "bg-neutral-950/60");
      ring.classList.add("h-8", "w-8");
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 mix-blend-screen"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[998] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/60 opacity-60 transition-[height,width,opacity,background-color,border-color] duration-200 ease-out mix-blend-screen"
      >
        <span
          ref={labelRef}
          className="font-mono text-[10px] uppercase tracking-widest text-cyan-200 mix-blend-normal"
        />
      </div>
    </>
  );
};

export default CursorGlow;
