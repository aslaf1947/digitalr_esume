import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { useLocation, useNavigate } from 'react-router-dom'

export default function UpdateApplicant() {
        const location=useLocation()
        const[ceoName,SetceoName]=useState('')
        const[companyName,SetcompanyName]=useState('')
        const[companyAddress,SetcompanyAddress]=useState('')
        const[email,Setemail]=useState("")
        const[phoneNumber,SetphoneNumber]=useState('')
        const[password,Setpassword]=useState()
        const navigate=useNavigate()
        useEffect(()=>{
            let edits={
                id:location.state.id
                
            }
            fetch('http://localhost:5000/demo/applicantedit',{
                method:'POST',
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(edits)
            }).then((res)=>res.json()).then((result)=>{
                SetceoName(result.edit.ceoName)
                SetcompanyName(result.edit.companyName)
                SetcompanyAddress(result.edit.companyAddress)
                Setemail(result.email)
                SetphoneNumber(result.edit.phoneNumber)
                
             
            })
        },[])
        const handleFormUpdate=()=>{
            let ids={
                id:location.state.id,
                ceoName:ceoName,
                companyName:companyName,
                companyAddress:companyAddress,
                email:email,
                phoneNumber:phoneNumber,
                password:password
            }
            fetch('http://localhost:5000/demo/applicantupdate',{
                method:'post',
                headers:{
                    Accept:"application/json",
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(ids)
            }).then((res)=>res.json()).then((result)=>{
                // console.log(result)
                console.log(result);
                navigate('/jobapplicant')
           
            })
        }
  return (
    <>
                <div class="container-xxl position-relative bg-white d-flex p-0">
                    <SideBar />
                    <div class="content">
                        <NavBar/>
                        <div
                            style={{
                                maxWidth: '600px',
                                margin: '40px auto',
                                padding: '30px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                backgroundColor: '#fff',
                                fontFamily: 'Segoe UI, sans-serif',
                            }}
                        >
                            <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>
                                Update company Registration
                            </h2>
    
                            {/* CEO Name */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>CEO Name *</label>
                                <input
                                    type="text"
                                    name="ceoName"
                                    placeholder="Enter CEO Name"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                    }} onChange={(e) => SetceoName(e.target.value)} value={ceoName}
                                />
                            </div>
    
                            {/* Company Name */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>Company Name *</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    placeholder="Enter Company Name"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                    }}onChange={(e) => SetcompanyName(e.target.value)} value={companyName}
                                />
                            </div>
    
                            {/* Company Address */}
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>Company Address *</label>
                                <textarea
                                    name="companyAddress"
                                    placeholder="Enter Company Address"
                                    rows="3"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                        resize: 'vertical',
                                    }} onChange={(e) => SetcompanyAddress(e.target.value)} value={companyAddress}
                                ></textarea>
                            </div>
    
                            {/* Email */}
                            {/* <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>Email *</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter a Email"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                    }}onChange={(e) => Setemail(e.target.value)} value={email}
                                />
                            </div>
     */}
                            {/* Phone */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>Phone *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter Phone Number"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                    }}onChange={(e) => SetphoneNumber(e.target.value)} value={phoneNumber}
                                />
                            </div>
                            {/* <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '6px' }}>password *</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '6px',
                                    }}onChange={(e) => Setpassword(e.target.value)}
                                />
                            </div> */}
    
                            {/* Register Button */}
                            <button onClick={handleFormUpdate}
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
                               
                            >
                               Update
                            </button>
                        </div>
                    </div>
                </div>
    </>
  )
}
