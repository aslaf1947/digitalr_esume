import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'

export default function User() {
  const [view, setView] = useState([]);
  const [refersh, setRefersh] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/demo/userview')
      .then((res) => res.json())
      .then((result) => {
        setView(result);
      });
  }, [refersh]);

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div style={{ padding: '30px' }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>User List</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Age</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Gender</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Address</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
                </tr>
              </thead>
              <tbody>
                {view.map((item, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.regid?.name || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.email}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.regid?.age || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.regid?.gender || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.regid?.address || '-'}</td>
                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.regid?.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
