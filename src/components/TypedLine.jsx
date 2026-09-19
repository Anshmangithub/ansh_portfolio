import { useEffect, useState } from "react";

// A small terminal-style typing effect cycling through a list of strings —
// used as a HUD/robotic flourish, not for anything load-bearing.
const TypedLine = ({ lines, className = "", typingSpeed = 45, pause = 1400 }) => {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[lineIndex % lines.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typingSpeed / 2);
    } else {
      setDeleting(false);
      setLineIndex((i) => (i + 1) % lines.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, lineIndex, lines, typingSpeed, pause]);

  return (
    <span className={`font-mono ${className}`}>
      {text}
      <span className="animate-pulse-glow">▌</span>
    </span>
  );
};

export default TypedLine;
