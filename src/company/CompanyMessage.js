import React, { useEffect, useState } from 'react';
import SideBar from './CompanySide';
import NavBar from './CompanyNav';

export default function CompanyMessage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    if (!auth?.regid) return;

    fetch('http://localhost:5000/demo/companyfeedbackreplyview', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ rid: auth.regid })
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setNotifications([]);
        setLoading(false);
      });
  }, [auth]);

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div style={{ padding: '30px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Admin Notifications</h2>

          {loading ? (
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#999' }}>Loading notifications...</p>
          ) : notifications.length === 0 ? (
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#999' }}>No notifications yet.</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {notifications.map((note) => (
                <div key={note._id} style={{
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  padding: '20px',
                  background: '#f1fdf6',
                  boxShadow: '0 0 8px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h4 style={{ margin: '0 0 10px', color: '#4caf50' }}>📢 Admin Reply</h4>
                    <p><strong>Feedback:</strong> {note.message}</p>
                    <p><strong>Reply:</strong> {note.reply || 'No reply yet'}</p>
                    {/* <p style={{ fontSize: '13px', color: '#999' }}>Date: {new Date(note.date).toLocaleDateString()}</p> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
