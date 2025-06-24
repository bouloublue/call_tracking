import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for redirection

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // TEMP hardcoded credentials
    if (username === "admin" && password === "admin@123") {
      localStorage.setItem("auth", "true"); // temporary token
      navigate("/"); // redirect after login
    } else {
      setError("Invalid username or password");
    }
  };
  const useDemoCredentials = () => {
    setUsername("admin");
    setPassword("admin@123");
    setError(""); // Clear any previous errors
  };

  return (
    <>
      <div className="container-xxl">
        <div className="row vh-100 d-flex justify-content-center">
          <div className="col-12 align-self-center">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4 mx-auto">
                  <div className="card">
                    <div className="card-body p-0 bg-black auth-header-box rounded-top">
                      <div className="text-center p-3">
                        <a href="index.html" className="logo logo-admin">
                          <img
                            src="assets/images/logo-main.png"
                            height="50"
                            alt="logo"
                            className="auth-logo"
                          />
                        </a>
                        <h4 className="mt-3 mb-1 fw-semibold text-white fs-18">
                          Let's Get Started
                        </h4>
                        <p className="text-muted fw-medium mb-0">
                          Sign in to continue to Call Tracking.
                        </p>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <form
                        className="my-4"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="form-group mb-2">
                          <label className="form-label" htmlFor="username">
                            Username
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label" htmlFor="userpassword">
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        {error && (
                          <div className="text-danger mt-2">{error}</div>
                        )}

                        <div className="form-group mb-0 row">
                          <div className="col-12">
                            <div className="d-grid mt-3">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleLogin}
                              >
                                Log In{" "}
                                <i className="fas fa-sign-in-alt ms-1"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>

                      {/* <div className="text-center mb-2">
                        <p className="text-muted">
                          Don't have an account ?{" "}
                          <a href="/register" className="text-primary ms-2">
                            Register
                          </a>
                        </p>
                      </div> */}
                      <hr />
                      <div className="text-center">
                        <p className="mb-4">Demo account login credentials</p>
                        <table
                          className="table table-bordered"
                          style={{
                            width: "80%",
                            margin: "0 auto",
                            borderCollapse: "collapse",
                          }}
                        >
                          <thead>
                            <tr>
                              <th>Details</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                Admin
                                <br />
                                <strong>Username:</strong> admin
                                <br />
                                <strong>Password:</strong> admin@123
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary" onClick={useDemoCredentials}>
                                  Use
                                </button>
                              </td>
                            </tr>
                             <tr>
                              <td>
                                Manager
                                <br />
                                <strong>Username:</strong> manager
                                <br />
                                <strong>Password:</strong> manager@123
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary" onClick={useDemoCredentials}>
                                  Use
                                </button>
                              </td>
                            </tr>
                             <tr>
                              <td>
                                Member
                                <br />
                                <strong>Username:</strong> member
                                <br />
                                <strong>Password:</strong> member@123
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary" onClick={useDemoCredentials}>
                                  Use
                                </button>
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
