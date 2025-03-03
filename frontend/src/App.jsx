import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx"; 
import Dashboard from "./pages/Dashboard.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import "./index.css"


class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* Redirect root path to /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="//create-ticket" element={<CreateTicket />} />
        </Routes>
      </Router>
    );
  }
}

export default App;