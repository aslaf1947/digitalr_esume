import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CompanyRegister() {
    const [name, Setname] = useState('');
    const [companyname, Setcompanyname] = useState('');
    const [address, Setaddress] = useState('');
    const [email, Setemail] = useState('');
    const [phone, Setphone] = useState('');
    const [password, Setpassword] = useState('');
    const [image, Setimage] = useState(null);
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!name || !companyname || !address || !email || !phone || !password || !image) {
            setError('Please fill all the fields');
            return false;
        }

        const namePattern = /^[A-Za-z\s]+$/;
        if (!namePattern.test(name)) {
            setError('Name should contain only alphabets');
            return false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Enter a valid email address');
            return false;
        }

        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            setError('Phone number must be 10 digits with no letters');
            return false;
        }

        if (password.length > 8) {
            setError('Password must be a maximum of 8 characters');
            return false;
        }

        setError('');
        return true;
    };

    const handleForm = () => {
        if (!validateForm()) return;

        let param = {
            name,
            companyname,
            address,
            email,
            phone,
            password,
            image,
            status: 1,
            approval: 0
        };

        fetch('http://localhost:5000/demo/applicant', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(param)
        })
            .then((res) => res.json())
            .then((result) => {
                Setname('');
                Setcompanyname('');
                Setaddress('');
                Setemail('');
                Setphone('');
                Setpassword('');
                Setimage(null);
                alert("Registered successfully");
            });
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(to right, #f7d574, #fff6b7)',
            padding: '40px',
            fontFamily: 'Segoe UI, sans-serif',
        }}>
            <div
                style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    padding: '30px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    backgroundColor: '#fff'
                }}
            >
                <Link to="/" style={{
                    position: 'absolute',
                    borderRadius: '30%',
                    alignItems: 'center',
                    top: '25px',
                    left: '480px',
                    fontSize: '40px',
                    color: 'black',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    zIndex: 10,
                }}>←</Link>
                <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
                    Company Registration
                </h2>

                {error && (
                    <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                {/* CEO Name */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>CEO Name *</label>
                    <input
                        type="text"
                        name="ceoName"
                        placeholder="Enter CEO Name"
                        style={inputStyle}
                        value={name}
                        onChange={(e) => Setname(e.target.value)}
                    />
                </div>

                {/* Company Name */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Company Name *</label>
                    <input
                        type="text"
                        name="companyName"
                        placeholder="Enter Company Name"
                        style={inputStyle}
                        value={companyname}
                        onChange={(e) => Setcompanyname(e.target.value)}
                    />
                </div>

                {/* Company Address */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Company Address *</label>
                    <textarea
                        name="companyAddress"
                        placeholder="Enter Company Address"
                        rows="3"
                        style={{ ...inputStyle, resize: 'vertical' }}
                        value={address}
                        onChange={(e) => Setaddress(e.target.value)}
                    ></textarea>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Email *</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        style={inputStyle}
                        value={email}
                        onChange={(e) => Setemail(e.target.value)}
                    />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Phone *</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone Number"
                        style={inputStyle}
                        value={phone}
                        onChange={(e) => Setphone(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Password *</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password (max 8 characters)"
                        style={inputStyle}
                        value={password}
                        onChange={(e) => Setpassword(e.target.value)}
                    />
                </div>

                {/* Company Image */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '6px' }}>Company Logo *</label>
                    <input
                        type="file"
                        accept="image/*"
                        style={inputStyle}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    Setimage(reader.result);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>

                {/* Register Button */}
                <button
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#FFD700',
                        color: '#333',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                    }}
                    onClick={handleForm}
                >
                    Register Company
                </button>
            </div>
        </div>
    );
}

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
};
