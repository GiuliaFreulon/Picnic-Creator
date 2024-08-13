import picnicFetch from "../axios/config";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [picnics, setPicnics] = useState(null);

  useEffect(() => {
    const loadPicnics = async () => {
      const res = await picnicFetch.get("/picnics");
      console.log(res);
      setPicnics(res.data);
    };

    loadPicnics();
  }, []);

  if (!picnics) return <p>Carregando...</p>;

  return (
    <div className="home">
      <h1>Seus picnics</h1>
      <div className="picnics-container">
        {picnics.length === 0 && <p>Nenhum picnic encontrado.</p>}
        {picnics.map((picnic) => (
          <div className="picnic" key={picnic._id}>
            <img src={picnic.image} alt={picnic.title} />
            <h3>{picnic.title}</h3>
            <Link to={`/picnic/${picnic._id}`} className="btn-secondary">
              Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
