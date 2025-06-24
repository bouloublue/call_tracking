import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const campaigns = [
  {
    title: "Sell Home Loan Campaign",
    members: 3,
    progress: 60,
    remaining: "23/38",
    actionBy: "Admin",
    startDate: "16-05-2025 03:57 am",
  },
  {
    title: "Social Media Campaign",
    members: 5,
    progress: 75,
    remaining: "74/98",
    actionBy: "Admin",
    startDate: "10-06-2025 02:34 pm",
  },
  {
    title: "Website Development Campaign",
    members: 3,
    progress: 85,
    remaining: "71/83",
    actionBy: "Member",
    startDate: "19-05-2025 07:27 pm",
  },
  {
    title: "Job Applications",
    members: 3,
    progress: 45,
    remaining: "16/35",
    actionBy: "Admin",
    startDate: "16-05-2025 04:28 pm",
  },
  {
    title: "Make New Mobile Application",
    members: 5,
    progress: 6,
    remaining: "6/99",
    actionBy: "Admin",
    startDate: "18-05-2025 04:49 am",
  },
  {
    title: "Real Estate",
    members: 3,
    progress: null,
    remaining: null,
    actionBy: "Manager",
    startDate: "17-06-2025 05:33 am",
  },
];

function CampaignOverview() {
  return (
    <div>
      <NavBar />
      <SideBar />
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
                    <li className="breadcrumb-item active">
                      Campaign Overview
                    </li>
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
            {/* Heading Row */}

            {/* Campaign Cards */}
            <div className="row">
              {campaigns.map((camp, idx) => (
                <div key={idx} className="col-xl-4 col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title fw-semibold mb-3">
                        {camp.title}
                      </h5>

                      <div className="mb-3">
                        <span className="text-muted">Members </span>
                        {Array(camp.members)
                          .fill(0)
                          .map((_, i) => (
                            <span
                              key={i}
                              className="d-inline-block me-1"
                              style={{ fontSize: "20px" }}
                            >
                              👤
                            </span>
                          ))}
                      </div>

                      {camp.progress !== null ? (
                        <>
                          <div className="mb-3">
                            <div className="d-flex align-items-center">
                              <span className="text-muted me-2">Progress</span>
                              <div
                                className="progress flex-grow-1"
                                style={{ height: "8px" }}
                              >
                                <div
                                  className="progress-bar"
                                  style={{ width: `${camp.progress}%` }}
                                  role="progressbar"
                                ></div>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-muted">
                                Remaining Leads{" "}
                              </span>
                              <span>{camp.remaining}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="mb-3">
                          <p className="text-primary">
                            <strong>+ Add New Lead</strong>
                          </p>
                        </div>
                      )}

                      <div className="mb-3">
                        <div>
                          <span className="text-muted">Last Actioner </span>
                          <span>{camp.actionBy}</span>
                        </div>
                        <div className="mt-1">
                          <span className="text-muted">Started On </span>
                          <span>{camp.startDate}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="d-flex">
                            <img
                              src="assets/images/icons/resume.png"
                              alt="Avatar"
                              className="rounded-circle me-2 mt-5"
                              style={{ width: "20px", height: "20px" }}
                            />
                          <span className="text-muted me-3 mt-5">Resume</span>
                            <img
                                src="assets/images/icons/stop.png"
                                alt="Stop Icon"
                                className="me-2 mt-5"
                                style={{ width: "20px", height: "20px" }}
                            />
                          <span className="text-muted mt-5">Stop</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignOverview;
