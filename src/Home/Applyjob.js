import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Applyjob = () => {
  const location = useLocation();
  const job = location.state?.job || { title: '' };
 const navigate=useNavigate();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [hasApplied, setHasApplied] = useState(false);

  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    console.error('Invalid user data in localStorage');
  }

  useEffect(() => {
    if (!auth?.regid || !job._id) return;

    // Fetch user details
    fetch('http://localhost:5000/demo/useridview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rid: auth.regid._id }),
    })
      .then(res => res.json())
      .then(result => {
        if (Array.isArray(result) && result.length > 0) {
          setUser(result[0]);
        } else {
          console.error('No user found');
        }
      })
      .catch(err => console.error('User fetch error:', err));

    // Check if the user already applied
    fetch('http://localhost:5000/demo/check-application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rid: auth.regid._id, postid: job._id }),
    })
      .then(res => res.json())
      .then(data => setHasApplied(data.applied))
      .catch(err => console.error('Application status check error:', err));
  }, [auth, job._id]);

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');

    if (!file) {
      setMessage('Please upload a PDF file.');
      return;
    }

    if (file.type !== 'application/pdf') {
      setMessage('Only PDF files are allowed.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('rid', auth?.regid._id);
    formData.append('postid', job._id);
    formData.append('email', user?.email);

    fetch('http://localhost:5000/demo/fileupload', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(result => {
        if (result.message) {
          setMessage('🎉 ' + result.message);
          setHasApplied(true);
          setTimeout(() => {
          navigate('/job'); // Redirect to job page
        }, 2000);
        } else {
          setMessage('Upload failed.');
        }
      })
      .catch(err => {
        console.error('Upload error:', err);
        setMessage('Upload failed.');
      });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #fceabb, #f8b500)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          padding: 30,
          maxWidth: 450,
          width: '100%',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: 20,
            fontSize: 26,
            color: '#333',
          }}
        >
          Apply for the Job
        </h2>

        <div style={{ marginBottom: 20, color: '#555' }}>
          <p><strong>Job Title:</strong> {job.title || 'N/A'}</p>
          <p><strong>Name:</strong> {user?.regid?.name || 'Loading...'}</p>
          <p><strong>Email:</strong> {user?.email || 'Loading...'}</p>
        </div>

        {hasApplied ? (
          <div
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#28a745',
              fontSize: 18,
            }}
          >
            ✅ You have already applied for this job.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                color: '#444',
                fontWeight: 500,
              }}
            >
              Upload Resume (PDF only)
            </label>

            <input
              type="file"
              accept="application/pdf"
              onChange={e => setFile(e.target.files[0])}
              style={{
                display: 'block',
                width: '100%',
                padding: 10,
                borderRadius: 8,
                border: '1px solid #ccc',
                marginBottom: 20,
                fontSize: 14,
              }}
            />

            <button
              type="submit"
              style={{
                backgroundColor: '#f8b500',
                color: '#fff',
                border: 'none',
                width: '100%',
                padding: 12,
                fontSize: 16,
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background 0.3s ease',
              }}
              onMouseOver={e => (e.target.style.backgroundColor = '#e1a200')}
              onMouseOut={e => (e.target.style.backgroundColor = '#f8b500')}
            >
              Submit Application
            </button>
          </form>
        )}

        {message && (
          <div
            style={{
              marginTop: 20,
              textAlign: 'center',
              color: message.startsWith('🎉') ? '#28a745' : '#d9534f',
              fontWeight: 600,
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applyjob;
