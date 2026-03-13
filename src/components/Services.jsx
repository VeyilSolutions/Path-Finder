import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import "../styles/services.css";

const services = [
  {
    id: 1,
    title: "Award Shows",
    description: "High-stakes production management from red carpet logistics and stage design to live broadcast support.",
    image: "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Music Festivals",
    description: "End-to-end management for large-scale events, stage construction, and immersive lighting shows.",
    image: "https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Stage Design",
    description: "Advanced LED mapping, architectural lighting, and custom-built structures for visual impact.",
    image: "https://plus.unsplash.com/premium_photo-1714618976010-a5b5c6dc1d32?q=80&w=821&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "Social Galas",
    description: "Elite celebrations blending luxury décor with professional management for VIP experiences.",
    image: "https://images.unsplash.com/photo-1578490343589-ec110a8694b5?q=80&w=828&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Services() {
  return (
    <section id="services-section" className="services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Event Excellence</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Motion.div
              key={service.id}
              className="service-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="service-image">
                <img src={service.image} alt={service.title} />
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <Link to="/contact#contact-form" className="service-link">
                Enquire Now
              </Link>
            </Motion.div>
          ))}
        </div>

        <div className="services-cta">
          <Link to="/contact" className="btn1 btn1-primary">
            Plan Your Event
          </Link>
        </div>
      </div>
    </section>
  );
}
