import { useEffect, useMemo, useState } from "react";
import logo from"../assets/images/World.png";
import AdminLogin from "../components/AdminLogin";
import goblin from "../assets/images/goblin.jpg";
import newtopia from "../assets/images/newtopia.webp";
import allofusaredead from "../assets/images/allofusaredead.webp";
import kingdom from "../assets/images/kingdom.jpg";
import DramaCard from "../components/DramaCard";
import dynamickiss from "../assets/images/dynamickiss.webp";
import souls from "../assets/images/alchemyofsouls1.jpg";
import soulstwo from "../assets/images/alchemyofsouls2.jpg";
import queen from "../assets/images/queenoftear.webp";
import exhuma from "../assets/images/exhuma.webp";
import nighthascome from "../assets/images/nighthascome.webp";
import businesspropo from "../assets/images/businessproposal.jpg";
import hospitalplay from "../assets/images/hospitalplaylist.jpg";
import bonappetit from "../assets/images/bonappetit.webp";
import taxidriver from "../assets/images/taxidriver.webp";
import undercover from "../assets/images/undercover.webp";

export default function Home({onAdminLoginClick}) {
  /* ================= THEME (DARK / LIGHT) ================= */

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  /* ================= FEATURED ================= */

  const featuredList = useMemo(() => [
    {
      title: "Queen of Tears",
      description:
        "A powerful love story filled with emotion and unforgettable moments.",
      image: queen,
      trailer: "https://www.youtube.com/embed/Gg2D8zrzlOA"
    },
    {
      title: "Goblin",
      description:
        "Fantasy romance drama with deep emotional storytelling.",
      image: goblin,
      trailer: "https://www.youtube.com/embed/S94ukM8C17A"
    },
    {
      title: "Exhuma",
      description:
        "A thrilling horror mystery drama that keeps you on edge.",
      image: exhuma,
      trailer: "https://www.youtube.com/embed/7oE2DZsjATg"
    }
  ], []);

  const [featured, setFeatured] = useState(featuredList[0]);
  const [showModal, setShowModal] = useState(false);

  /* ================= AUTO CHANGE ================= */

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        featuredList[Math.floor(Math.random() * featuredList.length)];
      setFeatured(random);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredList]);

  /* ================= DATA ================= */

  const horror = [
    { title: "Newtopia", year: "2024", image: newtopia },
    { title: "Exhuma", year: "2024", image: exhuma },
    { title: "Night Has Come", year: "2016", image: nighthascome },
    { title: "Squid Game", year: "2016", image: allofusaredead },
    { title: "Kingdom", year: "2016", image: kingdom },
  ];

  const popular = [
    { title: "Alchemy of Souls", year: "2024", image: souls },
    { title: "Undercover High School", year: "2024", image: undercover },
    { title: "Alchemy of Souls 2", year: "2016", image: soulstwo },
    { title: "Bon Appetit", year: "2016", image: bonappetit },
    { title: "Taxi Driver", year: "2016", image: taxidriver },
  ];

  const romance = [
    { title: "Queen of Tears", year: "2024", image: queen },
    { title: "Hospital Playlist", year: "2024", image: hospitalplay },
    { title: "Goblin", year: "2016", image: goblin },
    { title: "Dynamic Kiss", year: "2016", image: dynamickiss },
    { title: "Business Proposal", year: "2016", image: businesspropo },
  ];

  /* ================= ADMIN MODAL STATE ================= */
  const [showAdminModal, setShowAdminModal] = useState(false);

  return (
    <div className="container py-4">
{/* ================= THEME BUTTON (TOP RIGHT) ================= */}

      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-sm btn-warning rounded-pill"
          onClick={toggleTheme}
        >

          {theme === "dark" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>
      {/* ==== WELCOME SECTION ==== */}
        <div className="text-center mb-4">

          <img
            src={logo}
            alt="Logo"
            style={{
              width: "260px",
              height: "260px",
              objectFit: "contain"
            }}
            className="mb-3 rounded-4"
          />

          <h2 className="fw-bold">
            🌍 Welcome To Our Website
          </h2>

          <p style={{color: "var(--text-color)",opacity: 0.7,transition: "0.3s ease"}}>
            Thank you very much for visiting our website. We truly appreciate your time and support.
            Here, we carefully collect and present a wide variety of K-Drama content for you to explore and enjoy. No matter what genre you love — whether it is romance, horror, fantasy, thriller, comedy, or emotional family stories — you can find different types of dramas displayed in one place.

            We continuously update our collection with new and popular dramas to make sure you always have fresh content to watch. Our goal is to provide an easy, simple, and enjoyable experience for drama lovers who want to discover great stories anytime. 🎬✨
          </p>

        </div>

      <style>
        {`
          :root[data-theme="dark"] {
            --bg-color: #111;
            --text-color: #fff;
          }

          :root[data-theme="light"] {
            --bg-color: #f4f4f4;
            --text-color: #000;
          }

          body {
            background: var(--bg-color);
            color: var(--text-color);
            transition: 0.4s ease;
          }
        `}
      </style>

      {/* ==== FEATURED HERO ==== */}

      <div
        className="mb-5 p-5 rounded-4 text-white position-relative overflow-hidden"
        style={{
          backgroundImage: `url(${featured.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "500px",
        }}
      >

        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(15px)",
          }}
        />

        <div className="position-relative d-flex flex-column justify-content-center h-100">

          <h1 className="fw-bold display-4">
            {featured.title}
          </h1>

          <p className="fs-5 mt-3 w-50">
            {featured.description}
          </p>

          <div className="mt-4">
            <button
              className="btn btn-danger px-4 py-2 fw-bold rounded-pill me-3"
              onClick={() => setShowModal(true)}
            >
              ▶ Watch Trailer
            </button>

            <button className="btn btn-outline-light px-4 py-2 rounded-pill">
              💖 Add to List
            </button>
          </div>

        </div>
      </div>

      {/* ==== TRAILER MODAL ==== */}

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.85)", zIndex: 9999 }}
          onClick={() => setShowModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <iframe
              width="800"
              height="450"
              src={featured.trailer}
              title="Trailer"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* ==== SECTIONS ==== */}

      <div className="mb-5">
        <h3 className="fw-bold mb-3">🔥 Popular Dramas</h3>
        <div className="row">
          {popular.map((drama, index) => (
            <DramaCard key={index} {...drama} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold mb-3">👻 Horror Dramas</h3>
        <div className="row">
          {horror.map((drama, index) => (
            <DramaCard key={index} {...drama} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h3 className="fw-bold mb-3">❤️ Romance Dramas</h3>
        <div className="row">
          {romance.map((drama, index) => (
            <DramaCard key={index} {...drama} />
          ))}
        </div>
      </div>
      {/* ==== ADMIN LOGIN MODAL ==== */}
      {showAdminModal && <AdminLogin onClose={() => setShowAdminModal(false)} />}
    </div>
  );
}