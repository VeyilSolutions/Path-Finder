"use client";

import React, { useRef, useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "../styles/footer.css";

function TextHoverEffect({ text }) {
  const svgRef = useRef(null);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const cx = ((e.clientX - svgRect.left) / svgRect.width) * 100;
        const cy = ((e.clientY - svgRect.top) / svgRect.height) * 100;
        setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <svg 
      ref={svgRef} 
      viewBox="0 0 300 120" 
      className="footer-svg-text"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <filter id="neonFilter">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <Motion.radialGradient
          id="revealMask"
          r="20%"
          animate={maskPosition}
          transition={{ type: "spring", damping: 25, stiffness: 150 }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </Motion.radialGradient>

        <mask id="textMask">
          <rect width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="svg-base-outline">
        {text}
      </text>

      <text 
        x="50%" y="50%" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        mask="url(#textMask)" 
        className="svg-neon-reveal"
        filter="url(#neonFilter)"
      >
        {text}
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">PATH FINDER</div>
            <p className="brand-description">
              Elevating events with premium management and state-of-the-art digital ecosystems.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/gallery#event-gallery">Our Gallery</Link></li>
              <li><Link to="/contact#contact-form">Work With Us</Link></li>
              <li><a href="/#services-section">Services</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Help & Support</h4>
            <ul className="footer-links">
              <li><a href="/#faq-section">FAQs</a></li>
              <li><Link to="/contact#contact-form">Contact Support</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Get In Touch</h4>
            <div className="contact-info">
              <a href="mailto:hello@pathfinder.com" className="contact-item">
                <Mail size={16} /> <span>hello@pathfinder.com</span>
              </a>
              <a href="tel:+918637373116" className="contact-item">
                <Phone size={16} /> <span>+91 86373 73116</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} /> <span>India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-content">
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><Facebook size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><Instagram size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><Twitter size={18} /></a>
              <a href="https://pathfinder.com" target="_blank" rel="noopener noreferrer" className="social-link"><Globe size={18} /></a>
            </div>
            <p className="copyright">© 2026 PATH FINDER. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </div>

      <div className="bg-text-wrapper">
        <TextHoverEffect text="PATH" />
      </div>
    </footer>
  );
}
