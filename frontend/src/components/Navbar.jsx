import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">

      {/* Left navigation */}
      <div className="navbar-left">

        <NavLink to="/dashboard" className={navClass}>
          Dashboard
        </NavLink>

        <NavLink to="/warehouse" className={navClass}>
          Warehouse
        </NavLink>

        <NavLink to="/location" className={navClass}>
          Location
        </NavLink>

        {/* <NavLink to="/products" className={navClass}>
          Products
        </NavLink> */}

        <NavLink to="/stock" className={navClass}>
          Stock
        </NavLink>

        <NavLink to="/receipts" className={navClass}>
          Receipts
        </NavLink>

        <NavLink to="/deliveries" className={navClass}>
          Deliveries
        </NavLink>

        <NavLink to="/move-history" className={navClass}>
          Move History
        </NavLink>

      </div>

      {/* StockSense Logo / Name */}
      <div className="navbar-brand">
        Stock<span>Sense</span>
      </div>

      {/* Profile / Settings */}
      <NavLink to="/settings" className="profile-button">
        S
      </NavLink>

    </nav>
  );
}

export default Navbar;