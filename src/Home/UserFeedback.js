import React, { useEffect, useState } from 'react'
import Nav from './Nav';

export default function UserFeedback() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));
  const [user, setUser] = useState([]);

  
  const handleSubmit = async () => {
    if (!message || rating === 0) {
      setStatus('Please fill in all fields');
      return;
    }

    const data = {
      message: message,
      rating: rating,
      uid: auth.regid._id,
      name: user[0]?.name || 'Unknown',
      status: 2
    };

    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5000/demo/userfeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      setStatus('Message sent successfully!');
      setMessage('');
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus('Error submitting feedback.');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fffbeb 0%, #f0f9ff 50%, #f1f5f9 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem'
  };

  const mainCardStyle = {
    width: '100%',
    maxWidth: '32rem'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(16px)',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    transform: 'scale(1)',
    transition: 'all 0.5s ease',
    ':hover': {
      transform: 'scale(1.02)'
    }
  };

  const headerStyle = {
    background: 'linear-gradient(90deg, #0f172a 0%, #334155 50%, #f59e0b 100%)',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const headerOverlayStyle = {
    position: 'absolute',
    inset: '0',
    background: 'rgba(0, 0, 0, 0.1)'
  };

  const headerContentStyle = {
    position: 'relative',
    zIndex: '10'
  };

  const titleStyle = {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    animation: 'pulse 2s infinite'
  };

  const subtitleStyle = {
    color: '#fef3c7',
    opacity: '0.9'
  };

  const particleStyle1 = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    width: '0.5rem',
    height: '0.5rem',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    animation: 'bounce 1s infinite'
  };

  const particleStyle2 = {
    position: 'absolute',
    top: '2rem',
    right: '2rem',
    width: '0.75rem',
    height: '0.75rem',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    animation: 'bounce 1s infinite',
    animationDelay: '0.5s'
  };

  const particleStyle3 = {
    position: 'absolute',
    bottom: '1rem',
    left: '33%',
    width: '0.5rem',
    height: '0.5rem',
    background: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '50%',
    animation: 'bounce 1s infinite',
    animationDelay: '1s'
  };

  const contentStyle = {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem'
  };

  const ratingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.75rem'
  };

  const getStarButtonStyle = (isActive) => ({
    position: 'relative',
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    border: '2px solid',
    borderColor: isActive ? '#fbbf24' : '#e5e7eb',
    background: isActive ? 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)' : 'white',
    color: isActive ? '#0f172a' : '#9ca3af',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: 'scale(1)',
    boxShadow: isActive ? '0 10px 25px rgba(251, 191, 36, 0.3)' : 'none',
    ':hover': {
      transform: 'scale(1.1)',
      borderColor: '#fbbf24',
      background: '#fffbeb'
    },
    ':active': {
      transform: 'scale(0.95)'
    }
  });

  const pingStyle = {
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
    opacity: '0.2',
    animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
  };

  const ratingTextStyle = {
    textAlign: 'center'
  };

  const getRatingBadgeStyle = (hasRating) => ({
    display: 'inline-block',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
    background: hasRating ? 'linear-gradient(90deg, #fef3c7 0%, #f1f5f9 100%)' : '#f3f4f6',
    color: hasRating ? '#0f172a' : '#6b7280',
    animation: hasRating ? 'fadeIn 0.5s ease-out' : 'none'
  });

  const textareaGroupStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  };

  const textareaContainerStyle = {
    position: 'relative'
  };

  const textareaStyle = {
    width: '100%',
    padding: '1.5rem',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    resize: 'none',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'linear-gradient(135deg, #f9fafb 0%, white 100%)',
    fontSize: '1rem',
    ':focus': {
      borderColor: '#f59e0b',
      boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.1)'
    }
  };

  const textareaOverlayStyle = {
    position: 'absolute',
    inset: '0',
    borderRadius: '1rem',
    background: 'linear-gradient(90deg, #f59e0b 0%, #0f172a 100%)',
    opacity: '0',
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none'
  };

  const buttonContainerStyle = {
    textAlign: 'center'
  };

  const submitButtonStyle = {
    position: 'relative',
    padding: '1rem 3rem',
    background: 'linear-gradient(90deg, #0f172a 0%, #334155 50%, #f59e0b 100%)',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    overflow: 'hidden',
    ':hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    },
    ':active': {
      transform: 'scale(0.95)'
    }
  };

  const buttonContentStyle = {
    position: 'relative',
    zIndex: '10',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const buttonOverlayStyle = {
    position: 'absolute',
    inset: '0',
    background: 'linear-gradient(90deg, #f59e0b 0%, #334155 50%, #0f172a 100%)',
    opacity: '0',
    transition: 'opacity 0.3s ease'
  };

  const buttonShineStyle = {
    position: 'absolute',
    inset: '0',
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'skewX(-12deg) translateX(-100%)',
    transition: 'transform 0.7s ease'
  };

  const getStatusStyle = (statusText) => {
    let bgColor, textColor, borderColor;
    
    if (statusText.includes('success')) {
      bgColor = 'linear-gradient(90deg, #dcfce7 0%, #d1fae5 100%)';
      textColor = '#166534';
      borderColor = '#bbf7d0';
    } else if (statusText.includes('Error')) {
      bgColor = 'linear-gradient(90deg, #fef2f2 0%, #fce7e7 100%)';
      textColor = '#dc2626';
      borderColor = '#fecaca';
    } else {
      bgColor = 'linear-gradient(90deg, #fef3c7 0%, #f1f5f9 100%)';
      textColor = '#0f172a';
      borderColor = '#fde68a';
    }

    return {
      padding: '1rem',
      borderRadius: '1rem',
      textAlign: 'center',
      fontWeight: '500',
      transform: 'translateY(0)',
      transition: 'all 0.5s ease',
      animation: 'slideUp 0.5s ease-out',
      background: bgColor,
      color: textColor,
      border: `2px solid ${borderColor}`
    };
  };

  const statusContentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  return (
    <>
     <Nav/>
    <div style={containerStyle}>
      <div style={mainCardStyle}>
        <div style={cardStyle}>
          <div style={headerStyle}>
            <div style={headerOverlayStyle}></div>
            <div style={headerContentStyle}>
              <h1 style={titleStyle}>
                User Feedback
              </h1>
              <p style={subtitleStyle}>We'd love to hear your thoughts!</p>
            </div>
            <div style={particleStyle1}></div>
            <div style={particleStyle2}></div>
            <div style={particleStyle3}></div>
          </div>

          <div style={contentStyle}>
            <div style={sectionStyle}>
              <label style={labelStyle}>
                How would you rate your experience?
              </label>
              <div style={ratingContainerStyle}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    style={getStarButtonStyle(rating >= star)}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={(e) => {
                      if (rating < star) {
                        e.target.style.transform = 'scale(1.1)';
                        e.target.style.borderColor = '#fbbf24';
                        e.target.style.background = '#fffbeb';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (rating < star) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.background = 'white';
                      }
                    }}
                  >
                    ⭐
                    {rating >= star && (
                      <div style={pingStyle}></div>
                    )}
                  </button>
                ))}
              </div>
              <div style={ratingTextStyle}>
                <span style={getRatingBadgeStyle(rating > 0)}>
                  {rating === 0 ? 'Please select a rating' : `You selected ${rating} star${rating !== 1 ? 's' : ''} ✨`}
                </span>
              </div>
            </div>

            <div style={textareaGroupStyle}>
              <label htmlFor="message" style={labelStyle}>
                Share your feedback
              </label>
              <div style={textareaContainerStyle}>
                <textarea
                  style={textareaStyle}
                  id="message"
                  rows="6"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think... ✍️"
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = '#f59e0b';
                    e.target.style.boxShadow = '0 0 0 4px rgba(245, 158, 11, 0.1)';
                    e.target.nextSibling.style.opacity = '0.1';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                    e.target.nextSibling.style.opacity = '0';
                  }}
                />
                <div style={textareaOverlayStyle}></div>
              </div>
            </div>

            <div style={buttonContainerStyle}>
              <button
                type="button"
                style={submitButtonStyle}
                onClick={handleSubmit}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  e.target.children[1].style.opacity = '1';
                  e.target.children[2].style.transform = 'skewX(-12deg) translateX(100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                  e.target.children[1].style.opacity = '0';
                  e.target.children[2].style.transform = 'skewX(-12deg) translateX(-100%)';
                }}
              >
                <span style={buttonContentStyle}>
                  Submit Feedback
                  <span>🚀</span>
                </span>
                <div style={buttonOverlayStyle}></div>
                <div style={buttonShineStyle}></div>
              </button>
            </div>

            {status && (
              <div style={getStatusStyle(status)}>
                <span style={statusContentStyle}>
                  {status.includes('success') && '✅'}
                  {status.includes('Error') && '❌'}
                  {status.includes('Sending') && '⏳'}
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
        
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
    </>
  );
}