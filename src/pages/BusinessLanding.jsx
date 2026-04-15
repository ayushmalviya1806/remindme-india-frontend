import { useState, useEffect, useRef, useCallback } from "react";

const WHATSAPP_CTA = "https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business";
const BOT_LINK = "https://wa.me/916269915175?text=Hi";

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); } },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const chatScenes = [
  { label: "Add Member", messages: [
    { from: "out", text: "ADD 919876543210 Rahul 2026-05-15" },
    { from: "in", text: "\u2705 Rahul added to Pran Fitness\n\ud83d\udcc5 Expiry: 15 May 2026\n\ud83d\udd14 Auto reminders set:\n  \u2022 7 days before\n  \u2022 3 days before\n  \u2022 On expiry day\n  \u2022 2 days after expiry" },
  ]},
  { label: "My Members", messages: [
    { from: "out", text: "MY MEMBERS" },
    { from: "in", text: "\ud83d\udccb Pran Fitness \u2014 38 members\n\n\ud83d\udfe2 Active: 32\n\ud83d\udfe1 Expiring soon: 4\n\ud83d\udd34 Expired: 2\n\nExpiring this week:\n\u2022 Rahul \u2014 3 days\n\u2022 Priya \u2014 5 days\n\u2022 Amit \u2014 7 days" },
  ]},
  { label: "Broadcast", messages: [
    { from: "out", text: "BROADCAST Kal gym band hai" },
    { from: "in", text: "\ud83d\udce2 Broadcast sent!\n\n\"Kal gym band hai\"\n\nDelivered: 38/38 members \u2705\nRate: 100%" },
  ]},
];

const WhatsAppDemo = () => {
  const [tab, setTab] = useState(0);
  const [shown, setShown] = useState([]);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    setShown([]); setTyping(false);
    let cancelled = false;
    const msgs = chatScenes[tab]?.messages || [];
    if (!msgs.length) return;
    let i = 0;
    const next = () => {
      if (cancelled || i >= msgs.length) return;
      setTyping(true);
      setTimeout(() => {
        if (cancelled) return;
        setTyping(false);
        setShown(p => [...p, msgs[i]]);
        i++;
        setTimeout(next, 420);
      }, msgs[i].from === "in" ? 1100 : 250);
    };
    setTimeout(next, 300);
    return () => { cancelled = true; };
  }, [tab]);
  return (
    <div style={{ maxWidth: 420 }} className="mx-auto w-full">
      <div className="flex gap-2 mb-5 justify-center">
        {chatScenes.map((s, i) => (
          <button key={s.label} onClick={() => setTab(i)} style={{ background: tab === i ? "#25D366" : "#f3f4f6", color: tab === i ? "#fff" : "#6b7280", border: "none", borderRadius: 999, padding: "6px 18px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .25s" }}>{s.label}</button>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.12)", border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <div style={{ background: "#075E54", padding: "8px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{"\ud83d\udd14"}</div>
            <div><div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>RemindMe India</div><div style={{ color: "#b2dfdb", fontSize: 11 }}>online</div></div>
          </div>
        </div>
        <div style={{ height: 300, overflowY: "auto", padding: "16px 14px", background: "#e5ddd5" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {shown.filter(m => m && m.from).map((msg, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: msg.from === "out" ? "flex-end" : "flex-start" }}>
                <div style={{ background: msg.from === "out" ? "#dcf8c6" : "#fff", borderRadius: msg.from === "out" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "9px 13px", maxWidth: "82%", fontSize: 13, lineHeight: 1.55, color: "#111", whiteSpace: "pre-wrap", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                  {msg.text}
                  <div style={{ textAlign: "right", fontSize: 10, color: "#8696a0", marginTop: 3 }}>{new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })}{msg.from === "out" && " \u2713\u2713"}</div>
                </div>
              </div>
            ))}
            {typing && shown.length < (chatScenes[tab]?.messages?.length || 0) && (
              <div style={{ display: "flex" }}><div style={{ background: "#fff", borderRadius: "12px 12px 12px 2px", padding: "10px 14px" }}><div style={{ display: "flex", gap: 4 }}>{[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#90a4ae", animation: "bounce 1.2s ease infinite", animationDelay: `${i*0.2}s` }} />)}</div></div></div>
            )}
          </div>
        </div>
        <div style={{ background: "#f0f0f0", padding: "10px 12px", display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#fff", borderRadius: 24, padding: "8px 16px", fontSize: 13, color: "#aaa" }}>Type a message</div>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#00a884", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{"\u27a4"}</div>
        </div>
      </div>
    </div>
  );
};

export default function BusinessLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const smoothScroll = useCallback((id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }, []);

  const faqs = [
    { q: "Kya member ko app download karna padega?", a: "Bilkul nahi. Sirf WhatsApp chahiye \u2014 jo pehle se hai. RemindMe India seedha WhatsApp pe kaam karta hai." },
    { q: "7-day trial ke baad kya hoga?", a: "Trial khatam hone se 2 din pehle reminder aayega. Pasand aaye toh \u20b9999/month continue karo. Nahi toh kuch nahi \u2014 koi auto-charge nahi." },
    { q: "Agar member reminder nahi chahta?", a: "STOP bhej ke unsubscribe. Meta Business Policy compliant. Fully legal." },
    { q: "Kitne members add kar sakta hoon?", a: "Small: 100, Professional: 500, Enterprise: unlimited. CSV se 100 ek saath." },
    { q: "Custom messages bhej sakta hoon?", a: "Haan. BROADCAST se sabko ek saath \u2014 gym band, fee change, offer, kuch bhi." },
    { q: "Data safe hai?", a: "Sirf phone number + expiry date store hota hai. Koi medical data nahi. DPDP Act compliant." },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300..800&family=Lora:wght@500;600;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}body{font-family:'DM Sans',sans-serif;background:#fff;color:#111;-webkit-font-smoothing:antialiased}.font-display{font-family:'Lora',serif}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}@keyframes pulse-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.5);opacity:0}}@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .wa-float{position:fixed;bottom:24px;right:24px;z-index:100;width:56px;height:56px;border-radius:50%;background:#25D366;display:flex;align-items:center;justify-content:center;text-decoration:none;box-shadow:0 4px 20px rgba(37,211,102,.45);transition:transform .25s}.wa-float:hover{transform:scale(1.1)}.wa-float::before{content:'';position:absolute;inset:-1px;border-radius:50%;border:2px solid rgba(37,211,102,.5);animation:pulse-ring 2s ease-out infinite}
        .btn-primary{display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;font-weight:700;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.35);transition:all .25s}.btn-primary:hover{background:#1fc85e;transform:translateY(-2px)}
        .btn-secondary{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#111;font-weight:600;font-size:15px;padding:14px 28px;border-radius:14px;text-decoration:none;border:1.5px solid #e5e7eb;cursor:pointer;transition:all .25s}.btn-secondary:hover{border-color:#25D366;color:#25D366}
        .feature-card{background:#fff;border:1.5px solid #f0f0f0;border-radius:20px;padding:28px;transition:all .3s}.feature-card:hover{border-color:#25D366;box-shadow:0 8px 32px rgba(37,211,102,.1);transform:translateY(-4px)}
        .pain-card{background:#fff9f0;border:1.5px solid #fde68a;border-radius:16px;padding:24px;border-left:4px solid #f59e0b;transition:transform .25s}.pain-card:hover{transform:translateY(-2px)}
        .pricing-card{background:#fff;border:2px solid #f0f0f0;border-radius:24px;padding:32px;transition:all .3s;position:relative}.pricing-card.popular{border-color:#25D366;box-shadow:0 8px 36px rgba(37,211,102,.14)}.pricing-card:hover{transform:translateY(-4px)}
        .stat-card{background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1.5px solid #bbf7d0;border-radius:20px;padding:28px;text-align:center}
        .step-dot{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;font-weight:800;font-size:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(37,211,102,.35)}
        .industry-pill{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:999px;background:#f0fdf4;border:1px solid #bbf7d0;color:#166534;font-weight:500;font-size:13.5px;cursor:default;transition:all .2s}.industry-pill:hover{background:#25D366;color:#fff;border-color:#25D366}
        .ticker-wrap{overflow:hidden;white-space:nowrap;background:#25D366;padding:10px 0}.ticker-inner{display:inline-block;animation:ticker 28s linear infinite}.ticker-item{display:inline-block;padding:0 32px;font-weight:600;font-size:13px;color:#fff;letter-spacing:.04em;text-transform:uppercase}.ticker-dot{display:inline-block;margin:0 8px;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.5);vertical-align:middle}
        .accordion-item{border:1.5px solid #f0f0f0;border-radius:14px;overflow:hidden;transition:border-color .25s}.accordion-item.open{border-color:#25D366}.accordion-btn{width:100%;text-align:left;background:#fff;padding:18px 20px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:space-between;font-weight:600;font-size:15px;color:#111}.accordion-body{background:#f9fafb;padding:0 20px;max-height:0;overflow:hidden;font-size:14px;color:#6b7280;line-height:1.7;transition:max-height .35s,padding .35s}.accordion-body.open{max-height:200px;padding:14px 20px 18px}
        .cta-section{background:linear-gradient(135deg,#f0fdf4 0%,#dcfce7 50%,#f0fdf4 100%);border-top:1px solid #bbf7d0;border-bottom:1px solid #bbf7d0}
        .nav-link{color:#6b7280;font-size:14px;font-weight:500;text-decoration:none;transition:color .2s}.nav-link:hover{color:#25D366}
        .badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase}.badge-green{background:#dcfce7;color:#166534}.badge-outline{background:#fff;border:1px solid #e5e7eb;color:#6b7280}
        .section-label{font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#25D366;margin-bottom:10px;display:block}
        .roi-card{background:#fff;border:2px solid #25D366;border-radius:20px;padding:32px;text-align:center}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hero-h1{font-size:34px!important}.hide-mobile{display:none!important}.stats-grid,.pain-grid{grid-template-columns:repeat(2,1fr)!important}.features-grid,.pricing-grid{grid-template-columns:1fr!important}.roi-grid{grid-template-columns:1fr!important}}
      `}</style>

      <a href={WHATSAPP_CTA} target="_blank" rel="noopener noreferrer" className="wa-float"><svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? "rgba(255,255,255,.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid #f0f0f0" : "1px solid transparent", transition: "all .3s" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, background: "#25D366", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 15, fontFamily: "'Lora',serif" }}>R</div>
            <span style={{ fontWeight: 700, fontSize: 16, color: "#111" }}>RemindMe India</span>
            <span className="badge badge-outline hide-mobile" style={{ marginLeft: 4 }}>For Business</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <a href="https://remindmeindia.site" className="nav-link hide-mobile">Personal App</a>
            <button onClick={() => smoothScroll("pricing")} className="nav-link hide-mobile" style={{ background: "none", border: "none", cursor: "pointer" }}>Pricing</button>
            <a href={WHATSAPP_CTA} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "9px 20px", fontSize: 14, borderRadius: 10 }}>Start Free Trial</a>
          </div>
        </div>
      </nav>

      <section style={{ paddingTop: 120, paddingBottom: 80, padding: "120px 24px 80px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <AnimatedSection><span className="badge badge-green" style={{ marginBottom: 20 }}>Trusted by businesses in Indore</span></AnimatedSection>
            <AnimatedSection delay={80}><h1 className="hero-h1 font-display" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.12, color: "#0f172a", marginBottom: 20, marginTop: 8 }}>Members bhool jaate hain. <em style={{ color: "#25D366", fontStyle: "italic" }}>Ab nahi bhoolenge.</em></h1></AnimatedSection>
            <AnimatedSection delay={160}><p style={{ fontSize: 18, color: "#6b7280", lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>WhatsApp pe automatic subscription renewal reminders. No app. No training. No dashboard. Sirf WhatsApp.</p></AnimatedSection>
            <AnimatedSection delay={240}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
                <a href={WHATSAPP_CTA} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 16, padding: "15px 28px" }}>Start 7-Day Free Trial</a>
                <button onClick={() => smoothScroll("how-it-works")} className="btn-secondary" style={{ fontSize: 16, padding: "15px 28px" }}>Kaise kaam karta hai?</button>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={320}><div style={{ display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13.5, color: "#6b7280", fontWeight: 500 }}>{["\u2705 7-day FREE trial","\u2705 Setup in 2 minutes","\u2705 Cancel anytime","\u2705 No app needed"].map(t => <span key={t}>{t}</span>)}</div></AnimatedSection>
          </div>
          <AnimatedSection delay={200}><div style={{ animation: "float 4s ease-in-out infinite" }}><WhatsAppDemo /></div></AnimatedSection>
        </div>
      </section>

      <div className="ticker-wrap"><div className="ticker-inner">{[0,1].map(i => <span key={i}>{["Gyms","Clinics","Coaching Centers","Salons","Yoga Studios","Swimming Pools","Co-working","Music Classes","Newspaper Delivery","Society Fees"].map(item => <span key={item} className="ticker-item">{item}<span className="ticker-dot" /></span>)}</span>)}</div></div>

      <section style={{ padding: "72px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {[{v:"295+",l:"Total Users",i:"\ud83d\udc65"},{v:"1,325+",l:"Reminders Delivered",i:"\ud83d\udd14"},{v:"98%",l:"Delivery Rate",i:"\u2705"},{v:"2,200+",l:"Reminders Created",i:"\ud83d\udcca"}].map((s,i) => <AnimatedSection key={s.l} delay={i*80}><div className="stat-card"><div style={{fontSize:28,marginBottom:6}}>{s.i}</div><div style={{fontSize:36,fontWeight:800,color:"#0f172a",fontFamily:"'Lora',serif"}}>{s.v}</div><div style={{fontSize:13,color:"#6b7280",marginTop:4,fontWeight:500}}>{s.l}</div></div></AnimatedSection>)}
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <AnimatedSection><span className="section-label">The Problem</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Yeh problem pehchaan lo</h2><p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 48 }}>Har gym, clinic, aur coaching center ko daily face karna padta hai</p></AnimatedSection>
          <div className="pain-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[{i:"\ud83d\ude24",t:"Members chale jaate hain",d:"Subscription expire, koi yaad nahi dilaya. Member naya gym join kar liya."},{i:"\ud83d\udccb",t:"Excel mein date tracking",d:"Rozana register, expiry dhundho, manually WhatsApp bhejo. Daily 1-2 ghante waste."},{i:"\ud83d\ude2c",t:"\"Bhai payment dedo\"",d:"Personal message mein jhijhak. Member ignore karta hai. Revenue loss hota hai."}].map((p,i) => <AnimatedSection key={p.t} delay={i*100}><div className="pain-card"><div style={{fontSize:32,marginBottom:14}}>{p.i}</div><div style={{fontWeight:700,fontSize:17,color:"#0f172a",marginBottom:8}}>{p.t}</div><div style={{fontSize:14,color:"#78716c",lineHeight:1.7}}>{p.d}</div></div></AnimatedSection>)}
          </div>
        </div>
      </section>

      <section id="how-it-works" style={{ padding: "88px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <AnimatedSection><span className="section-label">Simple Process</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Sirf 3 steps. Bas.</h2><p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 56 }}>No software. No training. No app. Sirf WhatsApp.</p></AnimatedSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {[
            {n:"01",t:"Member ka data do",d:"WhatsApp pe ek line bhejo:",code:"ADD 919876543210 Rahul 2026-05-15",sub:"Ya CSV upload \u2014 100 members ek saath"},
            {n:"02",t:"Hum automatically remind karenge",d:"4 professional reminders aapke business name ke saath:",timeline:["7 din pehle","3 din pehle","Expiry wale din","2 din baad"]},
            {n:"03",t:"Member khud renew karega",d:"Professional reminder jaayega. Renewal rate 30-40% badhti hai.",result:true},
          ].map((step,i) => (
            <AnimatedSection key={step.n} delay={i*120}>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div className="step-dot">{step.n}</div>
                <div style={{ flex: 1, paddingTop: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 20, color: "#0f172a", marginBottom: 6 }}>{step.t}</div>
                  <div style={{ fontSize: 15, color: "#6b7280", marginBottom: step.code || step.timeline ? 14 : 0 }}>{step.d}</div>
                  {step.code && <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 16px", fontFamily: "monospace", fontSize: 14, color: "#166534", display: "inline-block", marginBottom: 8 }}>{step.code}</div>}
                  {step.sub && <div style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>{step.sub}</div>}
                  {step.timeline && <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{step.timeline.map((t,j) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: j===2?"#25D366":"#f0fdf4", color: j===2?"#fff":"#166534", border: `1px solid ${j===2?"#25D366":"#bbf7d0"}`, borderRadius: 999, padding: "5px 14px", fontSize: 13, fontWeight: 600 }}>{"\ud83d\udd14"} {t}</span>)}</div>}
                  {step.result && <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1.5px solid #25D366", borderRadius: 12, padding: "10px 20px", marginTop: 8 }}><span style={{ fontSize: 20 }}>{"\u2705"}</span><span style={{ fontWeight: 700, color: "#166534", fontSize: 15 }}>Renewal Complete!</span></div>}
                </div>
              </div>
              {i < 2 && <div style={{ width: 2, height: 32, background: "linear-gradient(#25D366, #bbf7d0)", marginLeft: 23, marginTop: 8 }} />}
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section style={{ padding: "72px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection>
            <div className="roi-card">
              <span className="section-label">Return on Investment</span>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", marginBottom: 24 }}>Kitna paisa bachega?</h2>
              <div className="roi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, marginBottom: 24 }}>
                <div><div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 4 }}>5 extra members renew kare</div><div style={{ fontSize: 32, fontWeight: 800, color: "#25D366", fontFamily: "'Lora',serif" }}>{"\u20b9"}7,500+</div><div style={{ fontSize: 12, color: "#6b7280" }}>monthly extra revenue</div></div>
                <div><div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 4 }}>RemindMe India cost</div><div style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", fontFamily: "'Lora',serif" }}>{"\u20b9"}999</div><div style={{ fontSize: 12, color: "#6b7280" }}>per month</div></div>
                <div><div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 4 }}>Net profit</div><div style={{ fontSize: 32, fontWeight: 800, color: "#25D366", fontFamily: "'Lora',serif" }}>{"\u20b9"}6,500+</div><div style={{ fontSize: 12, color: "#6b7280" }}>7.5x ROI</div></div>
              </div>
              <p style={{ fontSize: 14, color: "#6b7280" }}>Average gym member pays {"\u20b9"}1,500/month. Sirf 1 extra renewal = {"\u20b9"}999 recovered. Baaki sab profit.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: "88px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <AnimatedSection><span className="section-label">Features</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Sab kuch WhatsApp pe</h2><p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 48 }}>No app. No dashboard. No training.</p></AnimatedSection>
          <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[{i:"\ud83d\udd14",t:"Auto Expiry Reminders",d:"7 days, 3 days, expiry day, 2 days after. Professional messages with your business name + contact."},{i:"\ud83d\udcca",t:"Monthly Owner Reports",d:"Har 1 tarikh ko WhatsApp pe: active, expiring, expired, messages sent."},{i:"\ud83d\udce2",t:"Broadcast Messages",d:"Ek command se sabko message. Gym band, fee change, offer \u2014 sab kuch."},{i:"\ud83d\udcf1",t:"QR Code Self-Join",d:"Front desk pe QR lagao. Member scan kare \u2014 auto join. Zero manual work."},{i:"\ud83d\udee1\ufe0f",t:"Meta Compliant",d:"Member STOP bhej ke unsubscribe. Fully legal. WhatsApp Business Policy compliant."},{i:"\ud83d\udccb",t:"CSV Bulk Import",d:"Excel data hai? CSV upload \u2014 100 members ek saath add, reminders shuru."}].map((f,i) => <AnimatedSection key={f.t} delay={i*80}><div className="feature-card"><div style={{fontSize:32,marginBottom:14}}>{f.i}</div><div style={{fontWeight:700,fontSize:17,color:"#0f172a",marginBottom:8}}>{f.t}</div><div style={{fontSize:14,color:"#6b7280",lineHeight:1.7}}>{f.d}</div></div></AnimatedSection>)}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: "88px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <AnimatedSection><div style={{ textAlign: "center", marginBottom: 56 }}><span className="badge badge-green" style={{ marginBottom: 16 }}>{"\ud83c\udf89"} 7-day FREE trial on all plans</span><br /><span className="section-label" style={{ marginTop: 12, display: "block" }}>Pricing</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a" }}>Simple, transparent pricing</h2></div></AnimatedSection>
          <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, maxWidth: 960, margin: "0 auto" }}>
            {[
              {name:"Small",price:"999",members:"100",msgs:"400",features:["Auto expiry reminders","Broadcast messages","Monthly reports","QR code join","WhatsApp support"],popular:false,cta:"https://rzp.io/rzp/0GZyM4M"},
              {name:"Professional",price:"1,999",members:"500",msgs:"2,000",features:["Everything in Small","Priority support","CSV bulk import","Custom welcome message","Trial nudge system"],popular:true,cta:"https://rzp.io/rzp/e3OwPfK"},
              {name:"Enterprise",price:"2,999",members:"Unlimited",msgs:"Unlimited",features:["Everything in Professional","Multi-staff access","Dedicated support","Custom integrations","SLA guarantee"],popular:false,cta:"https://rzp.io/rzp/r0zJWcih"},
            ].map((plan,i) => (
              <AnimatedSection key={plan.name} delay={i*100}>
                <div className={`pricing-card ${plan.popular?"popular":""}`} style={{ transform: plan.popular ? "translateY(-8px)" : "none" }}>
                  {plan.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 12, padding: "4px 16px", borderRadius: 999 }}>Most Popular</div>}
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#6b7280", marginBottom: 6 }}>{plan.name}</div>
                  <div style={{ marginBottom: 6 }}><span style={{ fontSize: 42, fontWeight: 800, color: "#0f172a", fontFamily: "'Lora',serif" }}>{"\u20b9"}{plan.price}</span><span style={{ fontSize: 14, color: "#9ca3af" }}>/month</span></div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Up to {plan.members} members</div>
                  <ul style={{ listStyle: "none", marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                    {plan.features.map(f => <li key={f} style={{ fontSize: 14, color: "#374151", display: "flex", alignItems: "center", gap: 8 }}><span style={{ color: "#25D366", fontWeight: 700 }}>{"\u2713"}</span> {f}</li>)}
                    <li style={{ fontSize: 13, color: "#25D366", display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}><span>{"\ud83c\udf81"}</span> 7-day FREE trial</li>
                  </ul>
                  <a href={plan.cta} target="_blank" rel="noopener noreferrer" className={plan.popular ? "btn-primary" : "btn-secondary"} style={{ display: "flex", justifyContent: "center", width: "100%" }}>Pay & Get Started</a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 24px", maxWidth: 1120, margin: "0 auto" }}>
        <AnimatedSection><span className="section-label">Use Cases</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>Kis business ke liye?</h2><p style={{ fontSize: 16, color: "#9ca3af", marginBottom: 36 }}>Koi bhi subscription-based business</p></AnimatedSection>
        <AnimatedSection delay={150}><div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>{["\ud83c\udfcb\ufe0f Gyms & Fitness","\ud83c\udfe5 Clinics & Doctors","\ud83d\udcda Coaching Centers","\ud83d\udc87 Salons & Spas","\ud83c\udfca Swimming Pools","\ud83e\uddd8 Yoga & Dance","\ud83c\udfe2 Co-working","\ud83d\udcf0 Newspaper Delivery","\ud83d\ude97 Society Fees","\ud83c\udfb5 Music Classes"].map(tag => <span key={tag} className="industry-pill">{tag}</span>)}</div></AnimatedSection>
      </section>

      <section style={{ padding: "80px 24px", background: "#fafafa", borderTop: "1px solid #f0f0f0", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <AnimatedSection><span className="section-label">FAQ</span><h2 className="font-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", marginBottom: 40 }}>Common questions</h2></AnimatedSection>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => <AnimatedSection key={i} delay={i*60}><div className={`accordion-item ${activeAccordion===i?"open":""}`}><button className="accordion-btn" onClick={() => setActiveAccordion(activeAccordion===i?null:i)}>{faq.q}<span style={{ color: "#25D366", fontSize: 20, transition: "transform .3s", transform: activeAccordion===i?"rotate(45deg)":"rotate(0)" }}>+</span></button><div className={`accordion-body ${activeAccordion===i?"open":""}`}>{faq.a}</div></div></AnimatedSection>)}
          </div>
        </div>
      </section>

      <section className="cta-section" style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <span style={{ fontSize: 48, display: "block", marginBottom: 20 }}>{"\ud83d\ude80"}</span>
            <h2 className="font-display" style={{ fontSize: 44, fontWeight: 700, color: "#0f172a", marginBottom: 16, lineHeight: 1.15 }}>Ready to try? <em style={{ color: "#25D366", fontStyle: "italic" }}>7 din FREE.</em></h2>
            <p style={{ fontSize: 17, color: "#6b7280", marginBottom: 36, lineHeight: 1.7 }}>2 minute setup. No software. No app. Sirf WhatsApp.</p>
            <a href={WHATSAPP_CTA} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 17, padding: "16px 32px" }}>Start 7-Day Free Trial</a>
            <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 16 }}>Or email: <a href="mailto:hello.remindmeindia@gmail.com" style={{ color: "#25D366", textDecoration: "none" }}>hello.remindmeindia@gmail.com</a></p>
          </AnimatedSection>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "28px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><div style={{ width: 28, height: 28, background: "#25D366", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>R</div><span style={{ fontSize: 13, color: "#9ca3af" }}>{"\u00a9"} 2026 RemindMe India</span></div>
          <div style={{ display: "flex", gap: 20 }}>{[{l:"Personal App",h:"https://remindmeindia.site"},{l:"WhatsApp Bot",h:BOT_LINK},{l:"Contact",h:"mailto:hello.remindmeindia@gmail.com"}].map(l => <a key={l.l} href={l.h} className="nav-link" target={l.h.startsWith("http")?"_blank":undefined} rel="noopener noreferrer">{l.l}</a>)}</div>
        </div>
      </footer>
    </>
  );
}
