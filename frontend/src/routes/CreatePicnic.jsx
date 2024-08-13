import picnicFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "../hook/useToast";
import "./Form.css";

const CreatePicnic = () => {
  const [services, setServices] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);
  const [image, setImage] = useState("");
  const [picnicServices, setPicnicServices] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadServices = async () => {
      const res = await picnicFetch.get("/services");
      setServices(res.data);
    };

    loadServices();
  }, []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setPicnicServices((services) => [...services, filteredService[0]]);
    } else {
      setPicnicServices((services) => services.filter((s) => s._id !== value));
    }
  };

  const createPicnic = async (e) => {
    e.preventDefault();

    try {
      const picnic = {
        title,
        author,
        description,
        budget,
        image,
        services: picnicServices,
      };
      const res = await picnicFetch.post("/picnics", picnic);

      if (res.status === 201) {
        navigate("/");
        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg, "error");
    }
  };

  return (
    <div className="form-page">
      <h2>Crie seu Picnic</h2>
      <p>Defina o seu orçamento e escolha os serviços contratados:</p>
      <form onSubmit={(e) => createPicnic(e)}>
        <label>
          <span>Nome do picnic:</span>
          <input
            type="text"
            placeholder="Escolha um bom nome para seu picnic"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Criador:</span>
          <input
            type="text"
            placeholder="Quem está fazendo o picnic?"
            required
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
          />
        </label>
        <label>
          <span>Descrição:</span>
          <textarea
            placeholder="Fale mais sobre seu picnic..."
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input
            type="number"
            required
            onChange={(e) => setBudget(e.target.value)}
            value={budget}
          />
        </label>
        <label>
          <span>Imagem:</span>
          <input
            type="text"
            placeholder="Copie o URL da imagem"
            required
            onChange={(e) => setImage(e.target.value)}
            value={image}
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
                    />
                    <p>Marque para solicitar</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <input type="submit" value="Criar picnic" className="btn" />
      </form>
    </div>
  );
};

export default CreatePicnic;
