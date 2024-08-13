import picnicFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";
import "./Picnic.css";

const Picnic = () => {
  const { id } = useParams();
  const [picnic, setPicnic] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const loadPicnic = async () => {
      const res = await picnicFetch.get(`/picnics/${id}`);
      setPicnic(res.data);
    };

    loadPicnic();
  }, []);

  const handleDelete = async () => {
    const res = await picnicFetch.delete(`/picnics/${id}`);

    if (res.status === 200) {
      navigate("/");
      useToast(res.data.msg);
    }
  };

  if (!picnic) return <p>Carregando...</p>;
  return (
    <div className="picnic">
      <h1>{picnic.title}</h1>
      <div className="actions-container">
        <Link to={`/picnic/edit/${picnic._id}`} className="btn">
          Editar
        </Link>
        <button onClick={handleDelete} className="btn-secondary">
          Excluir
        </button>
      </div>
      <p>Orçamento: R${picnic.budget}</p>
      <h3>Serviços contratados:</h3>
      <div className="services-container">
        {picnic.services.map((service) => (
          <div className="service" key={service.id}>
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Picnic;
