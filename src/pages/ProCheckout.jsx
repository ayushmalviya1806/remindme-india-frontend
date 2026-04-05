import { useState, useEffect } from 'react';
import { Bell, Check, Shield } from 'lucide-react';

const API_BASE = 'https://remindme-india.onrender.com/api';
const WA_LINK = 'https://wa.me/916269915175?text=Hi';

const PRO_FEATURES = [
  'Unlimited reminders',
  'Recurring (daily/weekly/monthly)',
  'Voice note support',
  'Priority WhatsApp support',
  'Snooze & reschedule',
  'Smart suggestions',
  '30 din validity',
];

export default function ProCheckout() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('input'); // 'input' | 'processing' | 'activated' | 'needs_whatsapp'
  const [paymentId, setPaymentId] = useState('');
  const [error, setError] = useState('');

  // Load Razorpay Checkout script on mount
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePayment = async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return;
    }

    const fullPhone = digits.length === 10 ? '91' + digits : digits;

    setLoading(true);
    setError('');

    try {
      // Step 1: Create order on backend
      const orderRes = await fetch(`${API_BASE}/checkout/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      // Step 2: Open Razorpay Checkout popup with phone pre-filled
      const options = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'RemindMe India',
        description: 'Pro Plan - 1 Month',
        order_id: orderData.order_id,
        prefill: {
          contact: '+' + fullPhone,
        },
        theme: {
          color: '#006D2F',
        },
        handler: async function (response) {
          // Payment successful — now verify and activate
          setStatus('processing');
          setPaymentId(response.razorpay_payment_id);

          try {
            const verifyRes = await fetch(`${API_BASE}/checkout/verify-and-activate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                phone: fullPhone,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              setStatus('activated');
            } else if (verifyData.needs_whatsapp) {
              setStatus('needs_whatsapp');
            } else {
              setError(verifyData.error || 'Activation failed');
              setStatus('input');
            }
          } catch (err) {
            // Even if verify call fails, payment was successful
            // Webhook will handle activation as backup
            setStatus('needs_whatsapp');
          }

          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError('Payment failed. Please try again.');
        setLoading(false);
      });
      rzp.open();

    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  // ══════════════════════════════════════
  // STATE: Pro Activated Successfully
  // ══════════════════════════════════════
  if (status === 'activated') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-extrabold text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Pro Activated! 🎉
          </h1>
          <p className="text-gray-500 mb-2">Payment ID: <span className="font-mono text-xs">{paymentId}</span></p>
          <p className="text-gray-500 mb-8">Your Pro plan is now active for 30 days.</p>
          <p className="text-green-600 font-semibold mb-4">✅ You'll receive a confirmation on WhatsApp!</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 mb-4"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            💬 Open WhatsApp & Start Using Pro →
          </a>
          <p className="text-xs text-gray-400">Set your first unlimited reminder now!</p>
          <a href="/" className="block mt-6 text-sm text-gray-400 hover:text-gray-600">← Back to Home</a>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // STATE: Payment done but user not in DB yet
  // ══════════════════════════════════════
  if (status === 'needs_whatsapp') {
    const payIdLink = `https://wa.me/916269915175?text=${encodeURIComponent(paymentId)}`;
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-extrabold text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Payment Successful! 🎉
          </h1>
          <p className="text-gray-500 mb-6">One last step — activate Pro on WhatsApp:</p>
          <a
            href={payIdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 mb-4"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            💬 Activate Pro on WhatsApp →
          </a>
          <p className="text-sm text-gray-400 mb-2">Your payment ID will be sent automatically.</p>
          <p className="text-sm text-gray-400">Just tap Send and Pro activates instantly!</p>
          <a href="/" className="block mt-6 text-sm text-gray-400 hover:text-gray-600">← Back to Home</a>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // STATE: Processing (verifying payment)
  // ══════════════════════════════════════
  if (status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FAF9F5' }}>
        <div className="max-w-md w-full text-center">
          <svg className="animate-spin w-12 h-12 mx-auto mb-6 text-green-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <h2 className="font-bold text-xl text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Activating your Pro plan...
          </h2>
          <p className="text-gray-500 mt-2">This takes just a few seconds ⚡</p>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════
  // STATE: Input (default — phone + pay)
  // ══════════════════════════════════════
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ backgroundColor: '#FAF9F5' }}>
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #006D2F, #25D366)' }}>
              <Bell className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl" style={{ color: '#006D2F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              RemindMe India
            </span>
          </a>
          <h1 className="font-extrabold text-3xl text-gray-900 mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Get Pro Plan 🚀
          </h1>
          <p className="text-gray-500">Unlimited reminders for just ₹99/month</p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="space-y-3">
            {PRO_FEATURES.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E8F5E9' }}>
                  <Check className="w-3 h-3" style={{ color: '#25D366' }} />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-extrabold text-4xl text-gray-900" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>₹99</span>
            <span className="text-gray-400 text-sm">/month</span>
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your WhatsApp Number</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-green-500 transition-colors">
              <span className="px-3 py-3 bg-gray-50 text-gray-500 text-sm border-r border-gray-200">+91</span>
              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
                className="flex-1 px-4 py-3 outline-none text-gray-900"
                maxLength={10}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">Pro will be activated on this WhatsApp number</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 rounded-xl text-sm text-red-600">{error}</div>
          )}

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={loading || phone.replace(/\D/g, '').length < 10}
            className="w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-[1.02] active:scale-95"
            style={{
              background: phone.replace(/\D/g, '').length >= 10 ? 'linear-gradient(135deg, #006D2F, #25D366)' : '#D1D5DB',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : '💳 Pay ₹99 — Get Pro'}
          </button>

          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secured by Razorpay</span>
            <span>UPI • Cards • NetBanking</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            🎓 Student discount? WhatsApp pe STUDENT50 type karo!
          </p>
        </div>

        <a href="/" className="block text-center mt-6 text-sm text-gray-400 hover:text-gray-600">← Back to RemindMe India</a>
      </div>
    </div>
  );
}
