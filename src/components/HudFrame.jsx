// Sci-fi corner brackets, dropped around a heading or visual to read as a
// HUD/targeting-reticle rather than a plain box — part of the robotic/AI theme.
const corners = [
  "top-0 left-0 border-t border-l rounded-tl-md",
  "top-0 right-0 border-t border-r rounded-tr-md",
  "bottom-0 left-0 border-b border-l rounded-bl-md",
  "bottom-0 right-0 border-b border-r rounded-br-md",
];

const HudFrame = ({ children, label, className = "" }) => (
  <div className={`relative ${className}`}>
    {corners.map((corner) => (
      <span
        key={corner}
        aria-hidden="true"
        className={`pointer-events-none absolute h-3 w-3 border-cyan-300/50 ${corner}`}
      />
    ))}
    {label && (
      <span className="absolute -top-3 left-3 bg-neutral-950 px-2 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-300/70">
        {label}
      </span>
    )}
    {children}
  </div>
);

export default HudFrame;
