import { Link } from "react-router-dom";

export default function Navbar({ onAdminLoginClick }) {
  return (
    <>
      <style>
        {`
          @keyframes shine {
            0% { background-position: -200%; }
            100% { background-position: 200%; }
          }
          .bling-navbar {
            background: linear-gradient(90deg,#ebc23e,#fff3a0,#deba45);
            background-size: 200% auto;
            animation: shine 15s linear infinite;
            box-shadow: 0 5px 25px rgba(212,175,55,0.6);
          }
          .bling-navbar .nav-btn {
            color: black;
            font-weight: 600;
            background: white;
            border-radius: 30px;
            transition: 0.3s ease;
          }
          .bling-navbar .nav-btn:hover {
            transform: scale(1.1);
            background: black;
            color: gold;
            box-shadow: 0 0 15px gold;
          }
          .brand-text {
            font-weight: bold;
            letter-spacing: 2px;
            font-size: 20px;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg bling-navbar py-3">
        <div className="container">
          <Link className="navbar-brand text-dark brand-text" to="/">Kdrama World</Link>
          <div>
            <Link className="btn nav-btn me-2 px-3" to="/">Home</Link>
            <Link className="btn nav-btn me-2 px-3" to="/upcoming">Upcoming</Link>
            <Link className="btn nav-btn me-2 px-3" to="/movies">Movie</Link>
            <button className="btn nav-btn ms-2 px-3" onClick={onAdminLoginClick}>Admin Login</button>
          </div>
        </div>
      </nav>
    </>
  );
}