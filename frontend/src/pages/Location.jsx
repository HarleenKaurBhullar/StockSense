import "./Location.css";

function Location() {
  return (
    <div className="location-page">
      <div className="location-glow location-glow-one"></div>
      <div className="location-glow location-glow-two"></div>

      <main className="location-content">
        <div className="location-header">
          <div>
            <span className="location-eyebrow">INVENTORY STRUCTURE</span>
            <h1>Location</h1>
            <p>
              Manage storage locations within your warehouses.
            </p>
          </div>

          <button className="location-add-button" type="button">
            <span>+</span>
            Add Location
          </button>
        </div>

        <div className="location-layout">
          {/* Locations List */}
          <section className="location-list-card">
            <div className="location-section-header">
              <div>
                <h2>Locations</h2>
                <p>View and manage your storage locations.</p>
              </div>

              <span className="location-section-count">—</span>
            </div>

            <div className="location-toolbar">
              <div className="location-search">
                <span className="location-search-icon">⌕</span>

                <input
                  type="text"
                  placeholder="Search locations..."
                />
              </div>

              <select defaultValue="all">
                <option value="all">All Warehouses</option>
              </select>
            </div>

            <div className="location-table-wrapper">
              <table className="location-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>SHORT CODE</th>
                    <th>WAREHOUSE</th>
                    <th>DESCRIPTION</th>
                  </tr>
                </thead>

                <tbody></tbody>
              </table>

              <div className="location-empty-state">
                <div className="location-empty-icon">+</div>

                <h3>No locations available</h3>

                <p>
                  Location records will appear here once connected
                  to the backend.
                </p>
              </div>
            </div>
          </section>

          {/* Add Location Form */}
          <section className="location-form-card">
            <div className="location-section-header">
              <div>
                <span className="location-form-eyebrow">
                  NEW LOCATION
                </span>

                <h2>Add Location</h2>

                <p>
                  Create a storage location inside a warehouse.
                </p>
              </div>
            </div>

            <form className="location-form">
              <div className="location-form-field">
                <label htmlFor="location-name">
                  Location Name
                </label>

                <input
                  id="location-name"
                  type="text"
                  placeholder="Enter location name"
                />
              </div>

              <div className="location-form-field">
                <label htmlFor="location-code">
                  Short Code
                </label>

                <input
                  id="location-code"
                  type="text"
                  placeholder="Enter short code"
                />
              </div>

              <div className="location-form-field">
                <label htmlFor="location-warehouse">
                  Warehouse
                </label>

                <select
                  id="location-warehouse"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select warehouse
                  </option>
                </select>

                <span className="location-field-note">
                  Warehouse options will be loaded from the backend.
                </span>
              </div>

              <div className="location-form-field">
                <label htmlFor="location-description">
                  Description
                </label>

                <textarea
                  id="location-description"
                  placeholder="Enter location description"
                  rows="4"
                ></textarea>
              </div>

              <div className="location-form-actions">
                <button
                  type="button"
                  className="location-cancel-button"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="location-save-button"
                >
                  Save Location
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Location;