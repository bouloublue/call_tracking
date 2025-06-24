import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

function Leads() {
  const [leadsList, setLeadsList] = useState([]);

  useEffect(() => {
    // Load campaigns from session and extract lead info
    const stored = sessionStorage.getItem("campaigns");
    if (stored) {
      const campaigns = JSON.parse(stored);
      const extractedLeads = campaigns.flatMap((camp) =>
        (camp.leadsDataParsed || []).map((lead) => ({
          campaignName: camp.name,
          ...lead,
        }))
      );
      setLeadsList(extractedLeads);
    }
  }, []);

  // const handleCall = (phone) => {
  //   alert(`Triggering call to ${phone}`);
  //   // Here you’d integrate with Telnyx or other calling API
  // };
  const handleCall = async (phone) => {
  try {
    const res = await fetch("http://localhost:3000/api/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toNumber: phone }),
    });
    console.log("Response:", res);

    const data = await res.json();
    alert(data.message);
  } catch (err) {
    alert("Call failed");
    console.error(err);
  }
};


  return (
    <div>
      <NavBar />
      <SideBar />
      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row gap-0">
            <div className="col-sm-12">
              <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/manager">Call Tracking</a>
                  </li>
                  <li className="breadcrumb-item active">Leads</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Campaign Leads</h4>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>S.No</th>
                        <th>Campaign Name</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Call</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leadsList.length > 0 ? (
                        leadsList.map((lead, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{lead.campaignName}</td>
                            <td>{lead.name}</td>
                            <td>{lead.email}</td>
                            <td>{lead.phone}</td>
                            <td>{lead.company}</td>
                            <td>
                              <button
                              // src= "/assets/images/call-icon.png"
                                className="btn btn-sm btn-success"
                                onClick={() => handleCall(lead.phone)}
                              >
                                <img src="/assets/images/icons/play.png" alt="Call" style={{ width: "16px", height: "16px" }} />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No leads available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Leads;
