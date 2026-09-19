import { useMemo, useState } from "react";
import { SKILL_GROUPS } from "../constants";

const HUB_RADIUS = 33;
const SKILL_RADIUS = 15;

function polar(cx, cy, radius, angleDeg) {
  const angle = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
}

// A radial "technology network" — decorative, layered on top of the plain
// skill list below it (never a replacement for it, so nothing here is the
// only place a skill is readable).
const SkillConstellation = () => {
  const [active, setActive] = useState(null);

  const layout = useMemo(() => {
    const cx = 50;
    const cy = 50;
    return SKILL_GROUPS.map((group, i) => {
      const hubAngle = (360 / SKILL_GROUPS.length) * i - 90;
      const hub = polar(cx, cy, HUB_RADIUS, hubAngle);
      const spread = Math.min(150, 26 * group.skills.length);
      const skills = group.skills.map((skill, j) => {
        const start = hubAngle - spread / 2;
        const angle =
          group.skills.length > 1 ? start + (spread / (group.skills.length - 1)) * j : hubAngle;
        // Alternate the radius so adjacent labels on a crowded arc don't sit
        // on the same ring and collide.
        const radius = SKILL_RADIUS + (j % 2 === 0 ? 0 : 6);
        return { skill, ...polar(hub.x, hub.y, radius, angle) };
      });
      return { group, hub, skills };
    });
  }, []);

  return (
    <div className="relative mx-auto hidden aspect-square w-full max-w-3xl md:block">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        {layout.map(({ group, hub, skills }) => {
          const isActive = active === group.title;
          return (
            <g key={group.title}>
              <line
                x1={50}
                y1={50}
                x2={hub.x}
                y2={hub.y}
                stroke={isActive ? "rgba(52,226,176,0.7)" : "rgba(103,232,249,0.25)"}
                strokeWidth="0.3"
              />
              {skills.map((s) => (
                <line
                  key={s.skill}
                  x1={hub.x}
                  y1={hub.y}
                  x2={s.x}
                  y2={s.y}
                  stroke={isActive ? "rgba(52,226,176,0.5)" : "rgba(255,255,255,0.1)"}
                  strokeWidth="0.25"
                />
              ))}
            </g>
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/40 bg-[#050506]/90 font-mono text-[10px] text-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.25)]">
        AG
      </div>

      {layout.map(({ group, hub, skills }) => (
        <div key={group.title}>
          <button
            type="button"
            onMouseEnter={() => setActive(group.title)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(group.title)}
            onBlur={() => setActive(null)}
            style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide backdrop-blur transition-transform hover:scale-110 ${
              active === group.title
                ? "border-amber-300/70 bg-amber-300/10 text-amber-200"
                : "border-amber-300/30 bg-[#050506]/80 text-amber-300/90"
            }`}
          >
            {group.title}
          </button>
          {skills.map((s) => (
            <span
              key={s.skill}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] transition-all ${
                active === group.title
                  ? "scale-110 border-emerald-300/60 bg-emerald-300/10 text-emerald-200"
                  : "border-white/10 bg-white/5 text-neutral-400"
              }`}
            >
              {s.skill}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkillConstellation;
