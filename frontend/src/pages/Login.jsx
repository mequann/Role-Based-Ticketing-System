import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setCredentials } from "../store/authSlice";
import withRouter from "../utils/withRouter";
import { Link } from "react-router-dom"; // Import Link for navigation

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: "", // Add error state
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      // Save token and user data in Redux store
      this.props.setCredentials({ user: res.data.user, token: res.data.token });

      // Redirect to dashboard
      this.props.navigate("/dashboard");
    } catch (err) {
      // Handle error
      if (err.response && err.response.status === 400) {
        this.setState({ error: "Invalid username or password" });
      } else {
        this.setState({ error: "An error occurred. Please try again." });
      }
      console.error(err);
    }
  };

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-4 rounded shadow-sm w-25"
        >
          <h2 className="h3 mb-4 text-center">Login</h2>

          {/* Display error message */}
          {error && (
            <div className="mb-4 p-2 bg-danger text-white rounded">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

          {/* Add a button to redirect to the signup page */}
          <div className="mt-3 text-center">
            <span className="text-muted">Don't have an account? </span>
            <Link to="/signup" className="text-primary">
              Signup
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { setCredentials })(withRouter(Login));