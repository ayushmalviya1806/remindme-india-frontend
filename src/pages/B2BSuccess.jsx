import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BusinessLanding.css';

const B2BSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#fff'
    }}>
      <div style={{ 
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        {/* Large green checkmark */}
        <div style={{ 
          fontSize: '120px',
          marginBottom: '30px',
          animation: 'pulse 2s infinite'
        }}>
          {"\u2705"}
        </div>

        {/* Main heading */}
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: 700,
          marginBottom: '20px',
          fontFamily: "'Lora', serif",
          lineHeight: 1.2
        }}>
          Payment Successful!
        </h1>

        {/* Subtitle */}
        <p style={{ 
          fontSize: '20px',
          marginBottom: '40px',
          opacity: 0.9,
          lineHeight: 1.6
        }}>
          Aapka business setup ho raha hai...
        </p>

        {/* Steps card */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '40px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                fontSize: '24px',
                fontWeight: 700,
                color: '#4ade80'
              }}>
                ✅
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '5px' }}>
                  Payment received
                </div>
                <div style={{ fontSize: '14px', color: '#e0e0e0' }}>
                  Transaction successful
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                fontSize: '24px',
                fontWeight: 700,
                color: '#4ade80'
              }}>
                ⏳
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '5px' }}>
                  Business account ban raha hai...
                </div>
                <div style={{ fontSize: '14px', color: '#e0e0e0' }}>
                  WhatsApp pe welcome message aayega 2 minute mein
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ 
                fontSize: '24px',
                fontWeight: 700,
                color: '#4ade80'
              }}>
                📱
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '5px' }}>
                  Aapko milega:
                </div>
                <div style={{ fontSize: '14px', color: '#e0e0e0' }}>
                  Business Code, Quick Start Guide, Dashboard Link, Member Add Commands
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact support */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '25px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{ 
            fontSize: '16px', 
            fontWeight: 600, 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            Koi problem? WhatsApp: 917470578178
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            >
            Go to Homepage
          </button>
          
          <button 
            onClick={() => window.open('https://remindmeindia.site', '_blank')}
            style={{
              flex: 1,
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 600,
              backgroundColor: '#25D366',
              color: '#fff',
              border: '1px solid #25D366',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Try Personal Reminders
          </button>
        </div>
      </div>

      {/* Footer note */}
      <p style={{ 
        position: 'absolute',
        bottom: '20px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center'
      }}>
        Powered by RemindMe India 🇮🇳
      </p>
    </div>
  );
};

export default B2BSuccess;
