import React, { useEffect, useState } from 'react';
import SideBar from './CompanySide';
import NavBar from './CompanyNav';

export default function CompanyFeedback() {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState('');
  const [auth] = useState(JSON.parse(localStorage.getItem("user")));
  const [company, setCompany] = useState([]);

  // useEffect(() => {
  //   let ids = { rid: auth.regid };
  //   fetch("http://localhost:5000/demo/profilecreate", {
  //     method: 'POST',
  //     headers: {
  //       Accept: "application/json",
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(ids)
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setCompany(result);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching company data:", err);
  //     });
  // }, [auth.regid]);

  const handleSubmit = async () => {
    if (!message || rating === 0) {
      setStatus('Please fill in all fields');
      return;
    }

    const data = {
      message: message,
      rating: rating,
      rid: auth.regid,
      companyName: company[0]?.companyName || 'Unknown',
      status:1
    };

    setStatus('Sending...');

    try {
      const response = await fetch('http://localhost:5000/demo/companyfeedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      setStatus('Message sent successfully!');
      setMessage('');
      setRating(0);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus('Error submitting feedback.');
    }
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  return (
    <div className="container-xxl position-relative bg-white d-flex p-0">
      <SideBar />
      <div className="content">
        <NavBar />

        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12">
              <div className="bg-light rounded h-100 p-4">
                <h6 className="mb-4">Company Feedback</h6>

                {/* Company Name */}
                {/* <div className="mb-3">
                  <label htmlFor="companyName" className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="companyName"
                    value={company.regid?.companyName || 'N/A'}
                    readOnly
                  />
                </div> */}

                {/* Rating */}
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <div className="d-flex align-items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`btn btn-outline-warning me-2 ${rating >= star ? 'active' : ''}`}
                        onClick={() => handleRatingClick(star)}
                        style={{ width: '45px', height: '45px' }}
                      >
                        {star}
                      </button>
                    ))}
                  </div>
                  <small className="text-muted mt-1 d-block">
                    {rating === 0 ? 'Please select a rating' : `You selected ${rating} star${rating !== 1 ? 's' : ''}`}
                  </small>
                </div>

                {/* Message */}
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={handleSubmit}
                >
                  Submit Feedback
                </button>

                {/* Status Message */}
                {status && (
                  <div className="alert alert-info mt-3" role="alert">
                    {status}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
