import React, { useEffect, useState } from 'react';
import SideBar from './CompanySide';
import NavBar from './CompanyNav';
import url from './url';

export default function ProfileCompany() {
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));
  const [profiles, setProfiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phoneNumber: '',
    companyAddress: '',
    password: '',
  });

  useEffect(() => {
    fetchProfiles();
  }, [auth]);
console.log(profiles,"profiles")
  const fetchProfiles = () => {
    if (!auth?.regid) return;
console.log("hi")
    fetch('http://localhost:5000/demo/profilecreate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ auth: auth.regid })
    })
      .then(res => res.json())
      .then(result => {
        setProfiles(Array.isArray(result) ? result : [result]);
      });
  };

  const openModal = (profile) => {
    setFormData({
      companyName: profile.regid?.companyName || '',
      email: profile.email || '',
      phoneNumber: profile.regid?.phoneNumber || '',
      companyAddress: profile.regid?.companyAddress || '',
      password: profile.password || '',
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("regid", auth.regid);
      form.append("companyName", formData.companyName);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("companyAddress", formData.companyAddress);
      form.append("password", formData.password);
      if (selectedFile) form.append("image", selectedFile);

      const res = await fetch("http://localhost:5000/demo/imageandprofileupdate", {
        method: "POST",
        body: form
      });
      const result = await res.json();
      if (res.ok) {
        alert("Profile and image updated successfully");
        fetchProfiles();

        setIsModalOpen(false);
        setSelectedFile(null);
      } else {
        alert("Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <div className="container-fluid d-flex flex-wrap justify-content-center gap-4 pt-5">
          {profiles.map((profile, index) => (
            <div key={index} style={{
              width: '420px',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
              fontFamily: 'Segoe UI, sans-serif',
              textAlign: 'center'
            }}>
              <h4>{profile.regid?.ceoName || 'N/A'}</h4>
              {profile.regid?.image && (
                <div className="d-flex justify-content-center mb-3">
                  <img
                    className="rounded-circle border"
                      src={`http://localhost:5000/assets/${profile.regid?.image}`}
                    alt="Profile"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </div>
              )}
              <hr />
              <div className="text-start">
                <p><strong>Company Name:</strong> {profile.regid?.companyName || 'N/A'}</p>
                <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
                <p><strong>Phone:</strong> {profile.regid?.phoneNumber || 'N/A'}</p>
                <p><strong>Address:</strong> {profile.regid?.companyAddress || 'N/A'}</p>
                <p><strong>Password:</strong> {profile.password || 'N/A'}</p>
              </div>
              <div className="mt-4">
                <button className="btn btn-primary mt-2" onClick={() => openModal(profile)}>
                  Update Profile & Image
                </button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
          }}>
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px' }}>
              <h3>Update Profile</h3>
              <form onSubmit={handleProfileUpdate}>
                <input type="text" name="companyName" placeholder="Company Name" className="form-control mb-2" value={formData.companyName} onChange={handleInputChange} />
                <input type="email" name="email" placeholder="Email" className="form-control mb-2" value={formData.email} onChange={handleInputChange} />
                <input type="text" name="phoneNumber" placeholder="Phone" className="form-control mb-2" value={formData.phoneNumber} onChange={handleInputChange} />
                <input type="text" name="companyAddress" placeholder="Address" className="form-control mb-2" value={formData.companyAddress} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" className="form-control mb-2" value={formData.password} onChange={handleInputChange} />
                <input type="file" accept="image/*" className="form-control mb-2" onChange={handleFileChange} />
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
