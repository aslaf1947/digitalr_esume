import React, { useEffect, useState } from 'react'
import SideBar from './SideBar'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function JobApplicant() {
    const [view, Setview] = useState([])
    const [refersh, setRefersh] = useState(0)
    useEffect(() => {
        fetch('http://localhost:5000/demo/applicantview').then((res) => res.json()).then((result) => {
            Setview(result)
            // console.log("sucess",result)
        })
    }, [refersh])
    const handleDelete = (delid) => {
        let ids = {
            id: delid
        }
        fetch('http://localhost:5000/demo/applicantdelete', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(ids)
        }).then((res) => res.json()).then((result) => {
            console.log(result)
            setRefersh(prev => prev + 1)
        })
    }

    return (
        <>
            <div class="container-xxl position-relative bg-white d-flex p-0">
                <SideBar />
                <div class="content">
                    <NavBar />
                    <div class="container-fluid pt-4 px-4">
                        <div class="bg-light text-center rounded p-4 mb-4">
                            <div class="d-flex align-items-center justify-content-between mb-4">
                                <h6 class="mb-0">Company List</h6>
                                <button style={{
                                    borderRadius: "10px",
                                    background: "blue",

                                    border: "none"
                                }}><Link to="/applicantForm" style={{ color: "white", }}>ADD</Link> </button>
                            </div>
                            <div class="table-responsive">
                                <table class="table text-start align-middle table-bordered table-hover mb-0">
                                    <thead class="text-dark">
                                        <tr>
                                            <th scope="col"><input class="form-check-input" /></th>
                                            <th scope="col">Ceo Name</th>
                                            <th scope="col">Company Name</th>
                                            <th scope="col">address</th>
                                            <th scope="col">email</th>
                                            <th scope="col">phone</th>
                                            {/* <th scope="col">password</th> */}
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {view.map((items, index) => {
                                            return (
                                                <tr key={items._id}>
                                                    <td>{index + 1}</td>
                                                    <td>{items.regid.ceoName}</td>
                                                    <td>{items.regid.companyName}</td>
                                                    <td>{items.regid.companyAddress}</td>
                                                    <td>{items.email}</td>
                                                    <td>{items.regid.phoneNumber}</td>
                                                    {/* <td>{items.password}</td> */}
                                                    <td>
                                                        {items.regid.approval === 2 ? (
                                                            <>
                                                                <button
                                                                    className='btn'
                                                                    style={{ borderRadius: "5px", background: "#ff0f7b", color: "white" }}
                                                                    onClick={() => handleDelete(items.regid._id)}
                                                                >
                                                                    Delete
                                                                </button>&nbsp;
                                                                <button
                                                                    className='btn'
                                                                    style={{ borderRadius: "5px", background: "#57ebde" }}
                                                                >
                                                                    <Link
                                                                        to="/updateapplicant"
                                                                        style={{ color: "white" }}
                                                                        state={{ id: items.regid._id }}
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </button>
                                                            </>
                                                        ) : items.regid.approval === 0 ? (
                                                            <button
                                                                className="btn"
                                                                style={{
                                                                    borderRadius: "5px",
                                                                    background: "#28a745",
                                                                    color: "white",
                                                                    cursor: "not-allowed",
                                                                    opacity: 0.6,
                                                                }}
                                                                disabled
                                                            >
                                                           

                                                                Approved
                                                    </button>
                                                        ) : null}
                                                </td>

                                                </tr>
                                    )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
        </>
    )
}
