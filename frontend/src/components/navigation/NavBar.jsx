import { Link } from "react-router-dom";

function NavBar() {
  return (
    <ul className="nav nav-tabs nav-underline nav-fill bg-info bg-gradient">
      <Link className="nav-link text-white fw-semibold" to="/expense">
        <li className="nav-item">EXPENSE</li>
      </Link>
      <Link className="nav-link text-white fw-semibold" to="/income">
        <li className="nav-item">INCOME</li>
      </Link>
    </ul>
  );
}

export default NavBar;
