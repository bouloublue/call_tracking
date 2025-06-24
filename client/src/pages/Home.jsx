import React, { useState } from "react";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Chart16 from "../components/charts/Chart16";
import Chart6 from "../components/charts/Chart6";

function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };
  return (
    <div>
      <NavBar onToggleMenu={handleToggleMenu}/>

      <SideBar isMenuOpen={isMenuOpen} />

      <div className="page-title-box">
        <div className="container-fluid">
          <div className="row gap-0">
            <div className="col-sm-12">
              <div className="page-title-content d-sm-flex justify-content-sm-between align-items-center">
                <div className="">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="/">Call Tracking</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="text-primary  position-relative ">
                            <i className="iconoir-dollar-circle fs-28"></i>
                            <span className="s-box bg-primary-subtle"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-2 text-truncate">
                          <h6 className="text-dark mb-0 fw-semibold fs-20">
                            4
                          </h6>
                          <p className="text-muted mb-0 fw-medium fs-13">
                            Active Campaigns
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="text-success  position-relative ">
                            <i className="iconoir-cart fs-28"></i>
                            <span className="s-box bg-success-subtle"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-2 text-truncate">
                          <h6 className="text-dark mb-0 fw-semibold fs-20">
                            12
                          </h6>
                          <p className="text-muted mb-0 fw-medium fs-13">
                            Total Follow Up
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="text-warning  position-relative ">
                            <i className="iconoir-percentage-circle fs-28"></i>
                            <span className="s-box bg-warning-subtle"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-2 text-truncate">
                          <h6 className="text-dark mb-0 fw-semibold fs-20">
                            60
                          </h6>
                          <p className="text-muted mb-0 fw-medium fs-13">
                            Call made
                          </p>
                        </div>
                      </div>
                      {/* <div className="align-self-center">
                                        <span className="badge bg-danger-subtle text-danger border border-danger px-2">0.7%</span>
                                    </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-lg-3">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <div className="text-pink  position-relative ">
                            <i className="iconoir-hexagon-dice fs-28"></i>
                            <span className="s-box bg-pink-subtle"></span>
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-2 text-truncate">
                          <h6 className="text-dark mb-0 fw-semibold fs-20">
                            4 H, 42 M, 30 S
                          </h6>
                          <p className="text-muted mb-0 fw-medium fs-13">
                            Total Duration
                          </p>
                        </div>
                      </div>
                      {/* <div className="align-self-center">
                                        <span className="badge bg-success-subtle text-success border border-success px-2">1.9%</span>
                                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="card-title">
                          Active Actioned Campaigns
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="row">
                      <div className="card-body pt-0">
                        <Chart16 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="card-title">Call Made</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <Chart6 />
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col">
                        <h4 className="card-title">Agent Booking</h4>
                      </div>
                    </div>
                  </div>
                  <div className="card-body pt-0">
                    <div className="table-responsive">
                      <table className="table mb-0 table-striped">
                        <thead className="">
                          <tr>
                            <th className="border-top-0">Campaign Name</th>
                            <th className="border-top-0">Agent</th>
                            <th className="border-top-0">Booking Time</th>
                            <th className="border-top-0 text-end">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> Website Development Campaign</td>
                            <td> Ricardo Hodkiewicz</td>
                            <td>16-06-2025 09:56 am</td>
                            <td className="text-end">
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Edit"
                              >
                                <i className="iconoir-edit text-secondary fs-18"></i>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Delete"
                              >
                                <i className="iconoir-xmark-circle text-secondary fs-18"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Social Media Campaign</td>
                            <td>Dr. Nash Lebsack</td>
                            <td>18-06-2025 12:20 am</td>
                            <td className="text-end">
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Edit"
                              >
                                <i className="iconoir-edit text-secondary fs-18"></i>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Delete"
                              >
                                <i className="iconoir-xmark-circle text-secondary fs-18"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Social Media Campaign</td>
                            <td>Prof. Gonzalo Upton</td>
                            <td>20-06-2025 08:05 am</td>
                            <td className="text-end">
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Edit"
                              >
                                <i className="iconoir-edit text-secondary fs-18"></i>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Delete"
                              >
                                <i className="iconoir-xmark-circle text-secondary fs-18"></i>
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Social Media Campaign</td>
                            <td>Marian Friesen V</td>
                            <td>17-06-2025 05:46 pm</td>
                            <td className="text-end">
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Edit"
                              >
                                <i className="iconoir-edit text-secondary fs-18"></i>
                              </a>
                              <a
                                href="#"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Delete"
                              >
                                <i className="iconoir-xmark-circle text-secondary fs-18"></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="endbar-overlay d-print-none"></div>

          <footer className="footer text-center text-sm-start d-print-none">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 px-0">
                  <div className="card mb-0 rounded-bottom-0 border-0">
                    <div className="card-body">
                      <p className="text-muted mb-0">©2025 Call Tracking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Home;
