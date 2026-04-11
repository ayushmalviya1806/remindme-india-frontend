import { useEffect, useRef } from 'react';

export default function BusinessLanding() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">RemindMe India</span>
            </div>
            <a 
              href="/"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Apne Members Ko<br />Kabhi Bhulne Mat Do
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
            WhatsApp pe automatic renewal reminders.<br />
            No app download. No training needed.
          </p>
          <div className="space-y-4">
            <a
              href="https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Free Trial
            </a>
            <p className="text-gray-600 font-medium">
              999/month · First month FREE · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Yeh Problem Aapko Bhi Hogi
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-5xl mb-4"> Members expiry ke baad bhi nahi aate yaad hi nahi rehta</div>
              <p className="text-gray-600 mt-2">Monthly income loss</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-5xl mb-4"> Excel mein date track karna daily headache</div>
              <p className="text-gray-600 mt-2">Manual errors happen</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-5xl mb-4"> Har member ko manually message karna time waste</div>
              <p className="text-gray-600 mt-2">Staff productivity down</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Sirf 3 Steps Mein Shuru
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Member ka number aur expiry date dena
              </h3>
              <p className="text-gray-600 bg-gray-100 p-3 rounded-lg font-mono text-sm">
                ADD 919876543210 Rahul 2026-05-09
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hum automatically remind karenge
              </h3>
              <p className="text-gray-600">
                7 days before 3 days before On expiry day 2 days after
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Member khud renew karega aapko kuch nahi karna
              </h3>
              <p className="text-gray-600">
                Direct WhatsApp payment reminders
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Sab Kuch WhatsApp Pe
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> Auto Expiry Reminders</div>
              <p className="text-gray-600">7 days 3 days expiry day 2 days after</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> Monthly Reports</div>
              <p className="text-gray-600">Kitne active kitne expire kitne messages gaye</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> Broadcast Messages</div>
              <p className="text-gray-600">Ek message sabko pahunche</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> QR Code Join</div>
              <p className="text-gray-600">Front desk pe lagao member scan karke join kare</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> No App Needed</div>
              <p className="text-gray-600">WhatsApp already installed hai sabke paas</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-3xl mb-3"> STOP Option</div>
              <p className="text-gray-600">Member unsubscribe kar sakta hai Meta compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Small</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">999/mo</div>
              <ul className="space-y-3 text-gray-600">
                <li>Up to 100 members</li>
                <li>400 messages/month</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-[#25D366] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#25D366] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">1,999/mo</div>
              <ul className="space-y-3 text-gray-600">
                <li>Up to 500 members</li>
                <li>2,000 messages/month</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">2,999/mo</div>
              <ul className="space-y-3 text-gray-600">
                <li>Unlimited members</li>
                <li>Unlimited messages</li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-green-600">
              First month FREE for all plans
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-on-scroll">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Kis Business Ke Liye?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-3"> Gyms & Fitness Centers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-3"> Clinics & Doctors</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-3"> Coaching Centers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="text-4xl mb-3"> Salons & Spas</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="text-3xl font-bold text-gray-900 mb-4">2 businesses already using RemindMe India</div>
            <div className="grid grid-cols-3 gap-8 mt-8 text-center">
              <div>
                <div className="text-2xl font-bold text-[#25D366]">265+</div>
                <div className="text-gray-600">users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#25D366]">1,290+</div>
                <div className="text-gray-600">reminders sent</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#25D366]">99%</div>
                <div className="text-gray-600">delivery rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Try? Pehle Mahine FREE
          </h2>
          <div className="space-y-4">
            <a
              href="https://wa.me/917470578178?text=Hi%20I%20want%20to%20try%20RemindMe%20India%20for%20my%20business"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#128C7E] transition-colors text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start Free Trial
            </a>
            <p className="text-gray-600">
              Questions? Email: <a href="mailto:hello.remindmeindia@gmail.com" className="text-[#25D366] hover:underline">hello.remindmeindia@gmail.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg font-semibold mb-2"> 2026 RemindMe India</p>
            <p className="text-gray-400">Made with in Indore</p>
          </div>
          <div className="flex justify-center space-x-8 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
