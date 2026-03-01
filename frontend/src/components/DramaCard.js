import "../App.css";

export default function DramaCard({ title, image, onClick }) {
  return (
    <>
      <style>
        {`
          .drama-card {
            border-radius: 16px;
            overflow: hidden;
            background: #111;
            color: white;
            transition: 0.4s ease;
            cursor: pointer;
            position: relative;
          }

          .drama-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(212,175,55,0.4);
          }

          .drama-img {
            height: 280px;
            object-fit: cover;
            transition: 0.4s ease;
          }

          .drama-card:hover .drama-img {
            transform: scale(1.1);
            filter: brightness(0.7);
          }

          .drama-title {
            font-size: 15px;
            font-weight: 600;
            padding: 12px;
            text-align: center;
            letter-spacing: 0.5px;
          }

          .drama-card::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, gold, white, gold);
            background-size: 200% auto;
            animation: shineBar 3s linear infinite;
          }

          @keyframes shineBar {
            0% { background-position: 0% }
            100% { background-position: 200% }
          }
        `}
      </style>

      <div className="col-lg-3 col-md-4 col-sm-6 mb-4" onClick={onClick}>
        <div className="card text-center h-100 shadow-lg border-0 drama-card">
          <img src={image} alt={title} className="card-img-top drama-img" />
          <div className="drama-title">{title}</div>
        </div>
      </div>
    </>
  );
}