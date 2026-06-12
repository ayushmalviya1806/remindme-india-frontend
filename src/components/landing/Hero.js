import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { useDesktopPointer } from '@/hooks/useDesktopPointer';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const WELCOME_TEXT =
  'Namaste! 👋 Main RemindMe hoon.\nKuch bhi yaad dilana ho — bas bol do.\nNeeche type karo ya chip tap karo 👇';

const CHIPS = ['Kal 5 baje gym 🏋️', '5 tareekh EMI 💰', 'Mummy ki medicine 9 baje 💊'];

function nowTime() {
  return new Date()
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toUpperCase();
}

/* Near-silent send tick via WebAudio — only ever called from a user gesture */
function playTick() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1320;
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.09);
    setTimeout(() => ctx.close(), 250);
  } catch (e) {
    /* sound is a non-essential nicety */
  }
}

/* Lightweight Hinglish reminder parser — keyword + time heuristics, never errors */
function parseReminder(raw) {
  const text = raw.toLowerCase();

  const minMatch = text.match(/(\d+)\s*(min|minute|mint)/);
  const hourMatch = text.match(/(\d{1,2})(?::(\d{2}))?\s*baje/);
  const dateMatch = text.match(/(\d{1,2})\s*(tareekh|tarikh|taarikh)/);
  const isKal = /\bkal\b/.test(text);
  const isAaj = /\baaj\b/.test(text);
  const isParso = /\bparso\b/.test(text);
  const morning = /subah|morning/.test(text);
  const evening = /shaam|sham|evening|raat|night/.test(text);
  let recurring = /har mahine|every month|monthly/.test(text);
  if (dateMatch && /emi|bill|rent|kiraya|recharge|fees/.test(text)) recurring = true;

  const dayLabel = isKal ? 'Kal' : isParso ? 'Parso' : isAaj ? 'Aaj' : null;

  let when = null;
  if (minMatch) {
    when = `${minMatch[1]} minute mein ⚡`;
  } else if (hourMatch) {
    let h = parseInt(hourMatch[1], 10);
    const m = hourMatch[2] || '00';
    let mer;
    if (h >= 13 && h <= 23) {
      h -= 12;
      mer = 'PM';
    } else if (h === 0) {
      h = 12;
      mer = 'AM';
    }
    // hours outside 0-23 leave `when` null → graceful generic confirm
    if (h >= 1 && h <= 12) {
      if (!mer) {
        if (morning) mer = 'AM';
        else if (evening) mer = 'PM';
        else mer = h >= 8 && h <= 11 ? 'AM' : 'PM';
      }
      when = `${dayLabel || 'Aaj'}, ${h}:${m} ${mer}`;
    }
  } else if (dateMatch) {
    when = `${dateMatch[1]} tareekh`;
  } else if (dayLabel) {
    when = dayLabel;
  }

  let title = raw
    .replace(/[0-9]+(:[0-9]+)?/g, ' ')
    .replace(
      /\b(kal|aaj|parso|abhi|subah|shaam|sham|raat|morning|evening|night|baje|tareekh|tarikh|taarikh|min|minute|mint|mein|me|ko|ka|ki|ke|pe|par|se|har|mahine|month|monthly|every|mujhe|yaad|dilana|dila|dena|do|karo|karna|hai|ho|remind|reminder|set|bana|banao|lagao|lagana|please|pls|at|am|pm)\b/gi,
      ' '
    )
    .replace(/\s+/g, ' ')
    .trim();
  title = title
    .split(' ')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
  if (title.length > 38) title = `${title.slice(0, 38)}…`;

  return { title, when, recurring, parsed: Boolean(when) };
}

function buildBotReply(raw) {
  const { title, when, recurring, parsed } = parseReminder(raw);
  if (!parsed) {
    return `✅ Done! Maine note kar liya:\n📝 ${title || raw.slice(0, 38)}\n🔔 Sahi time pe yaad dila dunga!`;
  }
  const lines = ['✅ Reminder set!', `📝 ${title || 'Reminder'}`, `📅 ${when}`];
  if (recurring) lines.push('🔁 Har mahine repeat');
  lines.push('🔔 Main yaad dila dunga!');
  return lines.join('\n');
}

/* Particle burst from the send button */
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

/* 3D tilt-toward-cursor wrapper (desktop only, spring-smoothed) */
function TiltWrapper({ children }) {
  const reduceMotion = useReducedMotion();
  const desktop = useDesktopPointer();
  const active = desktop && !reduceMotion;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!active) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div
        style={{
          rotateX: active ? rotateX : 0,
          rotateY: active ? rotateY : 0,
          transformStyle: 'preserve-3d',
          willChange: active ? 'transform' : 'auto',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* Floating notification card drifting near the phone */
function FloatingCard({ className, delay = 0, drift = -10, duration = 4.5, children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`hidden md:block absolute z-10 ${className}`}
      style={{ z: 60 }}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="flex items-center gap-2.5 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 border border-black/[0.05] shadow-[0_1px_2px_rgba(27,28,26,0.05),0_8px_20px_rgba(27,28,26,0.08),0_20px_48px_rgba(27,28,26,0.08)]"
        animate={reduceMotion ? {} : { y: [0, drift, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration, delay: delay + 0.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function TypingIndicator() {
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

function ChatBubble({ message, reduceMotion }) {
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
          isUser
            ? 'bg-white rounded-2xl rounded-tr-sm text-rm-text'
            : 'bg-[#DCF8C6] rounded-2xl rounded-tl-sm text-rm-text'
        }`}
      >
        {message.text}
        <div className="text-[10px] mt-1 text-rm-muted/50 text-right">
          {message.time}
          {isUser && <span className="text-[#53BDEB]"> ✓✓</span>}
        </div>
      </div>
    </motion.div>
  );
}

/* Inline conversion nudge shown after the first bot reply */
function NudgeCard({ reduceMotion }) {
  return (
    <motion.div
      className="flex justify-center py-1"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div className="bg-white/95 border border-rm-green/25 rounded-2xl px-3.5 py-2.5 text-center shadow-[0_1px_2px_rgba(27,28,26,0.06),0_6px_16px_rgba(0,109,47,0.1)]">
        <div className="text-[12px] text-rm-text font-medium mb-1.5">Asaan tha na? 👉 Real mein try karo</div>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="demo-nudge-cta"
          className="inline-flex items-center gap-1 bg-rm-green text-white text-[12px] font-heading font-bold rounded-full px-3.5 py-1.5 shadow-[0_2px_8px_rgba(37,211,102,0.35)] active:scale-95 transition-transform duration-150"
        >
          WhatsApp pe Start Karo →
        </a>
      </div>
    </motion.div>
  );
}

function PhoneMockup() {
  const reduceMotion = useReducedMotion();
  const [messages, setMessages] = useState(() => [
    { id: 0, type: 'bot', text: WELCOME_TEXT, time: nowTime() },
  ]);
  const [input, setInput] = useState('');
  const [soundOn, setSoundOn] = useState(false);
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
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    }
  }, [messages, reduceMotion]);

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timersRef.current.push(t);
  };

  const addMessage = (msg) =>
    setMessages((prev) => [...prev, { id: idRef.current++, time: nowTime(), ...msg }]);

  const processQueue = () => {
    if (processingRef.current) return;
    const next = queueRef.current.shift();
    if (next === undefined) return;
    processingRef.current = true;
    later(() => {
      addMessage({ type: 'typing' });
      later(() => {
        setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
        addMessage({ type: 'bot', text: buildBotReply(next) });
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
    if (soundOn) playTick();
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
    setMessages([{ id: idRef.current++, type: 'bot', text: WELCOME_TEXT, time: nowTime() }]);
  };

  return (
    <div className="relative" data-testid="phone-mockup">
      {/* Ambient glow */}
      <div className="absolute inset-0 -m-12 rounded-full bg-rm-green/[0.18] blur-[80px] phone-glow" />

      {/* Floating notification cards */}
      <FloatingCard className="-left-40 top-16" delay={0.9} drift={-12} duration={4.2}>
        <span className="text-xl">💊</span>
        <div>
          <div className="text-[12px] font-heading font-bold text-rm-text leading-tight">Medicine yaad dilaya</div>
          <div className="text-[11px] text-rm-muted flex items-center gap-1">8:00 AM <span className="text-rm-green font-semibold">✓ Delivered</span></div>
        </div>
      </FloatingCard>

      <FloatingCard className="-right-36 top-44" delay={1.1} drift={-14} duration={5.2}>
        <span className="text-xl">💰</span>
        <div>
          <div className="text-[12px] font-heading font-bold text-rm-text leading-tight">EMI — 5 tareekh</div>
          <div className="text-[11px] text-rm-muted">Har mahine 🔁</div>
        </div>
      </FloatingCard>

      <FloatingCard className="-left-32 bottom-28" delay={1.3} drift={-10} duration={4.8}>
        <span className="text-xl">🎂</span>
        <div>
          <div className="text-[12px] font-heading font-bold text-rm-text leading-tight">Mummy ka birthday</div>
          <div className="text-[11px] text-rm-muted">Kal, 12:00 AM 🔔</div>
        </div>
      </FloatingCard>

      {/* Phone frame */}
      <div className="phone-float relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] bg-rm-text rounded-[40px] p-[6px] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_2px_4px_rgba(27,28,26,0.1),0_12px_28px_rgba(27,28,26,0.18),0_32px_72px_rgba(27,28,26,0.28),0_0_80px_rgba(37,211,102,0.12)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-rm-text rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="w-full h-full rounded-[34px] overflow-hidden bg-rm-wa flex flex-col">
          {/* WhatsApp Header */}
          <div className="relative z-[1] bg-[#075E54] px-4 py-3 pt-8 flex items-center gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.15)]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-semibold font-heading">RemindMe India</div>
              <div className="text-green-200 text-[11px]">online</div>
            </div>
            <button
              onClick={() => setSoundOn((s) => !s)}
              aria-label={soundOn ? 'Mute send sound' : 'Enable send sound'}
              className="p-2 -m-1 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={handleReset}
              aria-label="Reset demo chat"
              className="p-2 -m-1 text-white/70 hover:text-white active:scale-90 transition-all duration-150"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar"
            style={{ backgroundColor: '#ECE5DD' }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) =>
                msg.type === 'typing' ? (
                  <TypingIndicator key={msg.id} />
                ) : msg.type === 'nudge' ? (
                  <NudgeCard key={msg.id} reduceMotion={reduceMotion} />
                ) : (
                  <ChatBubble key={msg.id} message={msg} reduceMotion={reduceMotion} />
                )
              )}
            </AnimatePresence>
          </div>

          {/* Suggestion chips */}
          <div className="bg-[#ECE5DD] px-2.5 pb-2 pt-0.5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {CHIPS.map((chip) => (
              <motion.button
                key={chip}
                onClick={() => handleChip(chip)}
                whileTap={{ scale: 0.92 }}
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
              placeholder="Type karo… 'kal 7 baje yoga'"
              aria-label="Try a reminder message"
              className="flex-1 min-w-0 bg-white rounded-full px-4 py-2 text-[16px] text-rm-text placeholder:text-rm-muted/40 outline-none focus:ring-2 focus:ring-rm-green/40"
            />
            <span className="relative shrink-0">
              <motion.button
                onClick={handleSend}
                whileTap={{ scale: 0.82 }}
                aria-label="Send message"
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

export default function Hero() {
  return (
    <section
      data-testid="hero-section"
      className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden"
    >
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

      {/* Ambient glow blooms */}
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
          {/* Left Side */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left">
            {/* Badge */}
            <div className="hero-rise hero-rise-1 inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 border border-rm-green/20 shadow-[0_1px_2px_rgba(0,109,47,0.06)]" style={{ backgroundColor: '#E8F5E9' }}>
              <span className="text-sm font-medium text-rm-primary font-body">
                🔥 600+ reminders delivered • AI-Powered • WhatsApp Native
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-rise hero-rise-2 font-heading font-extrabold text-rm-text" style={{ fontSize: 'clamp(42px, 5.5vw, 64px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              WhatsApp pe bolo,<br />
              <span className="gradient-text-animated">yaad dila dega.</span>
            </h1>

            {/* Subheadline */}
            <p className="hero-rise hero-rise-3 mt-6 text-xl sm:text-2xl font-heading font-semibold text-rm-primary" style={{ letterSpacing: '-0.01em' }}>
              India ka smartest AI reminder — Hindi, Hinglish, English. No app download.
            </p>

            {/* Body */}
            <p className="hero-rise hero-rise-4 mt-5 text-base sm:text-lg text-rm-muted leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              Doctor appointments, EMI dates, meetings, medicine, birthdays — sab kuch yaad rahega. Hindi mein, English mein, ya Hinglish mein — jo bol do, yaad rakhega.
            </p>

            {/* Primary CTA */}
            <div className="hero-rise hero-rise-5 mt-8 flex flex-col items-center lg:items-start gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-button"
                className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-lg px-8 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_2px_4px_rgba(0,109,47,0.15),0_8px_20px_rgba(0,109,47,0.25),0_20px_48px_rgba(37,211,102,0.25)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_8px_rgba(0,109,47,0.18),0_12px_28px_rgba(0,109,47,0.3),0_28px_64px_rgba(37,211,102,0.32)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
              >
                🚀 WhatsApp pe Start Karo — Free hai
                <span>→</span>
              </a>

              {/* Trust badges */}
              <p className="text-[13px] text-rm-muted flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1" data-testid="hero-trust-badges">
                <span>✓ Free to start</span>
                <span>✓ No app download</span>
                <span>✓ No credit card</span>
                <span>✓ Setup in 30 seconds</span>
                <span>✓ Meta Verified Business</span>
                <span>✓ Made in India 🇮🇳</span>
              </p>

              {/* Live counter */}
              <div className="flex items-center gap-2 mt-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-sm text-rm-muted font-body">600+ reminders delivered • hundreds of users across India • 98% delivery rate</span>
              </div>

              {/* Secondary CTA */}
              <a
                href="#how-it-works"
                data-testid="hero-secondary-cta"
                className="inline-flex items-center gap-2 rounded-full bg-transparent text-rm-primary border-2 border-rm-primary font-heading font-bold text-sm px-6 py-3 hover:bg-rm-surface hover:shadow-[0_2px_8px_rgba(0,109,47,0.12),0_6px_16px_rgba(0,109,47,0.08)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out mt-1"
              >
                Kaise kaam karta hai? ↓
              </a>
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="hero-rise hero-rise-3 flex-shrink-0 flex items-center justify-center">
            <TiltWrapper>
              <PhoneMockup />
            </TiltWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
