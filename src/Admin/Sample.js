// import React, { useState } from 'react'
// import SideBar from './SideBar'
// import NavBar from './NavBar'

// export default function Sample() {
//     const[name,Setname]=useState("")
//     const[email,Setemail]=useState("")
//     const[address,Setaddress]=useState("")
//     const handleForm=()=>{
//         let param={
//             name:name,
//             address:address,
//             email:email,
//         }
//         fetch('http://localhost:5000/demo/sample',{
//             method:'POST',
//             headers:{
//                 Accept:"applicant/json",
//                 'Content-Type':"application/json"
//             },
//             body:JSON.stringify(param)
//         }).then((res)=>res.json()).then((result)=>{
//             Setname('')
//             Setaddress('')
//             Setemail('')
//          alert("registered successfully")
        
//         })
//     }
//   return (
//      <>
//                  <div class="container-xxl position-relative bg-white d-flex p-0">
//                      <SideBar />
//                      <div class="content">
//                          <NavBar />
//                          <div
//                              style={{
//                                  maxWidth: '600px',
//                                  margin: '40px auto',
//                                  padding: '30px',
//                                  border: '1px solid #ddd',
//                                  borderRadius: '10px',
//                                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//                                  backgroundColor: '#fff',
//                                  fontFamily: 'Segoe UI, sans-serif',
//                              }}
//                          >
//                              <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
//                                  Registration
//                              </h2>
     
//                              {/* CEO Name */}
//                              <div style={{ marginBottom: '15px' }}>
//                                  <label style={{ display: 'block', marginBottom: '6px' }}> Name </label>
//                                  <input
//                                      type="text"
//                                      name="Name"
//                                      placeholder="Enter  Name"
//                                      style={{
//                                          width: '100%',
//                                          padding: '10px',
//                                          border: '1px solid #ccc',
//                                          borderRadius: '6px',
//                                      }} onChange={(e) => Setname(e.target.value)}
//                                  />
//                              </div> 
//                             {/* Company Address */}
//                              <div style={{ marginBottom: '15px' }}>
//                                  <label style={{ display: 'block', marginBottom: '6px' }}>Address *</label>
//                                  <textarea
//                                      name="Address"
//                                      placeholder="Enter  Address"
//                                      rows="3"
//                                      style={{
//                                          width: '100%',
//                                          padding: '10px',
//                                          border: '1px solid #ccc',
//                                          borderRadius: '6px',
//                                          resize: 'vertical',
//                                      }} onChange={(e) => Setaddress(e.target.value)}
//                                  ></textarea>
//                              </div>
     
//                              {/* Email */}
//                              <div style={{ marginBottom: '15px' }}>
//                                  <label style={{ display: 'block', marginBottom: '6px' }}>Email *</label>
//                                  <input
//                                      type="email"
//                                      name="email"
//                                      placeholder="Enter Email"
//                                      style={{
//                                          width: '100%',
//                                          padding: '10px',
//                                          border: '1px solid #ccc',
//                                          borderRadius: '6px',
//                                      }}onChange={(e) => Setemail(e.target.value)}
//                                  />
//                              </div>
//                              <button
//                                  style={{
//                                      width: '100%',
//                                      padding: '12px',
//                                      backgroundColor: '#FFD700',
//                                      color: '#333',
//                                      fontWeight: 'bold',
//                                      border: 'none',
//                                      borderRadius: '6px',
//                                      cursor: 'pointer',
//                                  }}
//                                  onClick={handleForm}
//                              >
//                                  Register 
//                              </button>
//                          </div>
//                      </div>
//                  </div>
//              </>
//          )
//      }