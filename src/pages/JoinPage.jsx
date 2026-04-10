import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://remindme-india.onrender.com';

export default function JoinPage() {
  const { code } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    fetchBusiness();
  }, [code]);

  const fetchBusiness = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/business/public/${code}`);
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.error || 'Business not found');
        return;
      }
      
      setBusiness(data.business);
    } catch (err) {
      setError('Failed to load. Please check your link and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setSubmitError('');
    
    // Basic validation
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) {
      setSubmitError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/business/public/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessCode: code,
          memberWhatsapp: phone.trim(),
          memberName: name.trim() || null
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
        return;
      }
      
      setSuccess(true);
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Industry emoji map
  const getIndustryEmoji = (type) => {
    const map = {
      gym: '🏋️',
      fitness: '💪',
      clinic: '🏥',
      doctor: '👨‍⚕️',
      coaching: '📚',
      salon: '💇',
      shop: '🛍️',
      other: '🏢'
    };
    const key = (type || '').toLowerCase();
    for (const k of Object.keys(map)) {
      if (key.includes(k)) return map[k];
    }
    return '🏢';
  };

  // ── LOADING STATE ──
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loadingSpinner}>⏳</div>
          <p style={{ color: '#6b7280', textAlign: 'center' }}>Loading...</p>
        </div>
      </div>
    );
  }

  // ── ERROR STATE ──
  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '48px' }}>❌</div>
          <h2 style={{ textAlign: 'center', color: '#dc2626', marginBottom: '8px' }}>
            Link Not Found
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '24px' }}>
            {error}
          </p>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
            Please check the link you received and try again.
          </p>
        </div>
      </div>
    );
  }

  // ── SUCCESS STATE ──
  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ textAlign: 'center', color: '#15803d', marginBottom: '8px', fontSize: '22px' }}>
            You're In!
          </h2>
          <p style={{ textAlign: 'center', color: '#374151', marginBottom: '8px', fontSize: '16px' }}>
            Successfully joined <strong>{business?.businessName}</strong>
          </p>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '8px', fontSize: '14px' }}>
            Check your WhatsApp — a confirmation message has been sent to you.
          </p>
          <div style={styles.successBox}>
            <p style={{ margin: 0, fontSize: '14px', color: '#166534' }}>
              ✅ You will now receive automatic reminders for subscription renewals and important updates.
            </p>
          </div>
          <p style={{ textAlign: 'center', color: '#9ca3af', fontSize: '12px', marginTop: '24px' }}>
            Reply <strong>STOP</strong> on WhatsApp anytime to unsubscribe.
          </p>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ color: '#9ca3af', fontSize: '11px', margin: 0 }}>
              Powered by <strong>RemindMe India 🇮🇳</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN FORM ──
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>
            {getIndustryEmoji(business?.industryType)}
          </div>
          <h1 style={styles.businessName}>{business?.businessName}</h1>
          <p style={styles.subtitle}>
            Join to receive WhatsApp reminders for subscription renewals and important updates.
          </p>
        </div>

        {/* What you'll get */}
        <div style={styles.benefitsBox}>
          <p style={styles.benefitsTitle}>📱 What you'll receive:</p>
          <ul style={styles.benefitsList}>
            <li>🔔 Subscription renewal reminders</li>
            <li>📅 Important date reminders</li>
            <li>📢 Updates from {business?.businessName}</li>
          </ul>
        </div>

        {/* Form */}
        <div style={styles.form}>
          {/* Name field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Your Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Rahul Sharma"
              style={styles.input}
            />
          </div>

          {/* Phone field */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>WhatsApp Number *</label>
            <div style={styles.phoneInputWrapper}>
              <span style={styles.phonePrefix}>+91</span>
              <input
                type="tel"
                value={phone}
                onChange={e => {
                  // Only allow digits
                  const val = e.target.value.replace(/\D/g, '');
                  setPhone(val);
                }}
                placeholder="9876543210"
                maxLength={10}
                style={styles.phoneInput}
              />
            </div>
            <p style={styles.fieldHint}>
              Enter your 10-digit WhatsApp number. You'll receive a confirmation message.
            </p>
          </div>

          {/* Error message */}
          {submitError && (
            <div style={styles.errorBox}>
              ❌ {submitError}
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={submitting || !phone}
            style={{
              ...styles.submitButton,
              background: submitting || !phone ? '#9ca3af' : '#25d366',
              cursor: submitting || !phone ? 'not-allowed' : 'pointer'
            }}
          >
            {submitting ? '⏳ Joining...' : '✅ Join & Enable Reminders'}
          </button>

          <p style={styles.stopNote}>
            You can reply <strong>STOP</strong> on WhatsApp anytime to unsubscribe.
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>
            Powered by <strong>RemindMe India 🇮🇳</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  card: {
    background: '#ffffff',
    borderRadius: '20px',
    padding: '32px 28px',
    maxWidth: '420px',
    width: '100%',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
  },
  loadingSpinner: {
    textAlign: 'center',
    fontSize: '48px',
    marginBottom: '16px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  businessName: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: '1.5'
  },
  benefitsBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '24px'
  },
  benefitsTitle: {
    margin: '0 0 8px 0',
    fontWeight: '600',
    color: '#15803d',
    fontSize: '14px'
  },
  benefitsList: {
    margin: 0,
    paddingLeft: '4px',
    listStyle: 'none',
    fontSize: '13px',
    color: '#166534',
    lineHeight: '1.8'
  },
  form: {
    marginBottom: '24px'
  },
  fieldGroup: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '6px'
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
    color: '#111827'
  },
  phoneInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #d1d5db',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  phonePrefix: {
    background: '#f3f4f6',
    padding: '10px 12px',
    fontSize: '15px',
    color: '#374151',
    fontWeight: '600',
    borderRight: '1.5px solid #d1d5db'
  },
  phoneInput: {
    flex: 1,
    padding: '10px 14px',
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    color: '#111827'
  },
  fieldHint: {
    margin: '4px 0 0 0',
    fontSize: '11px',
    color: '#9ca3af'
  },
  errorBox: {
    background: '#fef2f2',
    border: '1px solid #fca5a5',
    borderRadius: '8px',
    padding: '10px 14px',
    marginBottom: '16px',
    fontSize: '13px',
    color: '#dc2626'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '12px'
  },
  stopNote: {
    textAlign: 'center',
    fontSize: '11px',
    color: '#9ca3af',
    margin: 0
  },
  successBox: {
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    padding: '16px'
  },
  footer: {
    textAlign: 'center',
    borderTop: '1px solid #f3f4f6',
    paddingTop: '16px'
  }
};
