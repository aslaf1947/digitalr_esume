import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = JSON.parse(localStorage.getItem("user"));

  const fetchUserProfile = async () => {
    const res = await fetch('http://localhost:5000/demo/userprofile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth: auth?.regid?._id })
    });

    const result = await res.json();
    const userData = Array.isArray(result) && result.length > 0 ? result[0] : result;

    setUser(userData);
    setForm({
      name: userData.regid?.name || '',
      phone: userData.regid?.phone || '',
      email: userData.email || '',
      address: userData.regid?.address || '',
      age: userData.regid?.age || '',
      gender: userData.regid?.gender || '',
      password: userData.password || '',
      qualification: userData.regid?.qualification || '',
      skills: Array.isArray(userData.regid?.skills)
        ? userData.regid.skills.join(", ")
        : userData.regid?.skills || ''
    });
  };

  useEffect(() => {
    if (auth?.regid) {
      fetchUserProfile();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const fullData = {
      ...form,
      regid: auth.regid._id,
      skills: form.skills.split(',').map(skill => skill.trim())
    };

    await fetch("http://localhost:5000/demo/userprofileupdate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fullData)
    });

    await fetchUserProfile(); // Refresh data
    setEditMode(false);       // Close modal
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

   // Animation keyframes as strings
  const floatAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(180deg); }
    }
  `;

  const pulseAnimation = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  const spinAnimation = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  const fadeInAnimation = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  const scaleInAnimation = `
    @keyframes scaleIn {
      from { transform: scale(0.9) translateY(20px); opacity: 0; }
      to { transform: scale(1) translateY(0); opacity: 1; }
    }
  `;

  return (
    <>
      <style>
        {floatAnimation}
        {pulseAnimation}
        {spinAnimation}
        {fadeInAnimation}
        {scaleInAnimation}
      </style>
      
      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(135deg, #581c87 0%, #1e3a8a 50%, #312e81 100%)'
        }}>
          <div style={{
            position: 'absolute',
            inset: '0',
            opacity: '0.2'
          }}>
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '288px',
              height: '288px',
              background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'pulse 4s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '0',
              right: '0',
              width: '288px',
              height: '288px',
              background: 'radial-gradient(circle, #eab308 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'pulse 4s ease-in-out infinite',
              animationDelay: '2s'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '288px',
              height: '288px',
              background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'pulse 4s ease-in-out infinite',
              animationDelay: '4s'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '288px',
              height: '288px',
              background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              animation: 'pulse 4s ease-in-out infinite',
              animationDelay: '1s'
            }}></div>
          </div>
        </div>

        {/* Floating particles */}
        <div style={{
          position: 'absolute',
          inset: '0',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{
          position: 'relative',
          zIndex: '10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '16px'
        }}>
          <div style={{
            maxWidth: '448px',
            width: '100%'
          }}>
            {loading ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '384px'
              }}>
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    border: '4px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '4px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    inset: '0',
                    width: '64px',
                    height: '64px',
                    border: '4px solid transparent',
                    borderTop: '4px solid #a855f7',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite reverse'
                  }}></div>
                </div>
              </div>
            ) : (
              <div style={{
                backdropFilter: 'blur(16px)',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transform: 'scale(1)',
                transition: 'all 0.5s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}>
                <Link to="/" style={{
            position: 'absolute',
            borderRadius: '30%',
            alignItems: 'center',
            top: '5px',
            left: '30px',
            fontSize: '40px',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 'bold',
            zIndex: 10,
          }}>←</Link>
                {/* Profile Avatar */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{
                      width: '96px',
                      height: '96px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1) rotate(6deg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}>
                      {getInitials(user.regid?.name)}
                    </div>
                    <div style={{
                      position: 'absolute',
                      inset: '-4px',
                      background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                      borderRadius: '50%',
                      opacity: '0.75',
                      filter: 'blur(8px)',
                      animation: 'pulse 2s ease-in-out infinite',
                      zIndex: '-1'
                    }}></div>
                  </div>
                  <h2 style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginTop: '16px',
                    letterSpacing: '0.05em'
                  }}>
                    {user.regid?.name}
                  </h2>
                  <div style={{
                    height: '2px',
                    width: '64px',
                    background: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)',
                    margin: '8px auto 0',
                    borderRadius: '2px'
                  }}></div>
                </div>

                {/* Profile Information */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: '16px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  <InfoCard icon="📞" label="Phone" value={user.regid?.phone} />
                  <InfoCard icon="✉️" label="Email" value={user.email} />
                  <InfoCard icon="🏠" label="Address" value={user.regid?.address} />
                  <InfoCard icon="🎂" label="Age" value={user.regid?.age} />
                  <InfoCard icon="👤" label="Gender" value={user.regid?.gender} />
                  <InfoCard icon="🎓" label="Qualification" value={user.regid?.qualification || 'N/A'} />
                  <InfoCard icon="⚡" label="Skills" value={(user.regid?.skills || []).join(', ')} />
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setEditMode(true)}
                  style={{
                    width: '100%',
                    marginTop: '32px',
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #9333ea 0%, #db2777 100%)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  ✨ Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editMode && (
          <div style={{
            position: 'fixed',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '50',
            padding: '16px',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              padding: '32px',
              width: '100%',
              maxWidth: '448px',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              animation: 'scaleIn 0.4s ease-out'
            }}>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                ✏️ Edit Profile
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {['name', 'age', 'gender', 'phone', 'email', 'address', 'password'].map((field, idx) => (
                  <div key={idx} style={{
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px',
                      textTransform: 'capitalize'
                    }}>
                      {field}:
                    </label>
                    <input
                      name={field}
                      type={field === 'age' || field === 'phone' ? 'number' : field === 'password' ? 'password' : 'text'}
                      value={form[field] || ''}
                      onChange={handleChange}
                      placeholder={`Enter ${field}`}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(4px)',
                        transition: 'all 0.3s ease',
                        outline: 'none'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#a855f7';
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                ))}

                <div style={{
                  transform: 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Qualification:
                  </label>
                  <input
                    name="qualification"
                    type="text"
                    value={form.qualification || ''}
                    onChange={handleChange}
                    placeholder="e.g., MSc Psychology"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.3s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#a855f7';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={{
                  transform: 'scale(1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Skills:
                  </label>
                  <textarea
                    name="skills"
                    value={form.skills || ''}
                    onChange={handleChange}
                    placeholder="Comma-separated skills"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.3s ease',
                      resize: 'none',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#a855f7';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '32px'
              }}>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    flex: '1',
                    background: loading ? '#9ca3af' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? '0.5' : '1'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                    }
                  }}
                  onMouseDown={(e) => {
                    if (!loading) e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    if (!loading) e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  {loading ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: '8px'
                      }}></div>
                      Saving...
                    </div>
                  ) : (
                    '💾 Save'
                  )}
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  style={{
                    flex: '1',
                    background: 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '16px',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
    e.currentTarget.style.transform = 'scale(1)';
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <div style={{ flex: '1', minWidth: '0' }}>
        <p style={{
          fontSize: '14px',
          fontWeight: '500',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0 0 4px 0'
        }}>{label}</p>
        <p style={{
          color: 'white',
          fontWeight: '600',
          margin: '0',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>{value || 'N/A'}</p>
      </div>
    </div>
  </div>
);

export default UserProfile;
