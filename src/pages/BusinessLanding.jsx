import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Bell, RotateCcw, Check } from "lucide-react";
import AuroraBackground from "@/components/landing/AuroraBackground";
import { useCountUp } from "@/hooks/useCountUp";
import { useDesktopPointer } from "@/hooks/useDesktopPointer";

const WHATSAPP_CTA = "https://wa.me/916269915175?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business";
const BOT_LINK = "https://wa.me/916269915175?text=Hi";

/* ===== Shared motion language (matches home page) ===== */
const VIEWPORT = { once: true, margin: '-80px' };

const makeItemVariants = (reduceMotion) =>
  reduceMotion
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, y: 36, scale: 0.96 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
      };

const makeContainerVariants = (reduceMotion) => ({
  hidden: {},
  show: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
});

function BizSectionHeader({ eyebrow, title, sub, center = false, tone = 'green', variants }) {
  const toneClass =
    tone === 'warn'
      ? 'text-red-500/90 bg-red-50 border-red-100'
      : 'text-rm-primary bg-[#E8F5E9] border-rm-green/20';
  return (
    <motion.div
      className={center ? 'text-center' : ''}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
    >
      <span className={`inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase border rounded-full px-4 py-1.5 mb-5 ${toneClass}`}>
        {eyebrow}
      </span>
      <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text" style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}>
        {title}
      </h2>
      {sub && <p className="mt-4 text-base sm:text-lg text-rm-muted font-body">{sub}</p>}
    </motion.div>
  );
}

/* Count-up stat card (glass, matches home StatsBar) */
function BizStatCard({ icon, target, suffix = '', text, label, index }) {
  const { ref, value } = useCountUp(target || 0, { delay: index * 0.12 });

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 px-5 py-6 text-center shadow-[0_1px_2px_rgba(27,28,26,0.04),0_8px_24px_rgba(27,28,26,0.06),0_24px_56px_rgba(27,28,26,0.05)] hover:shadow-[0_2px_4px_rgba(27,28,26,0.05),0_12px_32px_rgba(0,109,47,0.1),0_32px_72px_rgba(27,28,26,0.08)] hover:-translate-y-1 transition-all duration-300 ease-out"
    >
      <div aria-hidden="true" className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
      <div className="text-2xl mb-1.5">{icon}</div>
      <div className="font-heading font-extrabold text-3xl lg:text-4xl gradient-text tabular-nums" style={{ letterSpacing: '-0.02em' }}>
        {text || `${value.toLocaleString('en-IN')}${suffix}`}
      </div>
      <div className="mt-1.5 text-sm font-medium text-rm-muted">{label}</div>
    </div>
  );
}

/* 3D tilt feature card — calmer cousin of the home bento tilt */
function BizTiltCard({ feature, variants, reduceMotion }) {
  const desktop = useDesktopPointer();
  const active = desktop && !reduceMotion;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 22 });
  const glareX = useTransform(mx, (v) => `${v * 100}%`);
  const glareY = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(380px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.35), transparent 60%)`;

  const handleMouseMove = (e) => {
    if (!active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div variants={variants} style={{ perspective: 1000 }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={reduceMotion ? {} : { y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="group relative h-full rounded-3xl p-7 overflow-hidden bg-white/85 backdrop-blur-sm border border-black/[0.05] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]"
        style={{
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          transformStyle: 'preserve-3d',
          willChange: active ? 'transform' : 'auto',
        }}
      >
        <div
          aria-hidden="true"
          className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: '0 24px 56px rgba(0, 109, 47, 0.14), 0 10px 28px rgba(27, 28, 26, 0.08)' }}
        />
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-6 h-px opacity-70"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)' }}
        />
        {active && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: glare }}
          />
        )}
        <div style={{ transform: active ? 'translateZ(22px)' : 'none' }}>
          <div className="w-14 h-14 rounded-2xl bg-[#E8F5E9] flex items-center justify-center text-2xl mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(27,28,26,0.06)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
            {feature.i}
          </div>
          <h3 className="font-heading font-bold text-lg text-rm-text mb-2">{feature.t}</h3>
          <p className="text-rm-muted text-sm leading-relaxed font-body">{feature.d}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== Playable Owner Demo — the sales pitch ===== */

const OWNER_WELCOME =
  'Namaste! 👋 Main aapka business assistant.\nMembers add karo, list dekho, broadcast bhejo — sab WhatsApp se.\nNeeche commands try karo 👇';

const OWNER_CHIPS = ['ADD 9876543210 Rahul 15 July', 'MY MEMBERS', 'BROADCAST Kal gym band hai', 'QR'];

const MEMBERS_REPLY =
  '📋 Aapka Gym — 38 members\n\n🟢 Active: 32\n🟡 Expiring soon: 4\n🔴 Expired: 2\n\nExpiring this week:\n• Rahul — 3 days\n• Priya — 5 days\n• Amit — 7 days';

function ownerTime() {
  return new Date()
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toUpperCase();
}

/* Owner command parser — never errors */
function buildOwnerReply(raw) {
  const text = raw.trim();
  const upper = text.toUpperCase();

  if (upper.startsWith('ADD')) {
    // Tokenize: first word starting with a letter is the name, everything after it is the date.
    // Robust against any phone format ('98765...', '+91 98765 43210', '9876-5432-1098-7').
    const tokens = text.split(/\s+/).slice(1);
    const nameIdx = tokens.findIndex((t) => /^[A-Za-zऀ-ॿ]/.test(t));
    const rawName = nameIdx >= 0 ? tokens[nameIdx] : '';
    const name = rawName ? rawName[0].toUpperCase() + rawName.slice(1) : 'Member';
    const date = nameIdx >= 0 ? tokens.slice(nameIdx + 1).join(' ') : '';
    return {
      text: `✅ ${name} added to Aapka Gym\n📅 Expiry: ${date || 'set ho gayi'}\n🔔 Auto reminders set:\n  • 7 din pehle\n  • 3 din pehle\n  • Expiry wale din\n  • 2 din baad`,
    };
  }
  if (upper.startsWith('MY MEMBERS') || upper === 'MEMBERS') {
    return { text: MEMBERS_REPLY };
  }
  if (upper.startsWith('BROADCAST')) {
    const msg = text.slice(9).trim();
    return {
      text: `📢 Broadcast sent!\n\n"${msg || 'Aapka message'}"\n\nDelivered: 38/38 members ✅\nRate: 100%`,
    };
  }
  if (upper.startsWith('QR')) {
    return {
      qr: true,
      text: '📱 QR poster ready!\nFront desk pe lagao — member scan karega, khud join ho jayega ✅',
    };
  }
  return { text: '✅ Command noted! Main aapke members ko time pe yaad dila dunga 🔔' };
}

/* Tiny illustrative QR graphic for the QR reply */
function QrGraphic() {
  const dots = [
    [3, 0], [4, 0], [3, 1], [5, 2], [6, 2], [0, 3], [1, 3], [3, 3], [4, 3],
    [6, 3], [2, 4], [4, 4], [0, 5], [3, 5], [5, 5], [4, 6], [5, 6], [6, 6],
  ];
  return (
    <svg width="64" height="64" viewBox="0 0 7 7" aria-hidden="true" className="rounded bg-white p-[2px] my-2">
      {/* Canonical QR finder squares: top-left, top-right, bottom-left */}
      <rect x="0" y="0" width="2" height="2" fill="#1B1C1A" />
      <rect x="0.5" y="0.5" width="1" height="1" fill="#fff" />
      <rect x="5" y="0" width="2" height="2" fill="#1B1C1A" />
      <rect x="5.5" y="0.5" width="1" height="1" fill="#fff" />
      <rect x="0" y="5" width="2" height="2" fill="#1B1C1A" />
      <rect x="0.5" y="5.5" width="1" height="1" fill="#fff" />
      {dots.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="0.9" height="0.9" fill="#1B1C1A" />
      ))}
    </svg>
  );
}

const BURST_PARTICLES = Array.from({ length: 10 }, (_, i) => {
  const angle = ((-30 - (i * 120) / 9) * Math.PI) / 180;
  const dist = 26 + (i % 3) * 9;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: i % 3 === 0 ? 5 : 3.5,
    delay: (i % 4) * 0.02,
    white: i % 4 === 0,
  };
});

function SendBurst() {
  return (
    <span aria-hidden="true" className="absolute inset-0 pointer-events-none">
      {BURST_PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            backgroundColor: p.white ? '#FFFFFF' : '#25D366',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.55, delay: p.delay, ease: [0.165, 0.84, 0.44, 1] }}
        />
      ))}
    </span>
  );
}

function OwnerTypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.12 } }}
      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      className="flex items-center gap-1 px-4 py-3 bg-[#DCF8C6] rounded-2xl rounded-tl-sm w-fit shadow-[0_1px_1.5px_rgba(11,20,26,0.13)]"
      style={{ transformOrigin: '10% 100%' }}
    >
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
    </motion.div>
  );
}

function OwnerChatBubble({ message, reduceMotion }) {
  const isUser = message.type === 'user';
  return (
    <motion.div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : isUser
            ? { opacity: 0, y: 42, x: 16, scale: 0.55 }
            : { opacity: 0, y: 14, scale: 0.96 }
      }
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0.15 }
          : isUser
            ? { type: 'spring', stiffness: 420, damping: 28, mass: 0.9 }
            : { duration: 0.35, ease: [0.23, 1, 0.32, 1] }
      }
      style={{ transformOrigin: isUser ? '90% 100%' : '10% 100%' }}
    >
      <div
        className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-[1.45] shadow-[0_1px_1.5px_rgba(11,20,26,0.13)] whitespace-pre-line ${
          isUser ? 'bg-white rounded-2xl rounded-tr-sm text-rm-text' : 'bg-[#DCF8C6] rounded-2xl rounded-tl-sm text-rm-text'
        }`}
      >
        {message.qr && <QrGraphic />}
        {message.text}
        <div className="text-[10px] mt-1 text-rm-muted/50 text-right">
          {message.time}
          {isUser && <span className="text-[#53BDEB]"> ✓✓</span>}
        </div>
      </div>
    </motion.div>
  );
}

function OwnerNudge({ reduceMotion }) {
  return (
    <motion.div
      className="flex justify-center py-1"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="bg-white/95 border border-rm-green/25 rounded-2xl px-3.5 py-2.5 text-center shadow-[0_1px_2px_rgba(27,28,26,0.06),0_6px_16px_rgba(0,109,47,0.1)]">
        <div className="text-[12px] text-rm-text font-medium mb-1.5">Aapke gym ke liye bhi — ₹999/month 👉</div>
        <a
          href={WHATSAPP_CTA}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="biz-demo-nudge-cta"
          className="inline-flex items-center gap-1 bg-rm-green text-white text-[12px] font-heading font-bold rounded-full px-3.5 py-1.5 shadow-[0_2px_8px_rgba(37,211,102,0.35)] active:scale-95 transition-transform duration-150"
        >
          DEMO Chalu Karo →
        </a>
      </div>
    </motion.div>
  );
}

function OwnerDemo() {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState(() => [{ id: 0, type: 'bot', text: OWNER_WELCOME, time: ownerTime() }]);
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const idRef = useRef(1);
  const timersRef = useRef([]);
  const queueRef = useRef([]);
  const processingRef = useRef(false);
  const nudgeShownRef = useRef(false);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  }, [messages, reduceMotion]);

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
  };

  const addMessage = (msg) => setMessages((prev) => [...prev, { id: idRef.current++, time: ownerTime(), ...msg }]);

  const processQueue = () => {
    if (processingRef.current) return;
    const next = queueRef.current.shift();
    if (next === undefined) return;
    processingRef.current = true;
    later(() => {
      addMessage({ type: 'typing' });
      later(() => {
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        const reply = buildOwnerReply(next);
        addMessage({ type: 'bot', text: reply.text, qr: reply.qr });
        if (!nudgeShownRef.current) {
          nudgeShownRef.current = true;
          later(() => addMessage({ type: 'nudge' }), 900);
        }
        processingRef.current = false;
        processQueue();
      }, 1200);
    }, 400);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setHasInteracted(true);
    setInput('');
    addMessage({ type: 'user', text });
    setBurstId((b) => b + 1);
    queueRef.current.push(text);
    processQueue();
  };

  const handleChip = (chip) => {
    setHasInteracted(true);
    setInput(chip);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleReset = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    queueRef.current = [];
    processingRef.current = false;
    nudgeShownRef.current = false;
    setMessages([{ id: idRef.current++, type: 'bot', text: OWNER_WELCOME, time: ownerTime() }]);
  };

  return (
    <div className="relative mx-auto" data-testid="owner-demo">
      {/* Ambient glow */}
      <div className="absolute inset-0 -m-12 rounded-full bg-rm-green/[0.18] blur-[80px] phone-glow" aria-hidden="true" />

      {/* Phone frame — same device language as the home page */}
      <div className="phone-float relative w-[300px] sm:w-[320px] h-[580px] sm:h-[620px] bg-rm-text rounded-[40px] p-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(27,28,26,0.1),0_12px_28px_rgba(27,28,26,0.18),0_32px_72px_rgba(27,28,26,0.28),0_0_80px_rgba(37,211,102,0.12)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-rm-text rounded-b-2xl z-10" />

        <div className="w-full h-full rounded-[34px] overflow-hidden bg-rm-wa flex flex-col">
          {/* Header */}
          <div className="relative z-[1] bg-[#075E54] px-4 py-3 pt-8 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center">
              <span className="text-white text-sm">🏢</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold font-heading">RemindMe Business</div>
              <div className="text-green-200 text-[11px]">online</div>
            </div>
            <button
              onClick={handleReset}
              aria-label="Reset demo chat"
              className="p-2 -m-1 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat */}
          <div ref={chatRef} className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar" style={{ backgroundColor: '#ECE5DD' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg) =>
                msg.type === 'typing' ? (
                  <OwnerTypingIndicator key={msg.id} />
                ) : msg.type === 'nudge' ? (
                  <OwnerNudge key={msg.id} reduceMotion={reduceMotion} />
                ) : (
                  <OwnerChatBubble key={msg.id} message={msg} reduceMotion={reduceMotion} />
                )
              )}
            </AnimatePresence>
          </div>

          {/* Command chips */}
          <div className="bg-[#ECE5DD] px-2.5 pb-2 pt-0.5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {OWNER_CHIPS.map((chip, i) => (
              <motion.button
                key={chip}
                onClick={() => handleChip(chip)}
                whileTap={{ scale: 0.92 }}
                style={{ animationDelay: `${i * 0.35}s` }}
                className={`shrink-0 bg-white/95 border border-rm-green/25 text-rm-primary text-[12px] font-medium rounded-full px-3 py-1.5 shadow-[0_1px_2px_rgba(27,28,26,0.08)] ${
                  !hasInteracted && !reduceMotion ? 'chip-hint' : ''
                }`}
              >
                {chip}
              </motion.button>
            ))}
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              enterKeyHint="send"
              placeholder="Command type karo…"
              aria-label="Try an owner command"
              className="flex-1 min-w-0 bg-white rounded-full px-4 py-2 text-[16px] text-rm-text placeholder:text-rm-muted/40 outline-none focus:ring-2 focus:ring-rm-green/40"
            />
            <span className="relative shrink-0">
              <motion.button
                onClick={handleSend}
                whileTap={{ scale: 0.82 }}
                aria-label="Send command"
                className="w-10 h-10 rounded-full bg-[#075E54] flex items-center justify-center shadow-[0_2px_6px_rgba(7,94,84,0.35)]"
              >
                <svg className="w-4 h-4 text-white translate-x-px" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </motion.button>
              {burstId > 0 && !reduceMotion && <SendBurst key={burstId} />}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BusinessLanding() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const smoothScroll = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, []);

  const faqs = [
    { q: "Kya member ko app download karna padega?", a: "Bilkul nahi. Sirf WhatsApp chahiye — jo pehle se hai. RemindMe India seedha WhatsApp pe kaam karta hai." },
    { q: "Pricing kaise kaam karti hai?", a: "₹999/month — pay karte hi turant active. Koi setup fee nahi, koi contract nahi. Cancel anytime — agle mahine se band, koi auto-renew lock nahi." },
    { q: "Agar member reminder nahi chahta?", a: "STOP bhej ke unsubscribe. Meta Business Policy compliant. Fully legal." },
    { q: "Kitne members add kar sakta hoon?", a: "Small: 100, Professional: 500, Enterprise: unlimited. CSV se 100 ek saath." },
    { q: "Custom messages bhej sakta hoon?", a: "Haan. BROADCAST se sabko ek saath — gym band, fee change, offer, kuch bhi." },
    { q: "Data safe hai?", a: "Sirf phone number + expiry date store hota hai. Koi medical data nahi. DPDP Act compliant." },
  ];

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#FAF9F5' }}>
      <AuroraBackground />
      <div className="relative z-[1]">
      <a
        href={WHATSAPP_CTA}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-pulse fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-rm-green flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_20px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-transform duration-200 ease-out"
      ><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>

      <nav
        data-testid="biz-navbar"
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-[rgba(27,28,26,0.07)] shadow-[0_1px_2px_rgba(27,28,26,0.03),0_4px_16px_rgba(27,28,26,0.05),0_12px_32px_rgba(27,28,26,0.04)]'
            : 'border-transparent'
        }`}
        style={{ backgroundColor: 'rgba(250, 249, 245, 0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center">
              <Bell className="w-4 h-4 text-white" />
            </div>
            <span className="font-heading font-extrabold text-lg text-rm-primary tracking-tight">RemindMe India</span>
            <span className="hidden sm:inline-block text-[10px] font-heading font-bold tracking-[0.12em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-2.5 py-1 ml-1">
              For Business
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://remindmeindia.site" className="hidden md:block text-sm font-medium text-rm-muted hover:text-rm-primary transition-colors duration-200">
              Personal App
            </a>
            <button
              onClick={() => smoothScroll('pricing')}
              className="hidden md:block text-sm font-medium text-rm-muted hover:text-rm-primary transition-colors duration-200"
            >
              Pricing
            </button>
            <a
              href={WHATSAPP_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-sm px-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_1px_2px_rgba(0,109,47,0.12),0_4px_12px_rgba(0,109,47,0.18)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_2px_4px_rgba(0,109,47,0.15),0_8px_20px_rgba(0,109,47,0.22)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      <section data-testid="biz-hero" className="relative pt-28 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        {/* Faint dot grid (hero only) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(0, 109, 47, 0.1) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 38%, black 0%, transparent 100%)',
          }}
        />
        {/* Glow blooms */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-32 right-[5%] w-[520px] h-[520px] rounded-full opacity-[0.16] blur-[100px]"
            style={{ background: 'radial-gradient(circle, #25D366 0%, transparent 70%)' }}
          />
          <div
            className="absolute top-1/3 -left-40 w-[440px] h-[440px] rounded-full opacity-[0.1] blur-[90px]"
            style={{ background: 'radial-gradient(circle, #006D2F 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <div className="hero-rise hero-rise-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border border-rm-green/20 shadow-[0_1px_2px_rgba(0,109,47,0.06)]" style={{ backgroundColor: '#E8F5E9' }}>
                <span className="text-sm font-medium text-rm-primary font-body">✅ Trusted by businesses in Indore</span>
              </div>

              <h1
                className="hero-rise hero-rise-2 font-heading font-extrabold text-rm-text"
                style={{ fontSize: 'clamp(38px, 5vw, 58px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}
              >
                Members bhool jaate hain.
                <br />
                <span className="gradient-text-animated">Ab nahi bhoolenge.</span>
              </h1>

              <p className="hero-rise hero-rise-3 mt-6 text-base sm:text-lg text-rm-muted leading-relaxed max-w-[480px] mx-auto lg:mx-0">
                WhatsApp pe automatic subscription renewal reminders. No app. No training. No dashboard. Sirf WhatsApp.
              </p>

              <div className="hero-rise hero-rise-4 mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <a
                  href={WHATSAPP_CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="biz-hero-cta"
                  className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-lg px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_4px_rgba(0,109,47,0.15),0_8px_20px_rgba(0,109,47,0.25),0_20px_48px_rgba(37,211,102,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_8px_rgba(0,109,47,0.18),0_12px_28px_rgba(0,109,47,0.3),0_28px_64px_rgba(37,211,102,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
                >
                  Get Started — ₹999/month →
                </a>
                <button
                  onClick={() => smoothScroll('how-it-works')}
                  className="inline-flex items-center gap-2 rounded-full bg-transparent text-rm-primary border-2 border-rm-primary font-heading font-bold text-sm px-6 py-3.5 hover:bg-rm-surface hover:shadow-[0_2px_8px_rgba(0,109,47,0.12),0_6px_16px_rgba(0,109,47,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
                >
                  Kaise kaam karta hai? ↓
                </button>
              </div>

              <p className="hero-rise hero-rise-5 mt-7 text-[13px] text-rm-muted flex flex-wrap justify-center lg:justify-start gap-x-4 gap-y-1.5 font-medium">
                <span>✓ Active turant</span>
                <span>✓ Setup in 2 minutes</span>
                <span>✓ Cancel anytime</span>
                <span>✓ No app needed</span>
              </p>
            </div>

            {/* Right — the playable owner demo */}
            <div className="hero-rise hero-rise-3 flex-shrink-0 flex items-center justify-center">
              <OwnerDemo />
            </div>
          </div>
        </div>
      </section>

      {/* Industry ticker — same marquee language as home */}
      <div
        className="marquee-hover-pause py-3.5 overflow-hidden"
        data-testid="biz-ticker"
        style={{ background: 'linear-gradient(90deg, #00471F 0%, #006D2F 50%, #00471F 100%)' }}
      >
        <div
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
          }}
        >
          <div className="animate-marquee flex gap-10 whitespace-nowrap" style={{ willChange: 'transform' }}>
            {[0, 1].map((dup) =>
              ['Gyms', 'Clinics', 'Coaching Centers', 'Salons', 'Yoga Studios', 'Swimming Pools', 'Co-working', 'Music Classes', 'Newspaper Delivery', 'Society Fees'].map((item) => (
                <span
                  key={`${dup}-${item}`}
                  className="text-white/90 text-[13px] font-heading font-bold uppercase tracking-[0.08em] flex-shrink-0 flex items-center gap-10"
                >
                  {item}
                  <span className="w-1 h-1 rounded-full bg-rm-green/60" />
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Real numbers — count up on scroll */}
      <section className="py-14 lg:py-20" data-testid="biz-stats">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <BizStatCard icon="🔔" target={600} suffix="+" label="Reminders delivered" index={0} />
            <BizStatCard icon="✅" target={98} suffix="%" label="Delivery rate" index={1} />
            <BizStatCard icon="📊" target={700} suffix="+" label="Reminders created" index={2} />
            <BizStatCard icon="👥" text="100s" label="of users across India" index={3} />
          </div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 overflow-hidden" data-testid="biz-problem">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 42%, rgba(220, 38, 38, 0.04), transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <BizSectionHeader
              eyebrow="The Problem"
              tone="warn"
              title="Yeh problem pehchaan lo"
              sub="Har gym, clinic, aur coaching center ko daily face karna padta hai"
              variants={makeItemVariants(prefersReducedMotion)}
            />
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
            variants={makeContainerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              { i: '😤', t: 'Members chale jaate hain', d: 'Subscription expire, koi yaad nahi dilaya. Member naya gym join kar liya.', iconBg: 'bg-red-50', accent: '#DC2626', glowRGB: '220, 38, 38' },
              { i: '📋', t: 'Excel mein date tracking', d: 'Rozana register, expiry dhundho, manually WhatsApp bhejo. Daily 1-2 ghante waste.', iconBg: 'bg-orange-50', accent: '#EA580C', glowRGB: '234, 88, 12' },
              { i: '😬', t: '"Bhai payment dedo"', d: 'Personal message mein jhijhak. Member ignore karta hai. Revenue loss hota hai.', iconBg: 'bg-yellow-50', accent: '#D97706', glowRGB: '217, 119, 6' },
            ].map((p) => (
              <motion.div
                key={p.t}
                variants={makeItemVariants(prefersReducedMotion)}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group relative bg-white/85 backdrop-blur-sm rounded-3xl p-7 border border-black/[0.05] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)] cursor-default"
              >
                <div
                  aria-hidden="true"
                  className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `0 24px 56px rgba(${p.glowRGB}, 0.14), 0 10px 28px rgba(27, 28, 26, 0.08)` }}
                />
                <div
                  aria-hidden="true"
                  className="absolute top-0 inset-x-8 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accent}55, transparent)` }}
                />
                <div className={`w-14 h-14 rounded-2xl ${p.iconBg} flex items-center justify-center text-2xl mb-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_2px_8px_rgba(27,28,26,0.06)] transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3`}>
                  {p.i}
                </div>
                <h3 className="font-heading font-bold text-lg text-rm-text mb-2">{p.t}</h3>
                <p className="text-rm-muted text-[15px] leading-relaxed font-body">{p.d}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="relative py-16 lg:py-24 overflow-hidden" data-testid="biz-how-it-works">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 50% at 50% 40%, rgba(37, 211, 102, 0.05), transparent 70%)' }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <BizSectionHeader
              eyebrow="⚡ Simple Process"
              title="Sirf 3 steps. Bas."
              sub="No software. No training. No app. Sirf WhatsApp."
              variants={makeItemVariants(prefersReducedMotion)}
            />
          </div>
          <div className="relative flex flex-col gap-10">
            {/* Vertical connector line */}
            <motion.div
              aria-hidden="true"
              className="absolute left-[31px] top-8 bottom-16 w-[2px] rounded-full"
              style={{ background: 'linear-gradient(180deg, #25D366, #006D2F, rgba(37,211,102,0.25))', transformOrigin: 'top center', opacity: 0.4 }}
              initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={VIEWPORT}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
            />

            {[
              { n: '1', t: 'Member ka data do', d: 'WhatsApp pe ek line bhejo:', code: 'ADD 919876543210 Rahul 2026-05-15', sub: 'Ya CSV upload — 100 members ek saath' },
              { n: '2', t: 'Hum automatically remind karenge', d: '4 professional reminders aapke business name ke saath:', timeline: ['7 din pehle', '3 din pehle', 'Expiry wale din', '2 din baad'] },
              { n: '3', t: 'Member khud renew karega', d: 'Time pe reminder = zyada renewals. Members ko bhoolne ka mauka hi nahi milta.', result: true },
            ].map((step, i) => (
              <motion.div
                key={step.n}
                className="relative flex gap-6 items-start"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.2 }
                    : { duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.15 + i * 0.25 }
                }
              >
                {/* Number orb */}
                <motion.div
                  className="relative z-[1] w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #2EDB6F 0%, #006D2F 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 6px rgba(27,28,26,0.12), 0 10px 24px rgba(37,211,102,0.4)',
                  }}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={VIEWPORT}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.2 }
                      : { type: 'spring', stiffness: 380, damping: 18, delay: 0.1 + i * 0.25 }
                  }
                >
                  <span className="text-white font-heading font-extrabold text-xl">{step.n}</span>
                </motion.div>

                <div className="flex-1 pt-1.5">
                  <h3 className="font-heading font-bold text-xl text-rm-text mb-1.5">{step.t}</h3>
                  <p className="text-rm-muted text-[15px] font-body mb-3">{step.d}</p>
                  {step.code && (
                    <div className="inline-block bg-[#E8F5E9] border border-rm-green/25 rounded-xl px-4 py-2.5 font-mono text-sm text-rm-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                      {step.code}
                    </div>
                  )}
                  {step.sub && <div className="text-[13px] text-rm-muted/70 font-body mt-2">{step.sub}</div>}
                  {step.timeline && (
                    <div className="flex gap-2 flex-wrap">
                      {step.timeline.map((t, j) => (
                        <span
                          key={t}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold border ${
                            j === 2
                              ? 'bg-rm-green text-white border-rm-green shadow-[0_2px_8px_rgba(37,211,102,0.35)]'
                              : 'bg-[#E8F5E9] text-rm-primary border-rm-green/25'
                          }`}
                        >
                          {'🔔'} {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {step.result && (
                    <div className="inline-flex items-center gap-2 bg-[#E8F5E9] border border-rm-green/40 rounded-xl px-5 py-2.5 mt-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_4px_12px_rgba(37,211,102,0.15)]">
                      <span className="text-lg">{'✅'}</span>
                      <span className="font-heading font-bold text-rm-primary text-[15px]">Renewal Complete!</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24" data-testid="biz-roi">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={makeItemVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="relative text-center bg-white/85 backdrop-blur-md rounded-[32px] px-6 py-10 sm:px-10 border border-rm-green/20 shadow-[0_2px_4px_rgba(27,28,26,0.04),0_16px_40px_rgba(0,109,47,0.08),0_32px_80px_rgba(27,28,26,0.07)] overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 10% 0%, rgba(37, 211, 102, 0.08), transparent 45%), radial-gradient(circle at 92% 100%, rgba(255, 153, 51, 0.06), transparent 45%)',
              }}
            />
            <div aria-hidden="true" className="absolute top-0 inset-x-10 h-px opacity-70" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)' }} />

            <div className="relative">
              <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
                <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary bg-[#E8F5E9] border border-rm-green/20 rounded-full px-4 py-1.5">
                  Return on Investment
                </span>
                <span className="inline-block text-[11px] font-heading font-bold tracking-[0.12em] uppercase text-rm-muted/80 bg-rm-surface border border-black/[0.06] rounded-full px-3 py-1.5">
                  📝 Example calculation
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-rm-text mb-7" style={{ letterSpacing: '-0.025em' }}>
                Kitna paisa bachega?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-rm-green/25">
                  <div className="text-[13px] text-rm-muted font-body mb-1">5 extra members renew kare</div>
                  <div className="font-heading font-extrabold text-3xl gradient-text tabular-nums">₹7,500+</div>
                  <div className="text-xs text-rm-muted/80 font-body mt-0.5">monthly extra revenue</div>
                </div>
                <div className="p-4 rounded-2xl bg-rm-surface border border-black/[0.06]">
                  <div className="text-[13px] text-rm-muted font-body mb-1">RemindMe India cost</div>
                  <div className="font-heading font-extrabold text-3xl text-rm-text tabular-nums">₹999</div>
                  <div className="text-xs text-rm-muted/80 font-body mt-0.5">per month</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#E8F5E9] border border-rm-green/40 ring-1 ring-rm-green/25">
                  <div className="text-[13px] text-rm-muted font-body mb-1">Net profit</div>
                  <div className="font-heading font-extrabold text-3xl gradient-text tabular-nums">₹6,500+</div>
                  <div className="text-xs text-rm-muted/80 font-body mt-0.5">7.5x ROI</div>
                </div>
              </div>
              <p className="text-sm text-rm-muted font-body">
                Average gym member pays ₹1,500/month. Sirf 1 extra renewal = ₹999 recovered. Baaki sab profit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 lg:py-24 overflow-hidden" data-testid="biz-features">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 45%, rgba(37, 211, 102, 0.06), transparent 70%)' }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <BizSectionHeader
              eyebrow="✨ Features"
              title="Sab kuch WhatsApp pe"
              sub="No app. No dashboard. No training."
              variants={makeItemVariants(prefersReducedMotion)}
            />
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={makeContainerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              { i: '🔔', t: 'Auto Expiry Reminders', d: '7 days, 3 days, expiry day, 2 days after. Professional messages with your business name + contact.' },
              { i: '📊', t: 'Monthly Owner Reports', d: 'Har 1 tarikh ko WhatsApp pe: active, expiring, expired, messages sent.' },
              { i: '📢', t: 'Broadcast Messages', d: 'Ek command se sabko message. Gym band, fee change, offer — sab kuch.' },
              { i: '📱', t: 'QR Code Self-Join', d: 'Front desk pe QR lagao. Member scan kare — auto join. Zero manual work.' },
              { i: '🛡️', t: 'Meta Compliant', d: 'Member STOP bhej ke unsubscribe. Fully legal. WhatsApp Business Policy compliant.' },
              { i: '📋', t: 'CSV Bulk Import', d: 'Excel data hai? CSV upload — 100 members ek saath add, reminders shuru.' },
            ].map((f) => (
              <BizTiltCard key={f.t} feature={f} variants={makeItemVariants(prefersReducedMotion)} reduceMotion={prefersReducedMotion} />
            ))}
          </motion.div>
        </div>
      </section>

      <section id="pricing" className="relative py-16 lg:py-24 overflow-hidden" data-testid="biz-pricing">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 45% 45% at 50% 45%, rgba(37, 211, 102, 0.08), transparent 70%), radial-gradient(ellipse 30% 35% at 65% 30%, rgba(255, 153, 51, 0.04), transparent 70%)',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-14"
            variants={makeItemVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <span className="inline-block text-[12px] font-heading font-bold text-rm-primary bg-[#E8F5E9] border border-rm-green/25 rounded-full px-4 py-1.5 mb-4 shadow-[0_1px_2px_rgba(0,109,47,0.06)]">
              {'⚡'} Active turant · cancel anytime · no contract
            </span>
            <div>
              <span className="inline-block text-[11px] font-heading font-bold tracking-[0.2em] uppercase text-rm-primary mb-3">Pricing</span>
            </div>
            <h2 className="font-heading font-extrabold text-4xl sm:text-5xl text-rm-text" style={{ letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center"
            variants={makeContainerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {[
              { name: 'Small', price: '999', members: '100', features: ['Auto expiry reminders', 'Broadcast messages', 'Monthly reports', 'QR code join', 'WhatsApp support'], popular: false, cta: 'https://rzp.io/rzp/0GZyM4M' },
              { name: 'Professional', price: '1,999', members: '500', features: ['Everything in Small', 'Priority support', 'CSV bulk import', 'Custom welcome message', 'Expiry grace reminders'], popular: true, cta: 'https://rzp.io/rzp/e3OwPfK' },
              { name: 'Enterprise', price: '2,999', members: 'Unlimited', features: ['Everything in Professional', 'Multi-staff access', 'Dedicated support', 'Custom integrations', 'SLA guarantee'], popular: false, cta: 'https://rzp.io/rzp/r0zJWcih' },
            ].map((plan) =>
              plan.popular ? (
                /* Professional — dominant, animated moving border, dark green */
                <motion.div
                  key={plan.name}
                  variants={makeItemVariants(prefersReducedMotion)}
                  whileHover={prefersReducedMotion ? {} : { y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="relative md:scale-[1.05]"
                  data-testid="biz-plan-professional"
                >
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rm-green to-[#00C853] text-rm-text text-xs font-bold font-heading px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(37,211,102,0.45),inset_0_1px_0_rgba(255,255,255,0.4)] whitespace-nowrap">
                      ⭐ Most Popular
                    </span>
                  </div>
                  <div className="moving-border shadow-[0_2px_4px_rgba(27,28,26,0.08),0_20px_56px_rgba(0,109,47,0.26),0_40px_96px_rgba(27,28,26,0.12)]">
                    <div
                      className="relative rounded-[26px] p-8 text-white overflow-hidden"
                      style={{ background: 'linear-gradient(160deg, #00471F 0%, #006D2F 55%, #0A7A3C 100%)' }}
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at 85% 0%, rgba(37, 211, 102, 0.3), transparent 50%)' }}
                      />
                      <div className="relative">
                        <p className="text-white/60 text-xs font-heading font-bold tracking-[0.15em] uppercase mb-2">{plan.name}</p>
                        <div className="flex items-baseline gap-1.5 mb-1">
                          <span className="font-heading font-extrabold text-5xl text-white tabular-nums" style={{ letterSpacing: '-0.02em' }}>₹{plan.price}</span>
                          <span className="text-white/60 text-sm font-body">/month</span>
                        </div>
                        <p className="text-[13px] text-white/60 font-body mb-6">Up to {plan.members} members</p>
                        <ul className="space-y-2.5 mb-7">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-center gap-2.5 text-sm text-white/90 font-body">
                              <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                                <Check className="w-3 h-3 text-rm-green" />
                              </span>
                              {f}
                            </li>
                          ))}
                          <li className="flex items-center gap-2.5 text-[13px] text-rm-green font-semibold font-body">
                            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{'🎁'}</span>
                            No setup fee · cancel anytime
                          </li>
                        </ul>
                        <a
                          href={plan.cta}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center rounded-full bg-white text-rm-primary font-heading font-bold text-base px-6 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_8px_rgba(0,0,0,0.2),0_8px_24px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.25),0_12px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
                        >
                          Pay & Get Started
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Small / Enterprise — calm frosted cards */
                <motion.div
                  key={plan.name}
                  variants={makeItemVariants(prefersReducedMotion)}
                  whileHover={prefersReducedMotion ? {} : { y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group relative bg-white/85 backdrop-blur-sm rounded-3xl p-8 border border-black/[0.06] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_10px_28px_rgba(27,28,26,0.06)]"
                  data-testid={`biz-plan-${plan.name.toLowerCase()}`}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: '0 20px 48px rgba(27, 28, 26, 0.1)' }}
                  />
                  <p className="text-rm-muted text-xs font-heading font-bold tracking-[0.15em] uppercase mb-2">{plan.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="font-heading font-extrabold text-4xl text-rm-text tabular-nums" style={{ letterSpacing: '-0.02em' }}>₹{plan.price}</span>
                    <span className="text-rm-muted text-sm font-body">/month</span>
                  </div>
                  <p className="text-[13px] text-rm-muted font-body mb-6">Up to {plan.members} members</p>
                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-rm-text font-body">
                        <span className="w-5 h-5 rounded-full bg-rm-green/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-rm-green" />
                        </span>
                        {f}
                      </li>
                    ))}
                    <li className="flex items-center gap-2.5 text-[13px] text-rm-primary font-semibold font-body">
                      <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">{'🎁'}</span>
                      No setup fee · cancel anytime
                    </li>
                  </ul>
                  <a
                    href={plan.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-full border-2 border-rm-primary text-rm-primary font-heading font-bold text-base px-6 py-3 hover:bg-rm-primary hover:text-white hover:shadow-[0_4px_16px_rgba(0,109,47,0.2)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out"
                  >
                    Pay & Get Started
                  </a>
                </motion.div>
              )
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20" data-testid="biz-use-cases">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <BizSectionHeader
              eyebrow="Use Cases"
              title="Kis business ke liye?"
              sub="Koi bhi subscription-based business"
              variants={makeItemVariants(prefersReducedMotion)}
            />
          </div>
          <motion.div
            className="flex flex-wrap gap-2.5"
            variants={makeContainerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {['🏋️ Gyms & Fitness', '🏥 Clinics & Doctors', '📚 Coaching Centers', '💇 Salons & Spas', '🏊 Swimming Pools', '🧘 Yoga & Dance', '🏢 Co-working', '📰 Newspaper Delivery', '🚗 Society Fees', '🎵 Music Classes'].map((tag) => (
              <motion.span
                key={tag}
                variants={
                  prefersReducedMotion
                    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                    : {
                        hidden: { opacity: 0, scale: 0.85, y: 10 },
                        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 380, damping: 22 } },
                      }
                }
                whileHover={prefersReducedMotion ? {} : { y: -3 }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-rm-green/20 text-rm-primary font-medium text-sm shadow-[0_1px_2px_rgba(27,28,26,0.04),0_4px_12px_rgba(27,28,26,0.04)] hover:bg-rm-green hover:text-white hover:border-rm-green hover:shadow-[0_4px_16px_rgba(37,211,102,0.3)] transition-colors duration-200 cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24" data-testid="biz-faq">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <BizSectionHeader eyebrow="FAQ" title="Common questions" variants={makeItemVariants(prefersReducedMotion)} />
          </div>
          <motion.div
            className="flex flex-col gap-3"
            variants={makeContainerVariants(prefersReducedMotion)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            {faqs.map((faq, i) => {
              const open = activeAccordion === i;
              return (
                <motion.div
                  key={i}
                  variants={makeItemVariants(prefersReducedMotion)}
                  className={`rounded-2xl bg-white/85 backdrop-blur-sm border overflow-hidden transition-all duration-300 ${
                    open
                      ? 'border-rm-green/40 shadow-[0_2px_4px_rgba(27,28,26,0.04),0_10px_28px_rgba(0,109,47,0.09)]'
                      : 'border-black/[0.06] shadow-[0_1px_2px_rgba(27,28,26,0.04),0_4px_12px_rgba(27,28,26,0.04)]'
                  }`}
                >
                  <button
                    onClick={() => setActiveAccordion(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 font-heading font-bold text-[15px] text-rm-text"
                  >
                    {faq.q}
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.645, 0.045, 0.355, 1] }}
                      className="text-rm-green text-xl leading-none shrink-0"
                      aria-hidden="true"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-rm-muted font-body leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section
        className="relative py-20 lg:py-28 overflow-hidden"
        data-testid="biz-final-cta"
        style={{ background: 'linear-gradient(140deg, #00582A 0%, #007D36 45%, #1FBF5B 100%)' }}
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -right-24 w-[440px] h-[440px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255, 153, 51, 0.16) 0%, transparent 65%)', filter: 'blur(70px)' }}
          />
          <div className="aurora-grain" style={{ opacity: 0.05 }} />
          <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }} />
        </div>
        <motion.div
          className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={makeItemVariants(prefersReducedMotion)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <span className="block text-5xl mb-5">{'🚀'}</span>
          <h2 className="font-heading font-extrabold text-white text-4xl sm:text-5xl mb-4" style={{ letterSpacing: '-0.025em', lineHeight: 1.12 }}>
            Ready to start?{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #B9F6CA, #FFFFFF, #FFD9A8)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Aaj hi.
            </span>
          </h2>
          <p className="text-lg text-white/85 font-body mb-9 leading-relaxed">2 minute setup. No software. No app. Sirf WhatsApp.</p>
          <span className="relative inline-block">
            <span aria-hidden="true" className="cta-ring absolute inset-0 rounded-full" />
            <a
              href={WHATSAPP_CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer btn-shimmer-dark relative inline-flex items-center gap-2 rounded-full bg-white text-rm-primary font-heading font-bold text-lg px-9 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_4px_12px_rgba(0,0,0,0.18),0_20px_56px_rgba(0,0,0,0.28)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_6px_16px_rgba(0,0,0,0.22),0_28px_72px_rgba(0,0,0,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
            >
              Get Started — ₹999/month →
            </a>
          </span>
          <p className="text-[13px] text-white/60 font-body mt-5">
            Or email:{' '}
            <a href="mailto:hello.remindmeindia@gmail.com" className="text-white underline font-semibold hover:opacity-80 transition-opacity">
              hello.remindmeindia@gmail.com
            </a>
          </p>
        </motion.div>
      </section>

      <footer className="relative bg-[#141511] py-8 overflow-hidden" data-testid="biz-footer">
        {/* Glowing top seam */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 pointer-events-none">
          <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.5), transparent)' }} />
          <div className="mx-auto h-20 max-w-2xl" style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 0%, rgba(37, 211, 102, 0.08), transparent 70%)' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center shadow-[0_0_14px_rgba(37,211,102,0.3)]">
              <Bell className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[13px] text-white/40 font-body">© 2026 RemindMe India</span>
          </div>
          <div className="flex gap-6">
            {[
              { l: 'Personal App', h: 'https://remindmeindia.site' },
              { l: 'WhatsApp Bot', h: BOT_LINK },
              { l: 'Contact', h: 'mailto:hello.remindmeindia@gmail.com' },
            ].map((l) => (
              <a
                key={l.l}
                href={l.h}
                target={l.h.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group text-[13px] text-white/40 hover:text-rm-green font-body transition-colors duration-200"
              >
                <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5">{l.l}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
