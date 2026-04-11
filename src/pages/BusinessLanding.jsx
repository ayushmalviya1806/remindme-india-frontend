import React, { useEffect, useRef } from 'react';

const BusinessLanding = () => {
  const observerRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Playfair+Display:wght@600;700&display=swap');

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        .gradient-text {
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .whatsapp-btn {
          background: #25D366;
          transition: all 0.3s ease;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);
        }
        .whatsapp-btn:hover {
          background: #20BD5A;
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.45);
          transform: translateY(-2px);
        }

        .feature-card {
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        .feature-card:hover {
          border-color: #25D366;
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.08);
          transform: translateY(-4px);
        }

        .pricing-card {
          transition: all 0.3s ease;
          border: 2px solid #f0f0f0;
        }
        .pricing-card:hover {
          border-color: #25D366;
        }
        .pricing-popular {
          border-color: #25D366;
          box-shadow: 0 8px 30px rgba(37, 211, 102, 0.12);
        }

        .pain-card {
          background: #FFF8F0;
          border-left: 4px solid #F59E0B;
        }

        .step-number {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 20px;
          flex-shrink: 0;
        }

        .chat-bubble {
          background: #DCF8C6;
          border-radius: 0 12px 12px 12px;
          padding: 12px 16px;
          max-width: 320px;
          position: relative;
          font-size: 14px;
          line-height: 1.5;
          color: #111;
        }
        .chat-bubble-bot {
          background: #E8E8E8;
          border-radius: 12px 0 12px 12px;
        }

        .stat-card {
          background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
          border: 1px solid #d1fae5;
        }

        .industry-tag {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          transition: all 0.2s ease;
        }
        .industry-tag:hover {
          background: #25D366;
          color: white;
          border-color: #25D366;
        }

        .competitor-row {
          display: grid;
          grid-template-columns: 1fr 100px 100px;
          gap: 8px;
          padding: 12px 0;
          border-bottom: 1px solid #f5f5f5;
          font-size: 14px;
        }

        .timeline-line {
          width: 2px;
          background: linear-gradient(180deg, #25D366 0%, #128C7E 100%);
          position: absolute;
          left: 23px;
          top: 48px;
          bottom: 0;
        }

        @media (max-width: 768px) {
          .hero-heading { font-size: 32px !important; line-height: 1.15 !important; }
          .competitor-row { grid-template-columns: 1fr 80px 80px; font-size: 12px; }
        }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: '#25D366' }}>R</div>
            <span className="font-semibold text-gray-900 text-base">RemindMe India</span>
            <span className="text-xs text-gray-400 hidden sm:inline ml-1">for Business</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://remindmeindia.site" className="text-sm text-gray-500 hover:text-gray-800 hidden sm:inline">Personal</a>
            <a
              href="https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn text-white text-sm font-medium px-4 py-2 rounded-lg"
            >
              Free Trial →
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="reveal inline-block mb-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
              Trusted by 2+ businesses in Indore
            </div>
            <h1 className="reveal reveal-delay-1 hero-heading text-gray-900 leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: '52px', fontWeight: 700 }}>
              Members bhool jaate hain.{' '}
              <span className="gradient-text">Ab nahi bhoolenge.</span>
            </h1>
            <p className="reveal reveal-delay-2 text-gray-600 text-lg sm:text-xl mb-8 leading-relaxed max-w-2xl">
              WhatsApp pe automatic subscription renewal reminders. No app download. No training. No dashboard seekhna. Sirf WhatsApp — jo aapke members pehle se use karte hain.
            </p>
            <div className="reveal reveal-delay-3 flex flex-wrap gap-3 mb-8">
              <a
                href="https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn text-white font-semibold px-8 py-3.5 rounded-xl text-base inline-flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Start Free Trial
              </a>
              <a href="#how-it-works" className="text-gray-700 font-medium px-6 py-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all text-base">
                Kaise kaam karta hai? ↓
              </a>
            </div>
            <div className="reveal reveal-delay-4 flex flex-wrap gap-6 text-sm text-gray-500">
              <span>✓ First month FREE</span>
              <span>✓ Setup in 2 minutes</span>
              <span>✓ Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAT DEMO */}
      <section className="pb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="reveal bg-gray-50 rounded-2xl p-6 sm:p-8 max-w-lg">
            <div className="text-xs text-gray-400 mb-4 text-center">Live WhatsApp Preview</div>
            <div className="space-y-3">
              <div className="flex justify-end">
                <div className="chat-bubble">ADD 919876543210 Rahul 2026-05-15</div>
              </div>
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble-bot">
                  ✅ <strong>Rahul</strong> added to <strong>Pran Fitness</strong><br/>
                  📅 Expiry: 15 May 2026<br/>
                  🔔 Auto reminders: 7 days, 3 days, and on expiry
                </div>
              </div>
              <div className="flex justify-start">
                <div className="chat-bubble chat-bubble-bot">
                  <span className="text-gray-500 text-xs">Auto-sent on May 8:</span><br/>
                  Hi Rahul, your Pran Fitness account expires in 7 days on 15 May.<br/>
                  📞 Contact: Pran Fitness at wa.me/918871608939
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Yeh problem pehchaan lo
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-10 text-base">Har gym owner ko yeh daily face karna padta hai</p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="reveal reveal-delay-1 pain-card rounded-xl p-5">
              <div className="text-2xl mb-3">😤</div>
              <div className="font-semibold text-gray-900 mb-2">Members chale jaate hain</div>
              <div className="text-sm text-gray-600 leading-relaxed">Subscription expire ho gayi, koi yaad nahi dilaya. Member ne naya gym join kar liya.</div>
            </div>
            <div className="reveal reveal-delay-2 pain-card rounded-xl p-5">
              <div className="text-2xl mb-3">📋</div>
              <div className="font-semibold text-gray-900 mb-2">Excel mein date tracking</div>
              <div className="text-sm text-gray-600 leading-relaxed">Rozana register check karo, expiry dhundho, fir ek-ek ko manually message bhejo. Kab tak?</div>
            </div>
            <div className="reveal reveal-delay-3 pain-card rounded-xl p-5">
              <div className="text-2xl mb-3">📱</div>
              <div className="font-semibold text-gray-900 mb-2">"Bhai payment dedo" messages</div>
              <div className="text-sm text-gray-600 leading-relaxed">Awkward personal messages. Member ignore karta hai. Professional nahi lagta. Relationship kharab hoti hai.</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sirf 3 steps. Bas.
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-12 text-base">No software. No training. No app download.</p>

          <div className="space-y-8">
            <div className="reveal reveal-delay-1 flex gap-5 items-start">
              <div className="step-number">1</div>
              <div>
                <div className="font-semibold text-gray-900 text-lg mb-1">Member ka number aur expiry date dena</div>
                <div className="text-gray-500 leading-relaxed">WhatsApp pe send karo: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-800">ADD 919876543210 Rahul 2026-05-15</code></div>
                <div className="text-gray-400 text-sm mt-2">Ya CSV file upload karo admin dashboard se — 100 members ek saath</div>
              </div>
            </div>
            <div className="reveal reveal-delay-2 flex gap-5 items-start">
              <div className="step-number">2</div>
              <div>
                <div className="font-semibold text-gray-900 text-lg mb-1">Hum automatically remind karenge</div>
                <div className="text-gray-500 leading-relaxed">7 din pehle, 3 din pehle, expiry wale din, aur 2 din baad — total 4 professional reminders with your contact info</div>
              </div>
            </div>
            <div className="reveal reveal-delay-3 flex gap-5 items-start">
              <div className="step-number">3</div>
              <div>
                <div className="font-semibold text-gray-900 text-lg mb-1">Member khud renew karega</div>
                <div className="text-gray-500 leading-relaxed">Aapko kuch nahi karna. Member ko yaad aa gaya, wo aake paisa de dega. Renewal rate 30-40% badhta hai.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sab kuch WhatsApp pe
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-10 text-base">No app install. No dashboard training. Jo tool sab use karte hain — uspe sab hoga.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🔔', title: 'Auto Expiry Reminders', desc: '7 days, 3 days, expiry day, and 2 days after. Professional messages with your business name and contact.' },
              { icon: '📊', title: 'Monthly Reports', desc: 'Har mahine 1st ko: kitne active, kitne expire, kitne messages gaye. Seedha WhatsApp pe.' },
              { icon: '📢', title: 'Broadcast Messages', desc: 'BROADCAST Gym band hai kal — sab opted-in members ko ek saath pahunchega.' },
              { icon: '📱', title: 'QR Code Join', desc: 'Front desk pe QR code lagao. Member scan kare, WhatsApp pe join ho jaaye. Zero typing.' },
              { icon: '🛡️', title: 'STOP Option (Compliant)', desc: 'Member kabhi bhi STOP bhej ke unsubscribe kar sakta hai. Meta Business Policy compliant.' },
              { icon: '📋', title: 'CSV Bulk Import', desc: '100 members ka Excel/CSV upload karo — sab ek saath add, auto-reminders shuru.' },
            ].map((f, i) => (
              <div key={f.title} className={`reveal reveal-delay-${(i % 3) + 1} feature-card bg-white rounded-xl p-5`}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <div className="font-semibold text-gray-900 mb-2">{f.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VS COMPETITORS */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Baaki sab se kaise alag?
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-8 text-base">No app download. No ₹10,000/year software.</p>

          <div className="reveal reveal-delay-2 bg-white rounded-xl border border-gray-100 p-5 sm:p-6 max-w-2xl">
            <div className="competitor-row font-semibold text-gray-900 border-b-2 border-gray-200 pb-3">
              <span>Feature</span>
              <span className="text-center" style={{ color: '#25D366' }}>RemindMe</span>
              <span className="text-center text-gray-400">Others</span>
            </div>
            {[
              ['WhatsApp-native', '✅', '❌'],
              ['No app install', '✅', '❌'],
              ['Auto expiry reminders', '✅', '✅'],
              ['Setup time', '2 min', '2-7 days'],
              ['Member training needed', 'Zero', 'Required'],
              ['Starting price', '₹999/mo', '₹2,500+/mo'],
              ['Free trial', '30 days', '7-14 days'],
            ].map((row) => (
              <div key={row[0]} className="competitor-row text-gray-600">
                <span>{row[0]}</span>
                <span className="text-center font-medium text-gray-900">{row[1]}</span>
                <span className="text-center text-gray-400">{row[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            Simple pricing. No hidden fees.
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-10 text-center text-base">First month FREE on all plans</p>

          <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="reveal reveal-delay-1 pricing-card bg-white rounded-2xl p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Small</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹999</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                <div>✓ Up to 100 members</div>
                <div>✓ 400 messages/month</div>
                <div>✓ Auto expiry reminders</div>
                <div>✓ Broadcast messages</div>
                <div>✓ Monthly reports</div>
                <div>✓ QR code join</div>
              </div>
              <a
                href="https://wa.me/917470578178?text=Hi%20I%20want%20Small%20plan%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-400 transition-all"
              >
                Start Free Trial
              </a>
            </div>

            <div className="reveal reveal-delay-2 pricing-card pricing-popular bg-white rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-semibold text-white" style={{ background: '#25D366' }}>
                Most Popular
              </div>
              <div className="text-sm font-medium text-gray-500 mb-1">Professional</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹1,999</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                <div>✓ Up to 500 members</div>
                <div>✓ 2,000 messages/month</div>
                <div>✓ Everything in Small</div>
                <div>✓ Priority support</div>
                <div>✓ CSV bulk import</div>
                <div>✓ Custom welcome message</div>
              </div>
              <a
                href="https://wa.me/917470578178?text=Hi%20I%20want%20Professional%20plan%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn block text-center py-2.5 rounded-lg text-white font-medium text-sm"
              >
                Start Free Trial
              </a>
            </div>

            <div className="reveal reveal-delay-3 pricing-card bg-white rounded-2xl p-6">
              <div className="text-sm font-medium text-gray-500 mb-1">Enterprise</div>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">₹2,999</span>
                <span className="text-gray-400 text-sm">/month</span>
              </div>
              <div className="space-y-2.5 text-sm text-gray-600 mb-6">
                <div>✓ Unlimited members</div>
                <div>✓ Unlimited messages</div>
                <div>✓ Everything in Professional</div>
                <div>✓ Multi-staff access</div>
                <div>✓ Dedicated support</div>
                <div>✓ Custom integrations</div>
              </div>
              <a
                href="https://wa.me/917470578178?text=Hi%20I%20want%20Enterprise%20plan%20for%20my%20business"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-medium text-sm hover:border-gray-400 transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            Kis business ke liye?
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 mb-8 text-base">Koi bhi subscription-based business jo members ko remind karna chahta hai</p>
          <div className="reveal reveal-delay-2 flex flex-wrap gap-3">
            {[
              '🏋️ Gyms & Fitness Centers',
              '🏥 Clinics & Doctors',
              '📚 Coaching Centers & Tuitions',
              '💇 Salons & Spas',
              '🏊 Swimming Pools',
              '🧘 Yoga & Dance Studios',
              '🏢 Co-working Spaces',
              '📰 Newspaper & Milk Delivery',
              '🚗 Car Parking & Society Fees',
              '🎵 Music & Art Classes',
            ].map((tag) => (
              <span key={tag} className="industry-tag px-4 py-2 rounded-full text-sm font-medium cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="reveal text-2xl sm:text-3xl font-bold text-gray-900 mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            Numbers jo baat karte hain
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              ['265+', 'Total Users'],
              ['1,290+', 'Reminders Sent'],
              ['99%', 'Delivery Rate'],
              ['2', 'Active Businesses'],
            ].map((s, i) => (
              <div key={s[1]} className={`reveal reveal-delay-${i + 1} stat-card rounded-xl p-5`}>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">{s[0]}</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">{s[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Ready to try? <span className="gradient-text">Pehle mahine FREE.</span>
          </h2>
          <p className="reveal reveal-delay-1 text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            2 minute mein setup. Koi software nahi seekhna. Koi app nahi download karna. Sirf WhatsApp.
          </p>
          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn text-white font-semibold px-10 py-4 rounded-xl text-lg inline-flex items-center gap-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Start Free Trial on WhatsApp
            </a>
            <span className="text-gray-400 text-sm">or email: hello.remindmeindia@gmail.com</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs" style={{ background: '#25D366' }}>R</div>
            <span className="text-sm text-gray-500">© 2026 RemindMe India · Made with ❤️ in Indore</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <a href="https://remindmeindia.site" className="hover:text-gray-600">Personal App</a>
            <a href="https://wa.me/916269915175?text=Hi" className="hover:text-gray-600">WhatsApp Bot</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessLanding;
