import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      {/* Left navigation */}
      <div className="navbar-left">

        <button className="nav-link active">
          Dashboard
        </button>

        <button className="nav-link">
          Operations
        </button>

        <button className="nav-link">
          Stock
        </button>

        <button className="nav-link">
          Move History
        </button>

        <button className="nav-link">
          Settings
        </button>

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