import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
const LoginPage = () => {
  const [email, Setemail] = useState("");
  const [password, Setpassword] = useState("");

  const handleLogin = () => {
    // Manual admin login check
    if (email === "admin@gmail.com" && password === "admin") {
      localStorage.setItem("user", JSON.stringify({ email: "admin@gmail.com", status: 0 }));
      window.location.href = "/admin";
      return;
    }

    // Regular login flow
    let param = { email, password };
    fetch('http://localhost:5000/demo/login', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(param)
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "nijimjo");
        if (result !== "invalid") {
          localStorage.setItem("user", JSON.stringify(result));
          window.location.href = "/";
        } else {
          console.log("Invalid login");
          alert("Invalid credentials");
        }
      })
      .catch(error => console.log(error));
  };

   return (
    <div
      style={{
        backgroundColor: '#e91e63',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ff930f , #fff95b)',
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          width: '900px',
          height: '500px',
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Back Arrow */}
       

        {/* Left Section */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #ff9800 0%, #ff5722 100%)',
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            clipPath: 'polygon(0% 0%, 85% 0%, 95% 20%, 90% 40%, 95% 60%, 85% 80%, 95% 100%, 0% 100%)',
          }}
        >
          <h1
            style={{
              color: '#ffffff',
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2',
            }}
          >
            Welcome Back
          </h1>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              lineHeight: '1.6',
              maxWidth: '280px',
            }}
          >
            Enter your email and password to access your account and continue your journey with us.
          </p>
          <button  style={{
                width: '50%',
                padding: '3px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '20px',
              }} >
          <Link to="/" style={{color:"white"}}>
          Back
        </Link>
        </button>
        </div>


        {/* Right Section */}
        <div
          style={{
            flex: 1,
            padding: '60px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* User Icon */}
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#ff9800',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <User size={28} color="#ffffff" />
          </div>

          <div style={{ width: '100%', maxWidth: '300px' }}>
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: '2px solid #f0f0f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => Setemail(e.target.value)}
                value={email}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff9800';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f0f0f0';
                  e.target.style.backgroundColor = '#f8f9fa';
                }}
              />
            </div>

            <div style={{ position: 'relative', marginBottom: '15px' }}>
              <input
                type="password"
                placeholder="Password"
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  border: '2px solid #f0f0f0',
                  borderRadius: '12px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  outline: 'none',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box',
                }}
                onChange={(e) => Setpassword(e.target.value)}
                value={password}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ff9800';
                  e.target.style.backgroundColor = '#ffffff';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#f0f0f0';
                  e.target.style.backgroundColor = '#f8f9fa';
                }}
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '12px',
                marginBottom: '25px',
                color: '#999',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                <span>Remember me</span>
              </label>
              {/* <a
                href="#"
                style={{
                  color: '#ff9800',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
              >
                Forgot password?
              </a> */}
            </div>

            <button
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '20px',
              }}
              onClick={handleLogin}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f57c00';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ff9800';
                e.target.style.transform = 'translateY(0px)';
              }}
            >
              LOGIN
            </button>

            <div
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#666',
              }}
            >
              <span>Don't have an account? </span>
              <a
                href='/'
                style={{
                  color: '#ff9800',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  transition: 'color 0.3s',
                }}
              >
                SIGN UP
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
