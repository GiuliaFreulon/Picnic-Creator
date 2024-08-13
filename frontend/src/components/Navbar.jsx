import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav id="navbar">
      <h2>Picnic Creator</h2>
      <ul>
        <li>
          <NavLink to="/">Meus picnics</NavLink>
        </li>
        <li>
          <NavLink to="/picnic/new" className="btn">
            Criar picnic
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
