import { useEffect, useState } from "react";

const WHATSAPP_SUPPORT = "https://wa.me/917470578178?text=Hi%20I%20just%20paid%20for%20RemindMe%20India%20Business%20plan";

function ConfettiPiece({ style }) {
  return <div style={style} />;
}

function Confetti() {
  const [pieces] = useState(() =>
    Array.from({ length: 60 }, (_, i) => {
      const colors = ["#25D366", "#128C7E", "#34d399", "#6ee7b7", "#fff", "#bbf7d0", "#fbbf24"];
      const size = Math.random() * 10 + 6;
      return {
        id: i,
        style: {
          position: "fixed",
          left: `${Math.random() * 100}%`,
          top: `-${size}px`,
          width: size,
          height: size,
          borderRadius: Math.random() > 0.5 ? "50%" : "2px",
          background: colors[Math.floor(Math.random() * colors.length)],
          animation: `confettiFall ${Math.random() * 2 + 2}s ease-in ${Math.random() * 1.5}s forwards`,
          opacity: 0,
          transform: `rotate(${Math.random() * 360}deg)`,
          zIndex: 9999,
          pointerEvents: "none",
        },
      };
    })
  );

  return (
    <>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg);   opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {pieces.map((p) => <ConfettiPiece key={p.id} style={p.style} />)}
    </>
  );
}

export default function B2BSuccess() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => setStep(3), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Lora:wght@600;700&display=swap');
        *,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f0fdf4; color: #111; -webkit-font-smoothing: antialiased; }
        .font-display { font-family: 'Lora', serif; }
        @keyframes popIn { 0% { transform: scale(0.6); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes progressFill { from { width: 0%; } to { width: 100%; } }
        .icon-circle { width: 96px; height: 96px; border-radius: 50%; background: #25D366; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both; }
        .icon-circle svg { width: 48px; height: 48px; }
        .card { background: #fff; border: 1.5px solid #bbf7d0; border-radius: 24px; padding: 40px 36px; max-width: 520px; width: 100%; text-align: center; }
        .step-item { display: flex; align-items: flex-start; gap: 14px; text-align: left; padding: 14px 0; border-bottom: 1px solid #f0fdf4; opacity: 0; animation: fadeUp 0.5s ease forwards; }
        .step-item:last-child { border-bottom: none; }
        .step-dot { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
        .step-dot.done { background: #dcfce7; color: #166534; }
        .step-dot.wait { background: #f3f4f6; color: #9ca3af; }
        .spinner { width: 16px; height: 16px; border: 2.5px solid #e5e7eb; border-top-color: #25D366; border-radius: 50%; animation: spin 0.7s linear infinite; flex-shrink: 0; margin-top: 8px; }
        .progress-bar { height: 6px; background: #dcfce7; border-radius: 99px; overflow: hidden; margin: 20px 0; }
        .progress-fill { height: 100%; background: #25D366; border-radius: 99px; animation: progressFill 3s ease forwards; }
        .btn-wa { display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: #fff; font-weight: 700; font-size: 15px; padding: 14px 28px; border-radius: 14px; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 4px 16px rgba(37,211,102,.35); transition: all .25s; width: 100%; justify-content: center; animation: pulse 2s ease-in-out 3s infinite; }
        .btn-wa:hover { background: #1fc85e; transform: translateY(-2px); }
        .btn-home { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: #6b7280; font-weight: 600; font-size: 14px; padding: 12px 24px; border-radius: 12px; text-decoration: none; border: 1.5px solid #e5e7eb; cursor: pointer; transition: all .25s; width: 100%; justify-content: center; margin-top: 10px; }
        .btn-home:hover { border-color: #25D366; color: #25D366; }
        @media (max-width: 560px) { .card { padding: 28px 20px; border-radius: 20px; } }
      `}</style>

      <Confetti />

      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f0fdf4 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, animation: "fadeUp 0.5s ease both" }}>
          <div style={{ width: 36, height: 36, background: "#25D366", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: 16, fontFamily: "'Lora',serif" }}>R</div>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#111" }}>RemindMe India</span>
          <span style={{ background: "#dcfce7", color: "#166534", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999, letterSpacing: ".04em", textTransform: "uppercase" }}>Business</span>
        </div>

        <div className="card" style={{ animation: "fadeUp 0.5s ease 0.1s both" }}>
          <div className="icon-circle">
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M10 25l10 10L38 14" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: "#0f172a", marginBottom: 10, lineHeight: 1.2 }}>Payment Successful! ?</h1>
          <p style={{ fontSize: 16, color: "#6b7280", marginBottom: 24, lineHeight: 1.6 }}>Aapka business ab set ho raha hai. <strong style={{ color: "#0f172a" }}>2 minute</strong> mein WhatsApp pe aapka Business Code aayega.</p>

          <div className="progress-bar"><div className="progress-fill" /></div>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 28 }}>Setting up your business...</p>

          <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 16, padding: "4px 20px", marginBottom: 28, textAlign: "left" }}>
            <div className="step-item" style={{ animationDelay: "0.3s" }}>
              <div className="step-dot done">?</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>Payment received</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Razorpay ne confirm kar diya</div>
              </div>
            </div>
            <div className="step-item" style={{ animationDelay: "0.6s" }}>
              {step >= 2 ? <div className="step-dot done">?</div> : step >= 1 ? <div className="spinner" /> : <div className="step-dot wait">2</div>}
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: step >= 1 ? "#0f172a" : "#9ca3af" }}>Business account create ho raha hai</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Unique Business Code generate ho raha hai</div>
              </div>
            </div>
            <div className="step-item" style={{ animationDelay: "0.9s" }}>
              {step >= 3 ? <div className="step-dot done">?</div> : step >= 2 ? <div className="spinner" /> : <div className="step-dot wait">3</div>}
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: step >= 2 ? "#0f172a" : "#9ca3af" }}>WhatsApp message bheja ja raha hai</div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>Business Code + quick start guide</div>
              </div>
            </div>
          </div>

          <div style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0", borderRadius: 14, padding: "16px 18px", marginBottom: 24, textAlign: "left", animation: "fadeUp 0.5s ease 1s both" }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#166534", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>Aapko milega WhatsApp pe:</div>
            {["? Aapka unique Business Code", "? Member add karne ke commands", "? Dashboard link", "? Quick start guide"].map((item) => (
              <div key={item} style={{ fontSize: 13.5, color: "#166534", padding: "3px 0" }}>{item}</div>
            ))}
          </div>

          <div style={{ animation: "fadeUp 0.5s ease 1.4s both" }}>
            <a href={WHATSAPP_SUPPORT} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp pe contact karein
            </a>
            <a href="https://remindmeindia.site" className="btn-home">? Wapas Homepage</a>
          </div>

          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 20, lineHeight: 1.6 }}>
            2 minute mein message nahi aaya? Email karein: <a href="mailto:hello.remindmeindia@gmail.com" style={{ color: "#25D366", textDecoration: "none" }}>hello.remindmeindia@gmail.com</a>
          </p>
        </div>

        <p style={{ marginTop: 28, fontSize: 12, color: "#9ca3af", animation: "fadeUp 0.5s ease 0.3s both" }}> 2026 RemindMe India ? Powered by WhatsApp Business API</p>
      </div>
    </>
  );
}
