import React from "react";
import UserLayout from "../layout";

function Login() {
  return (
    <UserLayout>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-5">
          <div className="card bg-dark text-white">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign In</h2>
              <p className="text-center mb-4">
                Enter your credentials to get access
              </p>
              <form>
                <div className="mb-3">
                  <label className="form-label" htmlFor="userName">
                    Username:
                  </label>
                  <div className="input-group">
                    <span
                      className="input-group-text d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      placeholder="Username"
                      style={{ height: "40px" }}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="password">
                    Password:
                  </label>
                  <div className="input-group mb-3">
                    <span
                      className="input-group-text d-flex align-items-center justify-content-center"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <i className="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      style={{ height: "40px" }}
                    />
                  </div>
                  <div className="text-end">
                    <a className="text-muted" href="#">
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Login;
