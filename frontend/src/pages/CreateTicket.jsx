import React, { Component } from "react";
import axios from "axios";
import withRouter from "../utils/withRouter";
import { connect } from "react-redux";

class CreateTicket extends Component {
  state = {
    title: "",
    description: "",
    error: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { title, description } = this.state;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tickets",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${this.props.token ? this.props.token.trim() : ""}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Redirect to dashboard after creating the ticket
      this.props.navigate("/dashboard");
    } catch (err) {
      console.error("Error creating ticket:", err.response || err);
      this.setState({ error: "Failed to create ticket" });
    }
  };

  render() {
    const { title, description, error } = this.state;

    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
        <form
          onSubmit={this.handleSubmit}
          className="bg-white p-4 rounded shadow w-50"
        >
          <h2 className="h4 mb-4 text-center">Create Ticket</h2>

          {/* Display error message */}
          {error && (
            <div className="mb-4 p-2 bg-danger text-white rounded">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => this.setState({ title: e.target.value })}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => this.setState({ description: e.target.value })}
              className="form-control"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Create Ticket
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  token: state.auth.token,
});

export default connect(mapStateToProps)(withRouter(CreateTicket));