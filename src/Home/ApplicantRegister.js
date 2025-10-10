import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ApplicantRegister = () => {
  const [formData, setFormData] = useState({
    ceoName: '',
    companyName: '',
    companyAddress: '',
    email: '',
    phone: '',
  });

  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company registration submitted:', formData);
    setSubmitted(true);

    setTimeout(() => {
      setFormData({
        ceoName: '',
        companyName: '',
        companyAddress: '',
        email: '',
        phone: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #FFE082, #FFECB3)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
          opacity: isVisible ? '1' : '0',
          transition: 'transform 0.8s ease-out, opacity 0.8s ease-out',
        }}
      >
        {submitted ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 20px',
                background: '#FFD700',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              ✓
            </div>
            <h2 style={{ color: '#333', marginBottom: '15px' }}>
              Company Registered Successfully!
            </h2>
            <p style={{ color: '#666' }}>
              Thank you for registering your company with us.
            </p>
          </div>
        ) : (
          <>
            <div style={{ background: '#FFD700', padding: '25px 40px', textAlign: 'center' }}>
              <Link to="/" style={{
                position: 'absolute',
                borderRadius: '30%',
                // border: '2px solid #FFD700',
                alignItems: 'center',
                top: '5px',
                left: '490px',
                fontSize: '40px',
                color: 'black',
                textDecoration: 'none',
                fontWeight: 'bold',
                zIndex: 10,
              }}>←</Link>
              <h1 style={{ margin: '0', color: '#333', fontSize: '24px' }}>
                Register Your Company
              </h1>
              <p style={{ margin: '10px 0 0', color: '#333', fontSize: '15px' }}>
                Please fill in the details below
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '30px 40px 40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {/* CEO Name */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>CEO Name *</label>
                  <input
                    type="text"
                    name="ceoName"
                    value={formData.ceoName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                    }}
                    placeholder="Enter CEO's name"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                    }}
                    placeholder="Enter company name"
                  />
                </div>

                {/* Company Address */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Company Address *</label>
                  <textarea
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      resize: 'vertical',
                    }}
                    placeholder="Enter company address"
                  ></textarea>
                </div>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                    }}
                    placeholder="Enter email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px' }}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                    }}
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '20px',
                  width: '100%',
                  padding: '12px',
                  background: '#FFD700',
                  color: '#333',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Register Company
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicantRegister;
