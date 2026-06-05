import React, { useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP_CTA = "https://wa.me/916269915175?text=DEMO";

const GD_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

:root{
  --gd-bg:#ffffff;
  --gd-alt:#f8fffe;
  --gd-tint:#f0fdf4;
  --gd-primary:#25D366;
  --gd-dark:#075E54;
  --gd-text:#0f172a;
  --gd-body:#6b7280;
  --gd-muted:#9ca3af;
  --gd-glow:0 4px 20px rgba(37,211,102,0.15);
  --gd-radius-card:16px;
  --gd-radius-btn:14px;
  --gd-radius-pill:999px;
}

*{ box-sizing:border-box; }
html,body{ height:100%; }
body{ margin:0; background:var(--gd-bg); color:var(--gd-text); font-family:'DM Sans', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }

.gdRoot{ position:relative; overflow:hidden; background:var(--gd-bg); }
.gdContainer{ width:min(1120px, calc(100% - 48px)); margin:0 auto; }
.gdH{ font-family:'Syne', system-ui, sans-serif; letter-spacing:-0.02em; }
.gdSub{ color:rgba(255,255,255,0.72); font-size:18px; line-height:1.6; }
.gdBody{ color:var(--gd-body); font-size:16px; line-height:1.7; }

.gdSection{ position:relative; padding:84px 0; }
.gdAlt{ background:var(--gd-alt); }
.gdTint{ background:var(--gd-tint); }

.gdReveal{ opacity:0; transform:translateY(16px); transition:opacity 700ms ease, transform 700ms ease; }
.gdReveal.gdIn{ opacity:1; transform:translateY(0); }
.gdStagger > *{ opacity:0; transform:translateY(16px); transition:opacity 700ms ease, transform 700ms ease; }
.gdStagger.gdIn > *{ opacity:1; transform:translateY(0); }
.gdStagger.gdIn > *:nth-child(1){ transition-delay:60ms; }
.gdStagger.gdIn > *:nth-child(2){ transition-delay:140ms; }
.gdStagger.gdIn > *:nth-child(3){ transition-delay:220ms; }
.gdStagger.gdIn > *:nth-child(4){ transition-delay:300ms; }
.gdStagger.gdIn > *:nth-child(5){ transition-delay:380ms; }

.gdPill{
  display:inline-flex; align-items:center; gap:10px;
  padding:10px 14px;
  border-radius:var(--gd-radius-pill);
  border:1px solid rgba(255,255,255,0.35);
  background:rgba(255,255,255,0.10);
  color:rgba(255,255,255,0.92);
  backdrop-filter: blur(10px);
}
.gdPills{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }

.gdTopbar{ display:flex; align-items:center; justify-content:space-between; padding:22px 0; }
.gdTopbarLeft{ color:#fff; font-weight:800; font-size:18px; }
.gdTopbarRight{ color:rgba(255,255,255,0.55); font-weight:600; font-size:14px; }

.gdHero{
  min-height:100vh;
  background:var(--gd-dark);
  position:relative;
  display:flex;
  flex-direction:column;
}
.gdHeroCenter{
  flex:1;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  padding:26px 0 56px;
}
.gdBadge{ animation: gdBadgeIn 850ms cubic-bezier(.2, 1.2, .2, 1) both; }
.gdHeadline{
  margin:18px 0 14px;
  color:#fff;
  font-size:clamp(36px, 6vw, 64px);
  line-height:1.05;
  font-weight:800;
}
.gdWord{
  display:inline-block;
  opacity:0;
  transform:translateY(40px);
  animation: gdWordReveal 720ms cubic-bezier(.2, .9, .2, 1) forwards;
}
.gdHeroBullets{ margin:22px 0 22px; }
.gdHeroNote{ margin-top:10px; color:rgba(255,255,255,0.70); font-size:14px; }

.gdScrollIndicator{
  position:absolute; left:50%; bottom:20px; transform:translateX(-50%);
  color:rgba(255,255,255,0.55); font-size:12px; letter-spacing:0.08em; text-transform:uppercase;
  display:flex; flex-direction:column; align-items:center; gap:10px;
}
.gdScrollDot{
  width:2px; height:28px; background:rgba(255,255,255,0.35);
  border-radius:999px; overflow:hidden; position:relative;
}
.gdScrollDot::after{
  content:""; position:absolute; left:0; top:-10px; width:100%; height:12px;
  background:#fff; opacity:0.6; animation: gdParticleRise 1200ms ease-in-out infinite;
}

.gdBtn{
  position:relative;
  border:none;
  cursor:pointer;
  border-radius:var(--gd-radius-btn);
  background:var(--gd-primary);
  color:#fff;
  font-weight:800;
  padding:18px 26px;
  font-size:18px;
  box-shadow:var(--gd-glow);
  overflow:hidden;
  transition:transform 140ms ease, filter 140ms ease;
  user-select:none;
}
.gdBtn:hover{ filter:brightness(1.03); transform:translateY(-1px); }
.gdBtn:active{ transform:translateY(0); }
.gdRippleSpan{
  position:absolute;
  border-radius:999px;
  transform:scale(0);
  animation: gdRipple 520ms ease-out forwards;
  background:rgba(255,255,255,0.45);
  pointer-events:none;
}

.gdStatsBar{
  background:#fff;
  border-top:3px solid var(--gd-primary);
  padding:22px 0;
}
.gdStatsRow{
  display:grid;
  grid-template-columns:repeat(5, minmax(160px, 1fr));
  gap:14px;
  overflow:auto;
  padding-bottom:6px;
  scrollbar-width:thin;
}
.gdStat{
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  border-radius:14px;
  padding:14px 14px;
  box-shadow:0 10px 30px rgba(7,94,84,0.06);
  min-width:160px;
}
.gdStatNum{ color:var(--gd-dark); font-weight:800; font-size:22px; }
.gdStatLabel{ color:var(--gd-body); font-size:13px; margin-top:6px; }

.gdGrid3{ display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }
.gdCard{
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  border-radius:var(--gd-radius-card);
  padding:18px 18px;
  box-shadow:0 12px 34px rgba(37,211,102,0.06);
}
.gdCardLeftBorder{ border-left:3px solid var(--gd-primary); }
.gdNum{ color:var(--gd-primary); font-weight:800; font-size:34px; line-height:1; }
.gdCardTitle{ font-weight:800; font-size:18px; margin-top:10px; }
.gdCode{
  background:#0b1220;
  color:#e5e7eb;
  border-radius:14px;
  padding:14px 14px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size:13px;
  margin-top:12px;
  border:1px solid rgba(255,255,255,0.08);
}
.gdSmallOk{ margin-top:10px; color:var(--gd-body); font-weight:600; }

.gdBubbleWrap{ margin-top:12px; border-radius:16px; overflow:hidden; border:1px solid rgba(15,23,42,0.10); }
.gdBubbleHeader{ background:rgba(37,211,102,0.14); padding:10px 12px; color:var(--gd-dark); font-weight:800; }
.gdBubble{ background:#fff; padding:12px 12px; color:var(--gd-text); line-height:1.55; }
.gdTimeline{ display:flex; gap:8px; flex-wrap:wrap; padding:12px; background:#fff; border-top:1px solid rgba(15,23,42,0.08); }
.gdTimelinePill{
  padding:8px 10px;
  border-radius:var(--gd-radius-pill);
  background:rgba(37,211,102,0.10);
  border:1px solid rgba(37,211,102,0.22);
  color:var(--gd-dark);
  font-weight:700;
  font-size:12px;
}

.gdSideSlideL{ opacity:0; transform:translateX(-18px) translateY(10px); transition:opacity 700ms ease, transform 700ms ease; }
.gdSideSlideR{ opacity:0; transform:translateX(18px) translateY(10px); transition:opacity 700ms ease, transform 700ms ease; }
.gdSideSlideL.gdIn, .gdSideSlideR.gdIn{ opacity:1; transform:translateX(0) translateY(0); }

.gdCounter{
  font-size:clamp(52px, 7vw, 88px);
  font-weight:800;
  color:var(--gd-primary);
  text-shadow:0 12px 40px rgba(37,211,102,0.18);
  line-height:1;
  margin:18px 0 8px;
}
.gdCounterSub{ color:var(--gd-body); font-weight:700; }

.gdBA{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
  margin-top:22px;
}
.gdBA .gdCard{ padding:18px 18px; }
.gdRedTint{
  background:rgba(239,68,68,0.06);
  border:1px solid rgba(239,68,68,0.16);
  border-left:3px solid rgba(239,68,68,0.75);
}
.gdGreenTint{
  background:rgba(37,211,102,0.08);
  border:1px solid rgba(37,211,102,0.22);
  border-left:3px solid rgba(37,211,102,0.95);
}
.gdList{ margin:14px 0 0; padding-left:0; list-style:none; display:grid; gap:10px; }
.gdList li{ color:var(--gd-text); font-weight:650; }
.gdList span{ color:var(--gd-body); font-weight:650; }

.gdLiveGrid{
  display:grid;
  grid-template-columns: 380px 1fr;
  gap:18px;
  align-items:start;
  margin-top:22px;
}
.gdTabs{ display:flex; gap:10px; flex-wrap:wrap; }
.gdTabBtn{
  border-radius:var(--gd-radius-pill);
  padding:10px 14px;
  font-weight:800;
  border:1px solid rgba(15,23,42,0.10);
  background:#fff;
  color:var(--gd-text);
  cursor:pointer;
  transition:transform 140ms ease, background 140ms ease, border-color 140ms ease;
}
.gdTabBtn:hover{ transform:translateY(-1px); }
.gdTabBtnActive{
  background:rgba(37,211,102,0.14);
  border-color:rgba(37,211,102,0.35);
  color:var(--gd-dark);
}

.gdPhone{
  border-radius:28px;
  background:#0b141a;
  border:1px solid rgba(15,23,42,0.14);
  box-shadow:0 22px 70px rgba(7,94,84,0.20);
  overflow:hidden;
  animation: gdFloat 4.2s ease-in-out infinite;
}
.gdPhoneHeader{
  background:var(--gd-dark);
  padding:14px 14px;
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:space-between;
  font-weight:800;
}
.gdPhoneHeaderSmall{ opacity:0.75; font-weight:700; font-size:12px; }
.gdChat{
  background:linear-gradient(180deg, #0b141a 0%, #0b141a 40%, rgba(11,20,26,0.92) 100%);
  padding:14px 14px 18px;
  display:flex;
  flex-direction:column;
  gap:10px;
  min-height:420px;
}
.gdMsgRow{ display:flex; width:100%; }
.gdMsg{
  max-width:88%;
  border-radius:16px;
  padding:10px 12px;
  font-size:13px;
  line-height:1.5;
  opacity:0;
  transform:translateY(8px);
  animation: gdFadeIn 520ms ease forwards;
}
.gdMsgUser{
  margin-left:auto;
  background:#1f2a33;
  color:#e5e7eb;
  border:1px solid rgba(255,255,255,0.06);
}
.gdMsgBot{
  margin-right:auto;
  background:#0f2f24;
  color:#dcfce7;
  border:1px solid rgba(37,211,102,0.18);
}
.gdTyping{
  align-self:flex-start;
  display:inline-flex;
  gap:6px;
  background:#0f2f24;
  border:1px solid rgba(37,211,102,0.18);
  border-radius:999px;
  padding:10px 12px;
  opacity:0;
  transform:translateY(8px);
  animation: gdFadeIn 480ms ease forwards;
}
.gdDot{
  width:6px; height:6px; border-radius:999px;
  background:rgba(220,252,231,0.85);
  animation: gdBounce 900ms ease-in-out infinite;
}
.gdDot:nth-child(2){ animation-delay:120ms; }
.gdDot:nth-child(3){ animation-delay:240ms; }

.gdRoiCard{
  max-width:860px;
  margin:0 auto;
  border-radius:var(--gd-radius-card);
  padding:22px 22px;
  border:1px solid rgba(37,211,102,0.28);
  background:#fff;
  box-shadow: var(--gd-glow);
}
.gdRoiGrid{ display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin-top:14px; }
.gdMetric{
  border-radius:16px;
  border:1px solid rgba(15,23,42,0.08);
  background:linear-gradient(180deg, rgba(37,211,102,0.06), rgba(255,255,255,1));
  padding:14px 14px;
}
.gdMetricNum{ font-weight:800; font-size:26px; }
.gdMetricNumGreen{ color:var(--gd-primary); }
.gdMetricNumDark{ color:var(--gd-text); }
.gdMetricLbl{ margin-top:6px; color:var(--gd-body); font-weight:700; font-size:13px; }

.gdPricingCard{
  max-width:480px;
  margin:0 auto;
  border-radius:var(--gd-radius-card);
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  padding:22px 22px;
  box-shadow:0 18px 60px rgba(7,94,84,0.10);
}
.gdPriceRow{ display:flex; align-items:flex-end; gap:10px; justify-content:center; }
.gdPrice{ font-size:72px; line-height:1; font-weight:800; color:var(--gd-dark); }
.gdPer{ color:var(--gd-body); font-weight:800; padding-bottom:10px; }
.gdMembersPill{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  margin:14px auto 0;
  padding:10px 12px;
  border-radius:var(--gd-radius-pill);
  border:1px solid rgba(37,211,102,0.22);
  background:rgba(37,211,102,0.10);
  color:var(--gd-dark);
  font-weight:800;
  font-size:13px;
  width:fit-content;
}
.gdChecklist{ margin:16px 0 0; padding:0; list-style:none; display:grid; gap:10px; }
.gdChecklist li{ display:flex; gap:10px; color:var(--gd-text); font-weight:700; }
.gdChecklist span{ color:var(--gd-body); font-weight:700; }
.gdHighlight{
  margin-top:14px;
  border-radius:16px;
  border:1px solid rgba(37,211,102,0.25);
  background:rgba(37,211,102,0.10);
  padding:12px 12px;
  color:var(--gd-dark);
  font-weight:800;
}

.gdQuoteCard{
  max-width:640px;
  margin:0 auto;
  border-radius:var(--gd-radius-card);
  background:#fff;
  border:1px solid rgba(15,23,42,0.08);
  padding:22px 22px;
  box-shadow:0 18px 60px rgba(7,94,84,0.10);
  position:relative;
  overflow:hidden;
}
.gdQuoteMark{
  position:absolute;
  right:16px;
  top:12px;
  font-size:74px;
  color:rgba(37,211,102,0.16);
  font-family:'Syne', system-ui, sans-serif;
  font-weight:800;
  line-height:1;
}
.gdStars{ color:var(--gd-primary); font-weight:900; letter-spacing:0.18em; }
.gdQuote{ margin-top:12px; font-size:18px; line-height:1.7; color:var(--gd-text); font-weight:650; }
.gdAttr{ margin-top:12px; color:var(--gd-body); font-weight:800; }
.gdSmallMuted{ margin-top:10px; color:var(--gd-body); font-weight:700; }

.gdFinal{
  background:var(--gd-dark);
  color:#fff;
  position:relative;
  overflow:hidden;
}
.gdFinalGlow{
  position:absolute;
  left:50%;
  top:50%;
  width:min(760px, 96vw);
  height:min(760px, 96vw);
  transform:translate(-50%, -50%);
  background:radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 34%, rgba(255,255,255,0) 66%);
  pointer-events:none;
}
.gdFinalCenter{ text-align:center; padding:92px 0; position:relative; }
.gdFinalSub{ color:rgba(255,255,255,0.55); font-weight:700; }

.gdFooter{
  background:var(--gd-dark);
  border-top:1px solid rgba(255,255,255,0.18);
  color:rgba(255,255,255,0.82);
  padding:22px 0;
}
.gdFooterRow{ display:flex; align-items:flex-start; justify-content:space-between; gap:16px; flex-wrap:wrap; }
.gdFooterSmall{ color:rgba(255,255,255,0.65); font-weight:600; font-size:12px; margin-top:6px; }
.gdFooterRight{ color:rgba(255,255,255,0.65); font-weight:700; font-size:12px; }

/* Floating particles (keep exactly) */
.gdParticles{
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:0;
  overflow:hidden;
}
.gdParticle{
  position:absolute;
  bottom:-20px;
  width:10px;
  height:10px;
  border-radius:999px;
  background:rgba(37,211,102,0.55);
  box-shadow:0 0 18px rgba(37,211,102,0.35);
  animation: gdParticleRise 7.2s linear infinite;
}

@keyframes gdParticleRise{
  0%{ transform:translateY(0) translateX(0); opacity:0; }
  10%{ opacity:1; }
  55%{ opacity:0.85; }
  100%{ transform:translateY(-120vh) translateX(22px); opacity:0; }
}
@keyframes gdRipple{
  0%{ transform:scale(0); opacity:0.75; }
  100%{ transform:scale(7.5); opacity:0; }
}
@keyframes gdWordReveal{
  0%{ opacity:0; transform:translateY(40px); filter:blur(0.5px); }
  100%{ opacity:1; transform:translateY(0); filter:blur(0px); }
}
@keyframes gdFadeIn{
  0%{ opacity:0; transform:translateY(16px); }
  100%{ opacity:1; transform:translateY(0); }
}
@keyframes gdScaleIn{
  0%{ opacity:0; transform:scale(0.85); }
  100%{ opacity:1; transform:scale(1); }
}
@keyframes gdBadgeIn{
  0%{ opacity:0; transform:translateY(10px) scale(0.96); }
  100%{ opacity:1; transform:translateY(0) scale(1); }
}
@keyframes gdBounce{
  0%, 100%{ transform:translateY(0); opacity:0.85; }
  50%{ transform:translateY(-5px); opacity:1; }
}
@keyframes gdFloat{
  0%, 100%{ transform:translateY(0); }
  50%{ transform:translateY(-10px); }
}

@media (max-width: 980px){
  .gdGrid3{ grid-template-columns:1fr; }
  .gdBA{ grid-template-columns:1fr; }
  .gdLiveGrid{ grid-template-columns:1fr; }
  .gdStatsRow{ grid-template-columns:repeat(5, minmax(220px, 1fr)); }
  .gdRoiGrid{ grid-template-columns:1fr; }
  .gdHeroNote{ width:min(520px, 92%); margin-left:auto; margin-right:auto; }
}
`;

function useInView(ref, { once = true, threshold = 0.15 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return undefined;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, once, threshold]);

  return inView;
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function useCounter(target, durationMs, active) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!active) return undefined;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setValue(0);

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(p);
      setValue(Math.round(target * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, active]);

  return value;
}

function FloatingParticles() {
  const particles = useMemo(() => {
    // 9 green floating dots rising from bottom. CSS animation. Fixed position behind everything.
    const base = [
      { left: "8%", size: 10, delay: "0s", dur: "7.2s", opacity: 0.55 },
      { left: "18%", size: 8, delay: "1.2s", dur: "6.4s", opacity: 0.45 },
      { left: "28%", size: 12, delay: "0.6s", dur: "7.8s", opacity: 0.60 },
      { left: "38%", size: 9, delay: "2.1s", dur: "6.9s", opacity: 0.50 },
      { left: "52%", size: 11, delay: "1.6s", dur: "7.5s", opacity: 0.58 },
      { left: "64%", size: 8, delay: "2.7s", dur: "6.6s", opacity: 0.45 },
      { left: "74%", size: 12, delay: "0.9s", dur: "7.9s", opacity: 0.62 },
      { left: "86%", size: 9, delay: "1.9s", dur: "6.8s", opacity: 0.50 },
      { left: "94%", size: 10, delay: "2.4s", dur: "7.1s", opacity: 0.56 },
    ];
    return base;
  }, []);

  return (
    <div className="gdParticles" aria-hidden="true">
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="gdParticle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.dur,
          }}
        />
      ))}
    </div>
  );
}

function CTAButton({ children, variant = "primary", size = "lg" }) {
  const onClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "gdRippleSpan";
    const sizePx = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - sizePx / 2;
    const y = e.clientY - rect.top - sizePx / 2;
    ripple.style.width = `${sizePx}px`;
    ripple.style.height = `${sizePx}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btn.appendChild(ripple);
    window.setTimeout(() => {
      ripple.remove();
    }, 520);

    // Track clicks in localStorage as gd_wa_clicks.
    try {
      const prev = Number(window.localStorage.getItem("gd_wa_clicks") || "0");
      window.localStorage.setItem("gd_wa_clicks", String(prev + 1));
    } catch {
      // ignore
    }

    // 280ms delay → window.open WhatsApp link.
    window.setTimeout(() => {
      window.open(WHATSAPP_CTA, "_blank", "noopener,noreferrer");
    }, 280);
  };

  const baseStyle =
    variant === "primary"
      ? {
          background: "var(--gd-primary)",
          color: "#fff",
          boxShadow: "var(--gd-glow)",
        }
      : {
          background: "#fff",
          color: "var(--gd-dark)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 14px 50px rgba(255,255,255,0.10)",
        };

  const sizeStyle =
    size === "xl"
      ? { fontSize: 20, padding: "22px 44px" }
      : { fontSize: 18, padding: "18px 26px" };

  return (
    <button
      type="button"
      className="gdBtn"
      onClick={onClick}
      style={{
        ...baseStyle,
        ...sizeStyle,
        borderRadius: "var(--gd-radius-btn)",
      }}
    >
      {children}
    </button>
  );
}

function Hero() {
  const words = useMemo(
    () => "Members renewal kabhi nahi bhoolenge".split(" "),
    []
  );

  return (
    <section className="gdHero">
      <FloatingParticles />
      <div className="gdContainer" style={{ position: "relative", zIndex: 1 }}>
        <div className="gdTopbar">
          <div className="gdTopbarLeft gdH">💬 RemindMe India</div>
          <div className="gdTopbarRight">🇮🇳 Made in Indore</div>
        </div>

        <div className="gdHeroCenter">
          <div className="gdPill gdBadge" style={{ marginBottom: 14 }}>
            ⚡ Indore & Bhopal ke gyms use kar rahe hain
          </div>

          <h1 className="gdHeadline gdH" aria-label="Members renewal kabhi nahi bhoolenge">
            {words.map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="gdWord"
                style={{
                  animationDelay: `${i * 80}ms`,
                  marginRight: i === words.length - 1 ? 0 : 10,
                }}
              >
                {w}
              </span>
            ))}
          </h1>

          <div className="gdSub" style={{ maxWidth: 760 }}>
            WhatsApp pe automatic reminder. Koi app nahi. Koi manual kaam nahi.
          </div>

          <div className="gdHeroBullets gdPills" style={{ marginTop: 20 }}>
            <span className="gdPill">⚡ 5 minute setup</span>
            <span className="gdPill">🔔 Auto reminders — 7, 3, 1 din pehle</span>
            <span className="gdPill">💰 ₹999/month — 7 din FREE</span>
          </div>

          <div style={{ marginTop: 18 }}>
            <CTAButton>WhatsApp pe DEMO chalu karo</CTAButton>
            <div className="gdHeroNote">
              ↗ WhatsApp khulega — koi account nahi banana, koi form nahi
            </div>
          </div>
        </div>
      </div>

      <div className="gdScrollIndicator" aria-hidden="true">
        <div style={{ fontWeight: 800 }}>Scroll</div>
        <div className="gdScrollDot" />
      </div>
    </section>
  );
}

function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.25 });

  const stats = [
    { num: "343+", label: "Users" },
    { num: "1,500+", label: "Reminders sent" },
    { num: "2", label: "Gyms onboarded" },
    { num: "98%", label: "Delivery rate" },
    { num: "₹999", label: "per month only" },
  ];

  return (
    <section className="gdStatsBar">
      <div className="gdContainer">
        <div
          ref={ref}
          className={`gdStatsRow gdStagger ${inView ? "gdIn" : ""}`}
        >
          {stats.map((s) => (
            <div key={s.label} className="gdStat">
              <div className="gdStatNum gdH">{s.num}</div>
              <div className="gdStatLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.22 });

  return (
    <section className="gdSection gdAlt">
      <div className="gdContainer">
        <div ref={ref} className={`gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdH" style={{ fontSize: 40, fontWeight: 800 }}>
            Kaise kaam karta hai?
          </div>
          <div className="gdBody" style={{ marginTop: 10, fontWeight: 700 }}>
            3 steps. 5 minutes. Done.
          </div>
        </div>

        <div style={{ marginTop: 22 }} className="gdGrid3">
          <div className={`gdCard gdCardLeftBorder ${inView ? "gdIn gdSideSlideL" : "gdSideSlideL"}`}>
            <div className="gdNum gdH">01</div>
            <div className="gdCardTitle gdH">Member add karo</div>
            <div className="gdCode">ADD 9876543210 Rahul 25 june 2026</div>
            <div className="gdSmallOk">Bas. Bot ne save kar liya. ✅</div>
          </div>

          <div className={`gdCard gdCardLeftBorder ${inView ? "gdIn gdReveal" : "gdReveal"}`} style={{ transitionDelay: inView ? "120ms" : "0ms" }}>
            <div className="gdNum gdH">02</div>
            <div className="gdCardTitle gdH">Bot automatic remind karta hai</div>
            <div className="gdBubbleWrap">
              <div className="gdBubbleHeader">WhatsApp Reminder</div>
              <div className="gdBubble">
                Hi Rahul! 👋 Aapki Iron Fitness membership 25 June ko expire ho rahi
                hai. Please renew karein. 💪 — Iron Fitness
              </div>
              <div className="gdTimeline">
                <span className="gdTimelinePill">7 din pehle</span>
                <span className="gdTimelinePill">3 din pehle</span>
                <span className="gdTimelinePill">1 din pehle</span>
                <span className="gdTimelinePill">Expiry pe</span>
              </div>
            </div>
          </div>

          <div className={`gdCard gdCardLeftBorder ${inView ? "gdIn gdSideSlideR" : "gdSideSlideR"}`} style={{ transitionDelay: inView ? "180ms" : "0ms" }}>
            <div className="gdNum gdH">03</div>
            <div className="gdCardTitle gdH">Member renew karta hai</div>
            <div style={{ marginTop: 12 }}>
              <div className="gdH" style={{ fontSize: 28, fontWeight: 800 }}>
                Zero calls. Zero follow-ups.
              </div>
              <div className="gdH" style={{ fontSize: 28, fontWeight: 800, color: "var(--gd-primary)" }}>
                Zero tension.
              </div>
              <div className="gdBody" style={{ marginTop: 10, fontWeight: 800 }}>
                ✅ Revenue automatically recover hoti hai
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainPoint() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.22 });
  const counter = useCounter(15000, 2200, inView);

  return (
    <section className="gdSection">
      <div className="gdContainer">
        <div ref={ref} className={`gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdH" style={{ fontSize: 40, fontWeight: 800 }}>
            Har mahine kitne members renewal bhool jaate hain?
          </div>
          <div className="gdBody" style={{ marginTop: 10, fontWeight: 700 }}>
            Average gym ka monthly loss — silently
          </div>

          <div className="gdCounter gdH">₹{counter.toLocaleString("en-IN")}</div>
          <div className="gdCounterSub">per month — average gym for 100 members</div>
        </div>

        <div className="gdBA" style={{ marginTop: 26 }}>
          <div className={`gdCard gdRedTint ${inView ? "gdIn gdSideSlideL" : "gdSideSlideL"}`}>
            <div className="gdH" style={{ fontWeight: 800, fontSize: 18 }}>
              Before RemindMe India
            </div>
            <ul className="gdList">
              <li>📞 <span>Manually 50+ members ko call karna</span></li>
              <li>😤 <span>&quot;Bhai yaad nahi tha&quot; sunna bar bar</span></li>
              <li>💸 <span>₹500-1000 per member lost silently</span></li>
              <li>⏰ <span>2-3 ghante per month waste in calls</span></li>
              <li>😞 <span>Members feel awkward about reminders</span></li>
            </ul>
          </div>

          <div className={`gdCard gdGreenTint ${inView ? "gdIn gdSideSlideR" : "gdSideSlideR"}`}>
            <div className="gdH" style={{ fontWeight: 800, fontSize: 18 }}>
              After RemindMe India
            </div>
            <ul className="gdList">
              <li>🤖 <span>Bot khud remind karta hai — automatically</span></li>
              <li>✅ <span>Members apne aap renew karte hain</span></li>
              <li>💰 <span>Average ₹12,000+/month recovered</span></li>
              <li>⚡ <span>Zero time spent on reminders</span></li>
              <li>😊 <span>Professional relationship maintained</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.18 });
  const [tab, setTab] = useState("add");
  const [phase, setPhase] = useState("idle"); // idle | typing | messages
  const [messages, setMessages] = useState([]);

  const tabs = [
    { id: "add", label: "Add Member" },
    { id: "members", label: "My Members" },
    { id: "broadcast", label: "Broadcast" },
    { id: "risk", label: "At Risk" },
  ];

  const script = useMemo(() => {
    const scripts = {
      add: [
        { from: "user", text: "ADD 919876543210 Rahul 2026-06-25" },
        {
          from: "bot",
          text:
            "✅ Rahul added to Iron Fitness\n📅 Expiry: 25 Jun 2026\n🔔 Auto reminders set:\n  • 7 days before\n  • 3 days before\n  • On expiry day\n  • 2 days after",
        },
      ],
      members: [
        { from: "user", text: "MY MEMBERS" },
        {
          from: "bot",
          text:
            "📋 Iron Fitness — 52 members\n🟢 Active: 44\n🟡 Expiring soon: 6\n🔴 Expired: 2\n\nExpiring this week:\n• Rahul — 3 days left ⚠️\n• Priya — 5 days\n• Amit — 7 days",
        },
      ],
      broadcast: [
        { from: "user", text: "BROADCAST Kal gym band hai maintenance ke liye" },
        {
          from: "bot",
          text:
            "📢 Broadcast sent!\n\n'Kal gym band hai'\n\nDelivered: 52/52 members ✅\nRate: 100%",
        },
      ],
      risk: [
        { from: "user", text: "AT RISK" },
        {
          from: "bot",
          text:
            "⚠️ At-Risk Members (next 7 days)\n\n1. Rahul — expires 25 Jun (3 days)\n2. Priya — expires 27 Jun (5 days)\n3. Amit — expires 29 Jun (7 days)\n\nBot already reminding them ✅",
        },
      ],
    };
    return scripts;
  }, []);

  useEffect(() => {
    if (!inView) return undefined;
    let timers = [];

    const run = () => {
      setMessages([]);
      setPhase("typing");
      timers.push(
        window.setTimeout(() => {
          setPhase("messages");
          const seq = script[tab] || [];
          seq.forEach((m, i) => {
            timers.push(
              window.setTimeout(() => {
                setMessages((prev) => [...prev, m]);
              }, i * 520)
            );
          });
        }, 720)
      );
    };

    run();
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [tab, script, inView]);

  return (
    <section className="gdSection gdTint">
      <div className="gdContainer">
        <div ref={ref} className={`gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdH" style={{ fontSize: 40, fontWeight: 800 }}>
            Khud dekho — live demo
          </div>
          <div className="gdBody" style={{ marginTop: 10, fontWeight: 700 }}>
            4 commands jo sab kuch handle karte hain
          </div>
        </div>

        <div className="gdLiveGrid">
          <div className={`gdReveal ${inView ? "gdIn" : ""}`} style={{ transitionDelay: inView ? "120ms" : "0ms" }}>
            <div className="gdTabs" role="tablist" aria-label="Live demo tabs">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`gdTabBtn ${tab === t.id ? "gdTabBtnActive gdTabBtnActive" : ""}`}
                  onClick={() => setTab(t.id)}
                  role="tab"
                  aria-selected={tab === t.id}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="gdBody" style={{ marginTop: 14 }}>
              Tab change karo — typing indicator dikhega, phir messages animate honge.
            </div>
          </div>

          <div className={`gdReveal ${inView ? "gdIn" : ""}`} style={{ transitionDelay: inView ? "160ms" : "0ms" }}>
            <div className="gdPhone" aria-label="WhatsApp demo mockup">
              <div className="gdPhoneHeader">
                <div>Iron Fitness</div>
                <div className="gdPhoneHeaderSmall">WhatsApp Demo</div>
              </div>
              <div className="gdChat">
                {phase === "typing" ? (
                  <div className="gdTyping" aria-label="Typing indicator">
                    <span className="gdDot" />
                    <span className="gdDot" />
                    <span className="gdDot" />
                  </div>
                ) : null}

                {messages.map((m, idx) => (
                  <div key={`${m.from}-${idx}`} className="gdMsgRow">
                    <div
                      className={`gdMsg ${m.from === "user" ? "gdMsgUser" : "gdMsgBot"}`}
                      style={{ animationDelay: `${idx * 90}ms` }}
                    >
                      {m.text.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ROICalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section className="gdSection">
      <div className="gdContainer">
        <div ref={ref} className={`gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdRoiCard">
            <div className="gdH" style={{ fontSize: 34, fontWeight: 800, textAlign: "center" }}>
              Kitna paisa bachega?
            </div>

            <div className={`gdRoiGrid gdStagger ${inView ? "gdIn" : ""}`}>
              <div className="gdMetric">
                <div className="gdMetricNum gdMetricNumGreen gdH">₹7,500+</div>
                <div className="gdMetricLbl">5 extra renewals per month</div>
              </div>
              <div className="gdMetric">
                <div className="gdMetricNum gdMetricNumDark gdH">₹999</div>
                <div className="gdMetricLbl">RemindMe India cost</div>
              </div>
              <div className="gdMetric">
                <div className="gdMetricNum gdMetricNumGreen gdH">₹6,500+</div>
                <div className="gdMetricLbl">Net profit — 7.5x ROI 🚀</div>
              </div>
            </div>

            <div className="gdBody" style={{ marginTop: 14, fontWeight: 700, textAlign: "center" }}>
              Sirf 1 extra renewal = ₹999 recovered. Baaki sab profit.
            </div>

            <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
              <CTAButton>WhatsApp pe DEMO chalu karo</CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section className="gdSection gdAlt">
      <div className="gdContainer">
        <div ref={ref} className={`gdReveal ${inView ? "gdIn" : ""}`} style={{ textAlign: "center" }}>
          <div className="gdH" style={{ fontSize: 40, fontWeight: 800 }}>
            Simple pricing
          </div>
          <div className="gdBody" style={{ marginTop: 10, fontWeight: 700 }}>
            Koi hidden charges nahi. Koi contract nahi.
          </div>
        </div>

        <div className={`gdPricingCard gdReveal ${inView ? "gdIn" : ""}`} style={{ marginTop: 22, transitionDelay: inView ? "120ms" : "0ms" }}>
          <div className="gdPriceRow">
            <div className="gdPrice gdH">₹999</div>
            <div className="gdPer">/month</div>
          </div>
          <div className="gdMembersPill">100 members tak</div>

          <ul className="gdChecklist" style={{ marginTop: 16 }}>
            <li>✅ <span>Unlimited reminders — koi limit nahi</span></li>
            <li>✅ <span>7, 3, 1 din pehle auto reminder</span></li>
            <li>✅ <span>WhatsApp pe seedha — no app</span></li>
            <li>✅ <span>ADD / BROADCAST / MY MEMBERS commands</span></li>
            <li>✅ <span>Dashboard + analytics</span></li>
            <li>✅ <span>Owner aur member dono ke liye</span></li>
          </ul>

          <div className="gdHighlight">🎁 7 din FREE trial — koi payment nahi abhi</div>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
            <CTAButton>WhatsApp pe DEMO chalu karo</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section className="gdSection gdTint">
      <div className="gdContainer">
        <div ref={ref} className={`gdQuoteCard gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdQuoteMark">“</div>
          <div className="gdStars">⭐⭐⭐⭐⭐</div>
          <div className="gdQuote">
            Setup mein sirf 10 minute lage. Pehle mahine 8 members ne renew kiya jo
            pehle bhool jaate the. ₹12,000 recover hua. Ab main khud remind nahi
            karta — bot karta hai.
          </div>
          <div className="gdAttr">🏋️ Gym Owner, Indore (name withheld on request)</div>
          <div className="gdSmallMuted">Aur 2 aur gyms join ho rahe hain is mahine 🔥</div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <section className="gdFinal">
      <div className="gdFinalGlow" aria-hidden="true" />
      <div className="gdContainer">
        <div ref={ref} className={`gdFinalCenter gdReveal ${inView ? "gdIn" : ""}`}>
          <div className="gdPill gdBadge" style={{ marginBottom: 14 }}>
            🎁 7 din free trial — ab bhi available
          </div>
          <div className="gdH" style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.05 }}>
            7 din free try karo
          </div>
          <div className="gdFinalSub gdH" style={{ fontSize: 22, marginTop: 12 }}>
            Pasand nahi aaya toh kuch nahi.
          </div>

          <div style={{ marginTop: 18 }}>
            <CTAButton size="xl">WhatsApp pe DEMO chalu karo</CTAButton>
          </div>

          <div style={{ marginTop: 12, color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>
            Already 343+ log use kar rahe hain. Koi risk nahi.
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="gdFooter">
      <div className="gdContainer">
        <div className="gdFooterRow">
          <div>
            <div style={{ fontWeight: 800 }}>
              RemindMe India | Built by Ayush Malviya, Indore 🇮🇳
            </div>
            <div className="gdFooterSmall">remindmeindia.site | +91 74705 78178</div>
          </div>
          <div className="gdFooterRight">© 2026 RemindMe India. MSME Registered.</div>
        </div>
      </div>
    </footer>
  );
}

export default function GymDemo() {
  return (
    <div className="gdRoot" style={{ background: "var(--gd-bg)" }}>
      <title>WhatsApp Gym Membership Reminder System | RemindMe India</title>
      <meta name="description" content="Auto-remind gym members before subscription expires on WhatsApp. 7 days, 3 days, 1 day before — automatic. No app needed. Starts at ₹999/month." />
      <style>{GD_CSS}</style>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <PainPoint />
      <LiveDemo />
      <ROICalculator />
      <Pricing />
      <Testimonial />
      <FinalCTA />
      <Footer />
    </div>
  );
}

