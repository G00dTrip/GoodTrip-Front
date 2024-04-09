import "./header.css";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token }) => {
  const navigate = useNavigate();

  // console.log("token -->", token);

  return (
    <header>
      <h1>GOODTRIP</h1>
      <nav>
        <ul className="menu">
          <li>
            <Link className="link" to="/">
              Accueil
            </Link>
          </li>
          <li>
            <Link className="link" to="newTravel">
              Planifier un voyage
            </Link>
          </li>
          <li>
            <Link className="link" to="Planning">
              Mes voyages
            </Link>
          </li>
          <li>
            <Link className="link" to="Idea">
              Idées de voyages
            </Link>
          </li>
          <li>
            <Link className="link" to="Infos">
              Qui sommes-nous ?
            </Link>
          </li>
          <li>
            {token ? (
              <li
                class="pointer"
                onClick={() => {
                  Cookies.remove("userToken");
                  navigate("/");
                }}
              >
                Se déconnecter
              </li>
            ) : (
              <Link className="link" to="SignIn">
                Connexion / Inscription
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
