import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="planning">PLANNING</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
