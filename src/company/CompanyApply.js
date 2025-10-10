import React, { useEffect, useState } from 'react';
import SideBar from './CompanySide';
import NavBar from './CompanyNav';
import url from './url';

const CompanyApply = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchFiles = () => {
    fetch('http://localhost:5000/demo/fileview')
      .then(res => res.json())
      .then(data => {
        setFiles(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch files');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const updateStatus = (fileId, newStatus) => {
    fetch('http://localhost:5000/demo/fileupdate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileId, status: newStatus }),
    })
      .then(res => res.json())
      .then(() => fetchFiles())
      .catch(() => alert('Failed to update status'));
  };

  if (loading) return <div style={{ padding: 20 }}>Loading files...</div>;
  if (error) return <div style={{ padding: 20, color: 'red' }}>{error}</div>;

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div style={{ maxWidth: 1200, margin: '20px auto', fontFamily: 'Segoe UI, sans-serif', animation: 'fadeIn 0.8s ease' }}>
          <h2 style={{ marginBottom: 20, color: '#333', textAlign: 'center' }}>📁 Job Applications</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ background: '#f1f1f1', textAlign: 'left', borderBottom: '2px solid #ccc' }}>
                <th style={{ padding: 12 }}>Post</th>
                <th style={{ padding: 12 }}>Applicant</th>
                <th style={{ padding: 12 }}>Email</th>
                <th style={{ padding: 12 }}>File</th>
                <th style={{ padding: 12 }}>Status</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(({ _id, file, email, status, rid, postid }, idx) => (
                <tr key={_id} style={{
                  borderBottom: '1px solid #eee',
                  animation: 'fadeSlide 0.5s ease',
                  animationDelay: `${idx * 0.1}s`,
                  animationFillMode: 'both'
                }}>
                  <td style={{ padding: 12 }}>{postid?.title || 'N/A'}</td>
                  <td style={{ padding: 12 }}>{rid?.name || 'N/A'}</td>
                  <td style={{ padding: 12 }}>{email || 'N/A'}</td>
                  <td style={{ padding: 12 }}>
                    {file ? (
                      <a href={url + file} target="_blank" rel="noopener noreferrer" style={{ color: '#0d6efd', fontWeight: 500 }}>📄 View</a>
                    ) : 'No file'}
                  </td>
                  <td style={{ padding: 12, textTransform: 'capitalize' }}>{status}</td>
                  <td style={{ padding: 12 }}>
                    {status === 'approved' && <StatusTag text="Approved" color="#0f5132" bg="#d1e7dd" border="#badbcc" />}
                    {status === 'rejected' && <StatusTag text="Rejected" color="#842029" bg="#f8d7da" border="#f5c2c7" />}
                    {status === 'selected' && <StatusTag text="Selected" color="#084298" bg="#cfe2ff" border="#b6d4fe" />}

                    {/* ✅ Disable buttons when status is 'selected' */}
                    {status !== 'approved' && status !== 'selected' && (
                      <button
                        onClick={() => updateStatus(_id, 'approved')}
                        style={buttonStyle('#198754', '#146c43')}
                      >
                        ✅ Approve
                      </button>
                    )}
                    {status !== 'rejected' && status !== 'selected' && (
                      <button
                        onClick={() => updateStatus(_id, 'rejected')}
                        style={buttonStyle('#dc3545', '#b02a37')}
                      >
                        ❌ Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>
        {`
        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        button:hover {
          transform: scale(1.05);
        }
        `}
      </style>
    </div>
  );
};

const buttonStyle = (bg, border) => ({
  padding: '8px 12px',
  marginRight: 10,
  backgroundColor: bg,
  color: 'white',
  border: `2px solid ${border}`,
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: '0.3s',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
});

const StatusTag = ({ text, color, bg, border }) => (
  <span style={{
    display: 'inline-block',
    padding: '6px 12px',
    backgroundColor: bg,
    color: color,
    border: `1px solid ${border}`,
    borderRadius: '6px',
    fontWeight: 'bold',
    transition: '0.3s',
  }}>
    {text}
  </span>
);

export default CompanyApply;
