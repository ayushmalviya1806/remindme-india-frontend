import { useState, useEffect, useRef } from 'react';

const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const CHAT_SEQUENCE = [
  { type: 'user', text: 'Kal subah 8 baje medicine lena hai' },
  { type: 'typing' },
  { type: 'bot', text: '✅ Done! Reminder set:\n📝 Medicine\n📅 Kal, 8:00 AM IST\n🔔 Main yaad dila dunga!' },
  { type: 'user', text: '5 tareekh ko EMI hai, har mahine' },
  { type: 'typing' },
  { type: 'bot', text: '✅ Recurring reminder set!\n📝 EMI Payment\n📅 5th of every month\n🔁 Monthly repeat\n💰 Kabhi late fee nahi!' },
  { type: 'user', text: 'abhi 10 min mein remind karo' },
  { type: 'typing' },
  { type: 'bot', text: '⚡ Done! 10 minutes mein ping karunga 🔔' },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[#DCF8C6] rounded-2xl rounded-tl-sm w-fit shadow-sm">
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-rm-muted/50 typing-dot" />
    </div>
  );
}

function ChatBubble({ message }) {
  const isUser = message.type === 'user';
  if (message.type === 'typing') return <TypingIndicator />;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} chat-message-enter`}>
      <div
        className={`max-w-[85%] px-3.5 py-2 text-[13px] leading-[1.45] shadow-sm whitespace-pre-line ${
          isUser
            ? 'bg-white rounded-2xl rounded-tr-sm text-rm-text'
            : 'bg-[#DCF8C6] rounded-2xl rounded-tl-sm text-rm-text'
        }`}
      >
        {message.text}
        <div className={`text-[10px] mt-1 ${isUser ? 'text-rm-muted/50 text-right' : 'text-rm-muted/50'}`}>
          {isUser ? '9:41 AM' : '9:41 AM ✓✓'}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup() {
  const [messages, setMessages] = useState([]);
  const chatRef = useRef(null);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    function showNext() {
      if (cancelled) return;
      const idx = indexRef.current;

      if (idx >= CHAT_SEQUENCE.length) {
        // All messages shown — wait 3s then reset
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          setMessages([]);
          indexRef.current = 0;
          timeoutRef.current = setTimeout(showNext, 800);
        }, 3000);
        return;
      }

      const msg = CHAT_SEQUENCE[idx];
      if (msg.type === 'typing') {
        // Show typing indicator
        setMessages((prev) => [...prev, msg]);
        indexRef.current = idx + 1;
        timeoutRef.current = setTimeout(() => {
          if (cancelled) return;
          // Remove typing, then show actual bot response
          setMessages((prev) => prev.filter((m) => m.type !== 'typing'));
          showNext();
        }, 1200);
      } else {
        // Show user or bot message
        setMessages((prev) => [...prev, msg]);
        indexRef.current = idx + 1;
        timeoutRef.current = setTimeout(showNext, msg.type === 'user' ? 1200 : 1800);
      }
    }

    timeoutRef.current = setTimeout(showNext, 800);
    return () => {
      cancelled = true;
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative" data-testid="phone-mockup">
      {/* Ambient glow */}
      <div className="absolute inset-0 -m-12 rounded-full bg-rm-green/[0.15] blur-[80px] phone-glow" />

      {/* Phone frame */}
      <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] bg-rm-text rounded-[40px] p-[6px] shadow-[0px_24px_64px_rgba(27,28,26,0.25)]">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-rm-text rounded-b-2xl z-10" />

        {/* Screen */}
        <div className="w-full h-full rounded-[34px] overflow-hidden bg-rm-wa flex flex-col">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] px-4 py-3 pt-8 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rm-primary to-rm-green flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div>
              <div className="text-white text-sm font-semibold font-heading">RemindMe India</div>
              <div className="text-green-200 text-[11px]">online</div>
            </div>
          </div>

          {/* Chat area */}
          <div
            ref={chatRef}
            className="flex-1 p-3 space-y-2 overflow-y-auto no-scrollbar"
            style={{ backgroundColor: '#ECE5DD' }}
          >
            {messages.map((msg, i) => (
              <ChatBubble key={`${i}-${msg.type}`} message={msg} />
            ))}
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-4 py-2 text-[12px] text-rm-muted/40">
              Type a message...
            </div>
            <div className="w-9 h-9 rounded-full bg-[#075E54] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </div>
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
      style={{ backgroundColor: '#FAF9F5' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side */}
          <div className="flex-1 lg:max-w-[60%] text-center lg:text-left">
            {/* Badge */}
            <div className="scroll-fade-up inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8" style={{ backgroundColor: '#E8F5E9' }}>
              <span className="text-sm font-medium text-rm-primary font-body">
                🔥 1,000+ reminders delivered • Powered by GPT-4 AI
              </span>
            </div>

            {/* Headline */}
            <h1 className="scroll-fade-up scroll-fade-up-delay-1 font-heading font-extrabold tracking-tight text-rm-text" style={{ fontSize: 'clamp(42px, 5.5vw, 64px)', lineHeight: 1.1 }}>
              WhatsApp pe bolo,<br />
              <span className="text-rm-green">yaad dila dega.</span>
            </h1>

            {/* Subheadline */}
            <p className="scroll-fade-up scroll-fade-up-delay-2 mt-6 text-xl sm:text-2xl font-heading font-semibold text-rm-primary">
              India ka pehla AI reminder — Hindi, Hinglish, English. No app download.
            </p>

            {/* Body */}
            <p className="scroll-fade-up scroll-fade-up-delay-3 mt-5 text-base sm:text-lg text-rm-muted leading-relaxed max-w-[480px] mx-auto lg:mx-0">
              Doctor appointments, EMI dates, meetings, medicine, birthdays — sab kuch yaad rahega. Hindi mein, English mein, ya Hinglish mein — jo bol do, yaad rakhega.
            </p>

            {/* Primary CTA */}
            <div className="scroll-fade-up scroll-fade-up-delay-4 mt-8 flex flex-col items-center lg:items-start gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-button"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rm-primary to-rm-green text-white font-heading font-bold text-lg px-8 py-4 shadow-[0px_12px_32px_rgba(0,109,47,0.3)] hover:shadow-[0px_16px_40px_rgba(0,109,47,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                � WhatsApp pe Start Karo — Free hai
                <span>→</span>
              </a>

              {/* Trust badges */}
              <p className="text-[13px] text-rm-muted flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1" data-testid="hero-trust-badges">
                <span>✓ Free to start</span>
                <span>✓ No app download</span>
                <span>✓ No credit card</span>
                <span>✓ Setup in 30 seconds</span>
              </p>

              {/* Secondary CTA */}
              <a
                href="#how-it-works"
                data-testid="hero-secondary-cta"
                className="inline-flex items-center gap-2 rounded-full bg-transparent text-rm-primary border-2 border-rm-primary font-heading font-bold text-sm px-6 py-3 hover:bg-rm-surface transition-all duration-300 mt-1"
              >
                Kaise kaam karta hai? ↓
              </a>
            </div>
          </div>

          {/* Right Side - Phone Mockup */}
          <div className="scroll-fade-up flex-shrink-0 flex items-center justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
