import React, { Component } from "react";
import axios from "axios";
import withRouter from "../utils/withRouter";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    role: "user", // Default role is "user"
    error: "", // For error messages
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, role } = this.state;

    try {
      // Send signup request to the backend
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        username,
        password,
        role,
      });

      // Redirect to login page after successful signup
      this.props.navigate("/login");
    } catch (err) {
      // Handle error
      if (err.response && err.response.status === 400) {
        this.setState({ error: err.response.data.error || "Invalid input" });
      } else {
        this.setState({ error: "An error occurred. Please try again." });
      }
      console.error(err);
    }
  };

  render() {
    const { username, password, role, error } = this.state;

    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-4 rounded shadow-sm w-25"
        >
          <h2 className="h3 mb-4 text-center">Signup</h2>

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

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Role</label>
            <select
              value={role}
              onChange={(e) => this.setState({ role: e.target.value })}
              className="form-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Signup
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);