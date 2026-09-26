import "./Warehouse.css";

function Warehouse() {
  return (
    <div className="warehouse-page">

      {/* Background effects */}
      <div className="warehouse-glow warehouse-glow-one"></div>
      <div className="warehouse-glow warehouse-glow-two"></div>

      <main className="warehouse-content">

        {/* Header */}
        <div className="warehouse-header">

          <div>
            <span className="warehouse-eyebrow">
              INVENTORY STRUCTURE
            </span>

            <h1>Warehouse</h1>

            <p>
              Manage warehouses and their inventory locations.
            </p>
          </div>

          <button className="warehouse-add-button">
            <span>+</span>
            Add Warehouse
          </button>

        </div>


        {/* Main layout */}
        <div className="warehouse-layout">

          {/* Warehouse list */}
          <section className="warehouse-list-card">

            <div className="section-header">

              <div>
                <h2>Warehouses</h2>

                <p>
                  Your available storage facilities
                </p>
              </div>

              <span className="section-count">
                —
              </span>

            </div>


            {/* Backend data will appear here */}
            <div className="warehouse-list">

              <div className="warehouse-empty">

                <div className="warehouse-empty-icon">
                  +
                </div>

                <h3>
                  No warehouses available
                </h3>

                <p>
                  Warehouse records will appear here once connected to the backend.
                </p>

              </div>

            </div>

          </section>


          {/* Add warehouse form */}
          <section className="warehouse-form-card">

            <div className="section-header">

              <div>
                <span className="form-eyebrow">
                  NEW WAREHOUSE
                </span>

                <h2>Add Warehouse</h2>

                <p>
                  Create a new warehouse location.
                </p>
              </div>

            </div>


            <form className="warehouse-form">

              {/* Name */}
              <div className="form-field">

                <label htmlFor="warehouse-name">
                  Warehouse Name
                </label>

                <input
                  id="warehouse-name"
                  type="text"
                  placeholder="Enter warehouse name"
                />

              </div>


              {/* Short Code */}
              <div className="form-field">

                <label htmlFor="warehouse-code">
                  Short Code
                </label>

                <input
                  id="warehouse-code"
                  type="text"
                  placeholder="Enter short code"
                />

              </div>


              {/* Address */}
              <div className="form-field">

                <label htmlFor="warehouse-address">
                  Address
                </label>

                <textarea
                  id="warehouse-address"
                  placeholder="Enter warehouse address"
                  rows="4"
                ></textarea>

              </div>


              {/* Buttons */}
              <div className="warehouse-form-actions">

                <button
                  type="button"
                  className="warehouse-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="warehouse-save-button"
                >
                  Save Warehouse
                </button>

              </div>

            </form>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Warehouse;