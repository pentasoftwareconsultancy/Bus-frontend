import React, { useEffect, useState } from "react";

// Stable pre-generated particles
const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  dur: 2.8 + Math.random() * 2.5,
  delay: Math.random() * 2.5,
  color: i % 3 === 0 ? "#f97316" : i % 3 === 1 ? "#fbbf24" : "rgba(255,255,255,0.55)",
}));

const RINGS = [
  { size: 160, dur: 3.0, delay: 0.7 },
  { size: 300, dur: 3.8, delay: 1.1 },
  { size: 460, dur: 4.8, delay: 1.5 },
];

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("enter"); // enter → hold → exit → done

  useEffect(() => {
    // enter animations play 0–1.2s
    // hold at 1.2s–2.8s
    // exit starts at 2.8s — logo morphs to header position
    // done at 3.6s — overlay fully gone, app fades in
    const t1 = setTimeout(() => setPhase("exit"), 2800);
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 3650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  if (phase === "done") return null;

  // During exit: logo shrinks to header logo size & position (top-left corner)
  // Header: h-20 (80px), px-4 (16px left), logo is w-9 h-9 (36px) icon + text
  // The splash logo is ~80px icon + text ~300px wide, centered on screen
  // Scale factor: header icon is 36px, splash icon is 80px → scale ≈ 0.45
  // But we also need to account for the text scaling
  const isExiting = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        // Fade the black background out smoothly during exit
        opacity: isExiting ? 0 : 1,
        transition: isExiting ? "opacity 0.75s cubic-bezier(0.4,0,0.2,1) 0.1s" : "none",
        pointerEvents: isExiting ? "none" : "all",
      }}
    >
      <style>{`
        @keyframes sp-float {
          0%,100% { transform: translateY(0) scale(1); opacity: var(--op); }
          50%      { transform: translateY(-18px) scale(1.2); opacity: calc(var(--op) * 1.6); }
        }
        @keyframes sp-ring {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 0; }
          20%  { opacity: 0.18; }
          100% { transform: translate(-50%,-50%) scale(1.6); opacity: 0; }
        }
        @keyframes sp-icon-in {
          0%   { transform: scale(0) rotate(-18deg); opacity: 0; }
          55%  { transform: scale(1.15) rotate(3deg); opacity: 1; }
          75%  { transform: scale(0.97) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes sp-glow {
          0%,100% { box-shadow: 0 0 28px 5px rgba(249,115,22,0.5), 0 0 60px 16px rgba(249,115,22,0.15); }
          50%      { box-shadow: 0 0 50px 14px rgba(249,115,22,0.72), 0 0 100px 36px rgba(249,115,22,0.26); }
        }
        @keyframes sp-raj {
          0%   { opacity: 0; transform: translateX(-32px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes sp-mudra {
          0%   { opacity: 0; transform: scale(0.4) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes sp-travels {
          0%   { opacity: 0; transform: translateX(32px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes sp-tag {
          0%   { opacity: 0; transform: translateY(8px); letter-spacing: 6px; }
          100% { opacity: 1; transform: translateY(0); letter-spacing: 4px; }
        }
        @keyframes sp-shimmer {
          0%   { background-position: -300% center; }
          100% { background-position:  300% center; }
        }
        /* Exit: shrink toward top-left header logo position */
        @keyframes sp-to-header {
          0% {
            transform: scale(1) translate(0, 0);
            opacity: 1;
          }
          100% {
            /* Scale down so 80px icon → 36px = 0.45x, translate to top-left */
            transform: scale(0.1) translate(-520px, -380px);
            opacity: 0;
          }
        }
      `}</style>

      {/* Ambient particles */}
      {PARTICLES.map((p) => (
        <span key={p.id} style={{
          position: "absolute",
          left: `${p.x}%`, top: `${p.y}%`,
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: "50%", background: p.color,
          "--op": 0.5,
          animation: `sp-float ${p.dur}s ${p.delay}s ease-in-out infinite`,
          pointerEvents: "none",
          opacity: isExiting ? 0 : undefined,
          transition: isExiting ? "opacity 0.3s ease" : "none",
        }} />
      ))}

      {/* Pulsing rings */}
      {RINGS.map((r, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: `${r.size}px`, height: `${r.size}px`,
          borderRadius: "50%",
          border: "1.5px solid rgba(249,115,22,0.4)",
          animation: `sp-ring ${r.dur}s ${r.delay}s ease-out infinite`,
          pointerEvents: "none",
          opacity: isExiting ? 0 : undefined,
          transition: isExiting ? "opacity 0.2s ease" : "none",
        }} />
      ))}

      {/* Central glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "560px", height: "560px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(249,115,22,0.11) 0%, rgba(249,115,22,0.03) 50%, transparent 70%)",
        "--op": 1,
        animation: "sp-float 4s 0.5s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* ── Main logo — morphs to header on exit ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        transformOrigin: "center center",
        // On exit: animate to header logo position/size
        animation: isExiting
          ? "sp-to-header 0.75s cubic-bezier(0.4,0,0.8,0) forwards"
          : "none",
      }}>

        {/* Icon box — same gradient as header logo */}
        <div style={{
          width: "80px", height: "80px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          animation: isExiting
            ? "none"
            : "sp-icon-in 0.7s 0.1s cubic-bezier(0.34,1.56,0.64,1) both, sp-glow 2.5s 0.8s ease-in-out infinite",
        }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="white">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm9 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM6 6h12v5H6V6z"/>
          </svg>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{
            display: "flex", alignItems: "baseline", gap: "10px",
            fontSize: "clamp(30px, 5.5vw, 50px)",
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.5px", lineHeight: 1, whiteSpace: "nowrap",
          }}>
            <span style={{
              color: "#fff",
              animation: isExiting ? "none" : "sp-raj 0.55s 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
            }}>
              Raj
            </span>
            <span style={{
              background: "linear-gradient(90deg,#f97316 0%,#fbbf24 30%,#fff 50%,#fbbf24 70%,#f97316 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              animation: isExiting
                ? "sp-shimmer 3s linear infinite"
                : "sp-mudra 0.65s 0.55s cubic-bezier(0.34,1.56,0.64,1) both, sp-shimmer 3s 1.2s linear infinite",
            }}>
              Mudra
            </span>
            <span style={{
              color: "#fff",
              animation: isExiting ? "none" : "sp-travels 0.55s 0.75s cubic-bezier(0.34,1.56,0.64,1) both",
            }}>
              Travels
            </span>
          </div>

          <div style={{
            fontSize: "clamp(9px, 1.3vw, 12px)",
            color: "rgba(255,255,255,0.4)",
            fontWeight: 700,
            letterSpacing: "4px",
            textTransform: "uppercase",
            fontFamily: "system-ui, sans-serif",
            animation: isExiting ? "none" : "sp-tag 0.6s 1.0s cubic-bezier(0.4,0,0.2,1) both",
            opacity: isExiting ? 0 : undefined,
            transition: isExiting ? "opacity 0.2s ease" : "none",
          }}>
            India's Fastest Booking Platform
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
