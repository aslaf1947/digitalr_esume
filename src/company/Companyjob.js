import React, { useEffect, useState } from 'react';
import SideBar from './CompanySide';
import NavBar from './CompanyNav';

export default function Companyjob() {
  const [jobs, setJobs] = useState([]);
  const [refersh, setRefersh] = useState(0);
  const [title, Settitle] = useState('');
  const [experience, Setexperience] = useState('');
  const [description, Setdescription] = useState('');
  const [cateogry, Setcategory] = useState('');
  const [location, Setlocation] = useState('');
  const [salary, Setsalary] = useState('');
  const [companyName, SetcompanyName] = useState('');
  const [qualification, Setqualification] = useState('');
  const [skills, Setskills] = useState('');
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    let ids = { rid: auth.regid };
    fetch('http://localhost:5000/demo/jobview', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ids)
    }).then((res) => res.json()).then((result) => {
      setJobs(result);
      if (auth && auth.companyName) {
        SetcompanyName(auth.companyName);
      }
    });
  }, [refersh]);

  const handleForm = (e) => {
    e.preventDefault();
    const skillArray = skills.split(',').map(skill => skill.trim()); // Convert comma-separated string to array

    let param = {
      title,
      cateogry,
      description,
      location,
      salary,
      companyName,
      experience,
      qualification,
      skills: skillArray,
      rid: auth.regid,
    };

    fetch('http://localhost:5000/demo/jobapply', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(param)
    }).then((res) => res.json()).then((result) => {
      Settitle('');
      Setcategory('');
      Setdescription('');
      Setlocation('');
      Setsalary('');
      Setexperience('');
      Setqualification('');
      Setskills('');
      SetcompanyName('');
      setRefersh(prev => prev + 1);
      alert("Post successfully");
    });
  };

  const deleteJob = (delid) => {
    let ids = { id: delid };
    fetch('http://localhost:5000/demo/jobdelete', {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify(ids)
    }).then((res) => res.json()).then((result) => {
      setRefersh(prev => prev + 1);
    });
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />
        <br />
        <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif', background: '#fff8e1', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Add New Job</h2>
          <form onSubmit={handleForm}>
            <input
              name="title"
              placeholder="Job Title"
              value={title}
              required
              style={inputStyle}
              onChange={(e) => Settitle(e.target.value)}
            />
            <input
              name="experience"
              placeholder="Job Experience"
              value={experience}
              required
              style={inputStyle}
              onChange={(e) => Setexperience(e.target.value)}
            />
            <input
              name="qualification"
              placeholder="Qualification"
              value={qualification}
              required
              style={inputStyle}
              onChange={(e) => Setqualification(e.target.value)}
            />
            <input
              name="skills"
              placeholder="Skills (comma-separated)"
              value={skills}
              required
              style={inputStyle}
              onChange={(e) => Setskills(e.target.value)}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={description}
              required
              style={{ ...inputStyle, resize: 'vertical' }}
              onChange={(e) => Setdescription(e.target.value)}
            />
            <select
              name="category"
              value={cateogry}
              required
              style={inputStyle}
              onChange={(e) => Setcategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Work From Home">Work From Home</option>
              <option value="Internship">Internship</option>
            </select>
            <input
              name="location"
              placeholder="Location"
              value={location}
              required
              style={inputStyle}
              onChange={(e) => Setlocation(e.target.value)}
            />
            <input
              name="salary"
              placeholder="Salary"
              value={salary}
              required
              style={inputStyle}
              onChange={(e) => Setsalary(e.target.value)}
            />
            <button
              type="submit"
              style={buttonStyle}
            >
              Post Job
            </button>
          </form>
        </div>

        <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {jobs.map((item) => (
            <div key={item._id} style={cardStyle}>
              <div>
                <h3 style={{ margin: '0 0 10px' }}>{item.title}</h3>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Category:</strong> {item.cateogry}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Experience:</strong> {item.experience}</p>
                <p><strong>Qualification:</strong> {item.qualification}</p>
                <p><strong>Skills:</strong> {(item.skills || []).join(', ')}</p>
                <p><strong>Salary:</strong> {item.salary}</p>
                <p style={{ marginTop: '10px' }}>{item.description}</p>
              </div>
              <button onClick={() => deleteJob(item._id)} style={deleteBtnStyle}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  width: '100%',
  padding: '12px',
  backgroundColor: '#ffd600',
  border: 'none',
  borderRadius: '6px',
  color: '#333',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const cardStyle = {
  border: '1px solid #eee',
  borderRadius: '10px',
  padding: '20px',
  background: '#fff8e1',
  boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
};

const deleteBtnStyle = {
  marginTop: '15px',
  padding: '10px',
  backgroundColor: '#e53935',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};
