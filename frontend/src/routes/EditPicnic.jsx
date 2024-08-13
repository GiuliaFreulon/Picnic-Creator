import picnicFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hook/useToast";
import "./Form.css";

const EditPicnic = () => {
  const { id } = useParams();
  const [picnic, setPicnic] = useState(null);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadServices = async () => {
      const res = await picnicFetch.get("/services");
      setServices(res.data);
      loadPicnic();
    };

    const loadPicnic = async () => {
      const res = await picnicFetch.get(`/picnics/${id}`);
      setPicnic(res.data);
    };

    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value);
    let picnicServices = picnic.services;

    if (checked) {
      picnicServices = [...picnicServices, filteredService[0]];
    } else {
      picnicServices = picnicServices.filter((s) => s._id !== value);
    }

    setPicnic({ ...picnic, services: picnicServices });
  };

  const updatePicnic = async (e) => {
    e.preventDefault();

    try {
      const res = await picnicFetch.put(`/picnics/${picnic._id}`, picnic);

      if (res.status === 200) {
        navigate(`/picnic/${id}`);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  if (!picnic) return <p>Carregando...</p>;
  return (
    <div className="form-page">
      <h2>Editando: {picnic.title}</h2>
      <p>Ajuste as informações do seu picnic:</p>
      <form onSubmit={(e) => updatePicnic(e)}>
        <label>
          <span>Nome do picnic:</span>
          <input
            type="text"
            required
            onChange={(e) => setPicnic({ ...picnic, title: e.target.value })}
            value={picnic.title}
          />
        </label>
        <label>
          <span>Criador:</span>
          <input
            type="text"
            required
            onChange={(e) => setPicnic({ ...picnic, author: e.target.value })}
            value={picnic.author}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            required
            onChange={(e) =>
              setPicnic({ ...picnic, description: e.target.value })
            }
            value={picnic.description}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            required
            onChange={(e) => setPicnic({ ...picnic, budget: e.target.value })}
            value={picnic.budget}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            required
            onChange={(e) => setPicnic({ ...picnic, image: e.target.value })}
            value={picnic.image}
          />
        </label>
        <div>
          <h2>Escolha os serviços desejados:</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length > 0 &&
              services.map((service) => (
                <div className="service" key={service._id}>
                  <img src={service.image} alt={service.name} />
                  <p className="service-name">{service.name}</p>
                  <p className="service-price">R${service.price}</p>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      value={service._id}
                      onChange={(e) => handleServices(e)}
                      checked={
                        picnic.services.find(
                          (picnicService) => picnicService._id === service._id
                        ) || ""
                      }
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Editar picnic" className="btn" />
      </form>
    </div>
  );
};

export default EditPicnic;
