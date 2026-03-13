import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Essential for hash detection
import { Phone, Mail, MapPin } from "lucide-react";
import "../styles/contact.css";
import Connect from "../components/Connect"; 
import "../styles/global.css";
import "../styles/connect.css";

export default function Contact() {
  const { hash } = useLocation(); // Listen for changes in the URL hash

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- AUTOMATIC SCROLL TO FORM LOGIC ---
  useEffect(() => {
    if (hash === "#contact-form") {
      const element = document.getElementById("contact-form");
      if (element) {
        // Adding a slight delay ensures the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      // If no hash, go to top
      window.scrollTo(0, 0);
    }
  }, [hash]); 

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "10 digits required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mpqjbleo", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <section 
        id="contact-form" 
        className="contact-section"
        style={{ background: "radial-gradient(circle at top right, #1c1c2e, #0f0f14)" }}
      >
        <div className="contact-container">
          <div className="contact-header">
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle">Let's Chat</p>
          </div>

          <div className="contact-grid">
            {/* LEFT SIDE INFO */}
            <div className="contact-info">
              <div className="info-card glass-card">
                <div className="info-header">
                  <Phone className="info-icon" />
                  <h4>Call Us</h4>
                </div>
                <p>+91 9876543210</p>
              </div>

              <div className="info-card glass-card">
                <div className="info-header">
                  <Mail className="info-icon" />
                  <h4>Email</h4>
                </div>
                <p>info@pathfinder.com</p>
              </div>

              <div className="info-card glass-card">
                <div className="info-header">
                  <MapPin className="info-icon" />
                  <h4>Location</h4>
                </div>
                <p>Salem, Tamil Nadu</p>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <form onSubmit={handleSubmit} className="contact-form glass-card">
              {isSuccess && (
                <div className="success-message">🎉 Sent Successfully!</div>
              )}

              <h3 className="form-title">Get Started</h3>
              <p className="form-subtext">Send us a quick message.</p>

              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="input-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Connect />
    </>
  );
}
