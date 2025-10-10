import React from 'react'
import SideBar from './SideBar';
import NavBar from './NavBar';
import{useState} from 'react';

export default function ApplicantForm() {
    // const inputStyle = {
    //     width: '100%',
    //     padding: '10px',
    //     border: '1px solid #ccc',
    //     borderRadius: '5px',
    //     marginTop: '5px',
    // };
    const[name,Setname]=useState('')
    const[companyname,Setcompanyname]=useState('')
    const[address,Setaddress]=useState('')
    const[email,Setemail]=useState("")
    const[phone,Setphone]=useState('')
    const[password,Setpassword]=useState()
    const handleForm=()=>{
        let param={
            name:name,
            companyname:companyname,
            address:address,
            email:email,
            phone:phone,
            password:password,
            status:1,
            approval:2
        }
        fetch('http://localhost:5000/demo/applicant',{
            method:'POST',
            headers:{
                Accept:"applicant/json",
                'Content-Type':"application/json"
            },
            body:JSON.stringify(param)
        }).then((res)=>res.json()).then((result)=>{
            Setname('')
            Setcompanyname('')
            Setaddress('')
            Setemail('')
            Setphone('')
            Setpassword('')
         alert("registered successfully")
        
        })
    }
    return (
        <>
            <div class="container-xxl position-relative bg-white d-flex p-0">
                <SideBar />
                <div class="content">
                    <NavBar />
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
                            Company Registration
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
                                }} onChange={(e) => Setname(e.target.value)}
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
                                }}onChange={(e) => Setcompanyname(e.target.value)}
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
                                }} onChange={(e) => Setaddress(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Email */}
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '6px' }}>Email *</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '6px',
                                }}onChange={(e) => Setemail(e.target.value)}
                            />
                        </div>

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
                                }}onChange={(e) => Setphone(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
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
            </div>
        </>
    )
}
