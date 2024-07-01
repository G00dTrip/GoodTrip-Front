import "./header.css";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  // console.log("token -->", token);

  return (
    <header>
      <h1></h1>
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
            <Link className="link" to="myTravels">
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
              <div
                className="pointer"
                onClick={() => {
                  Cookies.remove("userToken");
                  setToken("");
                  navigate("/");
                }}
              >
                Se déconnecter
              </div>
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
