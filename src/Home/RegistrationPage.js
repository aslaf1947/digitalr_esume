import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  const [name, Setname] = useState('');
  const [address, Setaddress] = useState('');
  const [email, Setemail] = useState('');
  const [phone, Setphone] = useState('');
  const [age, Setage] = useState('');
  const [gender, Setgender] = useState('');
  const [password, Setpassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!emailRegex.test(email)) newErrors.email = 'Invalid email format.';
    if (!age) newErrors.age = 'Age is required.';
    else if (parseInt(age) < 18) newErrors.age = 'Minimum age is 18.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!phoneRegex.test(phone)) newErrors.phone = 'Enter 10-digit phone number.';
    if (!address.trim()) newErrors.address = 'Address is required.';
    if (!password || password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForm = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const param = {
      name,
      email,
      age,
      gender,
      phone,
      address,
      password,
      status: 2,
      approval: 2,
    };

    fetch('http://localhost:5000/demo/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        Setname('');
        Setemail('');
        Setage('');
        Setgender('');
        Setphone('');
        Setaddress('');
        Setpassword('');
        setErrors({});
        alert('Registered successfully');
      });
  };

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
        }}
      >

        <div
          style={{
            background: '#FFD700',
            padding: '25px 40px',
            textAlign: 'center',
          }}
        >
          <Link to="/" style={{
            position: 'absolute',
            borderRadius: '30%',
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
            Create Your Account
          </h1>
          <p style={{ margin: '10px 0 0', color: '#333', fontSize: '15px' }}>
            Please fill in the information below
          </p>
        </div>

        <form style={{ padding: '30px 40px 40px' }} onSubmit={handleForm}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label>Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => Setname(e.target.value)}
                style={inputStyle}
                placeholder="Enter your full name"
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => Setemail(e.target.value)}
                style={inputStyle}
                placeholder="Enter your email"
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            <div>
              <label>Age *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => Setage(e.target.value)}
                style={inputStyle}
                placeholder="Enter your age"
              />
              {errors.age && <div style={errorStyle}>{errors.age}</div>}
            </div>

            <div>
              <label>Gender *</label>
              <select value={gender} onChange={(e) => Setgender(e.target.value)} style={inputStyle}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <div style={errorStyle}>{errors.gender}</div>}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label>Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => Setphone(e.target.value)}
                style={inputStyle}
                placeholder="Enter your phone number"
              />
              {errors.phone && <div style={errorStyle}>{errors.phone}</div>}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label>Address *</label>
              <textarea
                value={address}
                onChange={(e) => Setaddress(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Enter your address"
              />
              {errors.address && <div style={errorStyle}>{errors.address}</div>}
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label>Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => Setpassword(e.target.value)}
                style={inputStyle}
                placeholder="Enter your password"
              />
              {errors.password && <div style={errorStyle}>{errors.password}</div>}
            </div>
          </div>

          <button type="submit" style={buttonStyle}>
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Styles
const inputStyle = {
  width: '100%',
  padding: '12px',
  border: '1px solid #ddd',
  borderRadius: '6px',
};

const errorStyle = {
  color: 'red',
  fontSize: '13px',
  marginTop: '5px',
};

const buttonStyle = {
  marginTop: '20px',
  width: '100%',
  padding: '12px',
  background: '#FFD700',
  color: '#333',
  border: 'none',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
};
