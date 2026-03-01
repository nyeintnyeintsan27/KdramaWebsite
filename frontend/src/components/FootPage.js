import {FaFacebook,FaInstagram, FaYoutube, FaTiktok, FaPhone, FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";
import { Link } from "react-router-dom";
import privacyFile from "../assets/privacy.pdf";
import termsFile from "../assets/terms.pdf";

export default function FootPage() {
  return (
    <>
      <style>
        {`
          @keyframes shine {
            0% { background-position: -200%; }
            100% { background-position: 200%; }
          }

          @keyframes glow {
            0% { text-shadow: 0 0 5px gold; }
            50% { text-shadow: 0 0 20px gold; }
            100% { text-shadow: 0 0 5px gold; }
          }

          .bling-footer {
            background: linear-gradient(
              90deg,
              #000000,
              #111111,
              #d4af37,
              #000000
            );
            background-size: 200% auto;
            animation: shine 10s linear infinite;
            color: gold;
            padding: 60px 0 20px 0;
            box-shadow: 0 -5px 40px rgba(212,175,55,0.7);
          }

          .footer-title {
            font-weight: bold;
            letter-spacing: 3px;
            animation: glow 2s infinite;
            margin-bottom: 20px;
          }

          .footer-heading {
            font-weight: bold;
            margin-bottom: 15px;
            font-size: 18px;
          }

          .footer-link {
            display: block;
            color: gold;
            text-decoration: none;
            margin-bottom: 8px;
            transition: 0.3s ease;
          }

          .footer-link:hover {
            color: white;
            transform: translateX(5px);
          }

          .contact-info p {
            margin-bottom: 8px;
            font-size: 14px;
          }

          .social-icons a {
            color: gold;
            font-size: 22px;
            margin-right: 15px;
            transition: 0.3s ease;
          }

          .social-icons a:hover {
            color: white;
            transform: scale(1.2);
            text-shadow: 0 0 15px gold;
          }

          .footer-bottom {
            border-top: 1px solid rgba(255, 215, 0, 0.3);
            margin-top: 30px;
            padding-top: 15px;
            text-align: center;
            font-size: 14px;
          }
        `}
      </style>

      <footer className="bling-footer">
        <div className="container">
          <div className="row text-center text-md-start">
            <div className="col-md-4 mb-4">
              <h5 className="footer-title">KDrama World</h5>
              <p>
                Discover trending romance, horror, fantasy,
                thriller and emotional K-Dramas all in one place. 🎬✨
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h6 className="footer-heading">Quick Links</h6>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/drama" className="footer-link">Drama</Link>
              <Link to="/upcoming" className="footer-link">Upcoming</Link>
              <a href={privacyFile} target="_blank" rel="noopener noreferrer" className="footer-link">Privacy Policy </a>
              <a href={termsFile} target="_blank" rel="noopener noreferrer" className="footer-link"
              > Terms & Conditions</a>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="footer-heading">Contact Us</h6>
              <div className="contact-info">
                <p><FaMapMarkerAlt /> Yangon, Myanmar</p>
                <p><FaPhone /> +95 9 799 554 645</p>
                <p><FaEnvelope /> nyeintsan2152@gmail.com</p>
              </div>

              <div className="social-icons mt-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            © 2026 All Rights Reserved | Made with ❤️ for Drama Lovers
          </div>

        </div>
      </footer>
    </>
  );
}