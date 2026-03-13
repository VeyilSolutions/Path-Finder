import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const location = useLocation();

  // Helper to determine if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar-header">
      <div className="navbar-container">
       
        <Link to="/" className="navbar-logo">
          <span className="logo-text">PATH<span className="text-blue">FINDER</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <Link 
            to="/" 
            className={`nav-item ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-item ${isActive("/gallery") ? "active" : ""}`}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className={`nav-item ${isActive("/contact") ? "active" : ""}`}
          >
            Contact
          </Link>
        </nav>

        {/* Action Button */}
        <div className="navbar-actions">
          <Link to="/contact" className="btn-primary">Book Now</Link>
        </div>
      </div>
    </header>
  );
}
