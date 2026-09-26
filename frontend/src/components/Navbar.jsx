
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Left navigation */}
      <div className="navbar-left">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/warehouse"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Operations
        </NavLink>

        {/* <NavLink
          to="/product"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Product
        </NavLink> */}

        <NavLink
          to="/stock"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Stock
        </NavLink>

      </div>

      {/* StockSense Logo / Name */}
      <div className="navbar-brand">
        Stock<span>Sense</span>
      </div>

      {/* Profile */}
      <button className="profile-button">
        S
      </button>

    </nav>
  );
}

export default Navbar;
