import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">
      <div className="settings-glow settings-glow-one"></div>
      <div className="settings-glow settings-glow-two"></div>

      <main className="settings-content">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="settings-page-header">
          <div>
            <span className="settings-eyebrow">SETTINGS / ACCOUNT</span>

            <h1>Settings</h1>

            <p>
              Manage your profile, warehouse, and inventory locations.
            </p>
          </div>
        </div>

        {/* =========================
            PROFILE
        ========================= */}

        <section className="settings-card profile-card">
          <div className="settings-card-header">
            <div className="settings-icon profile-icon">
              S
            </div>

            <div>
              <span className="settings-section-label">
                ACCOUNT
              </span>

              <h2>My Profile</h2>

              <p>
                Manage the information associated with your account.
              </p>
            </div>
          </div>

          <div className="settings-divider"></div>

          <div className="profile-body">

            <div className="profile-avatar">
              S
            </div>

            <div className="profile-fields">

              <div className="settings-field">
                <label htmlFor="profile-name">
                  Full Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  placeholder="Your name"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="profile-email">
                  Email
                </label>

                <input
                  id="profile-email"
                  type="email"
                  placeholder="Your email"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="profile-phone">
                  Phone Number
                </label>

                <input
                  id="profile-phone"
                  type="tel"
                  placeholder="Your phone number"
                />
              </div>

              <div className="settings-field">
                <label htmlFor="profile-role">
                  Role
                </label>

                <input
                  id="profile-role"
                  type="text"
                  placeholder="Loaded from backend"
                  disabled
                />
              </div>

            </div>
          </div>
        </section>

        {/* =========================
            WAREHOUSE + LOCATION
        ========================= */}

        <div className="inventory-settings-grid">

          {/* WAREHOUSE */}
          <section className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                W
              </div>

              <div>
                <span className="settings-section-label">
                  INVENTORY STRUCTURE
                </span>

                <h2>Warehouse</h2>

                <p>
                  Select the warehouse associated with your current
                  inventory operations.
                </p>
              </div>
            </div>

            <div className="settings-divider"></div>

            <div className="settings-form-body">

              <div className="settings-field">
                <label htmlFor="warehouse">
                  Warehouse
                </label>

                <select
                  id="warehouse"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select warehouse
                  </option>
                </select>

                <span className="field-note">
                  Warehouse options will be loaded from the backend.
                </span>
              </div>

              <button
                type="button"
                className="manage-button"
              >
                Manage Warehouses
                <span>→</span>
              </button>

            </div>
          </section>

          {/* LOCATION */}
          <section className="settings-card">

            <div className="settings-card-header">
              <div className="settings-icon">
                L
              </div>

              <div>
                <span className="settings-section-label">
                  INVENTORY STRUCTURE
                </span>

                <h2>Location</h2>

                <p>
                  Select the storage location for your inventory
                  operations.
                </p>
              </div>
            </div>

            <div className="settings-divider"></div>

            <div className="settings-form-body">

              <div className="settings-field">
                <label htmlFor="location">
                  Location
                </label>

                <select
                  id="location"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select location
                  </option>
                </select>

                <span className="field-note">
                  Location options will be loaded from the backend.
                </span>
              </div>

              <button
                type="button"
                className="manage-button"
              >
                Manage Locations
                <span>→</span>
              </button>

            </div>
          </section>

        </div>

        {/* =========================
            PASSWORD / SECURITY
        ========================= */}

        <section className="settings-card security-card">

          <div className="settings-card-header">
            <div className="settings-icon">
              🔒
            </div>

            <div>
              <span className="settings-section-label">
                SECURITY
              </span>

              <h2>Password & Security</h2>

              <p>
                Manage your account password and security settings.
              </p>
            </div>
          </div>

          <div className="settings-divider"></div>

          <div className="security-body">

            <div className="settings-field">
              <label htmlFor="current-password">
                Current Password
              </label>

              <input
                id="current-password"
                type="password"
                placeholder="Enter current password"
              />
            </div>

            <div className="settings-field">
              <label htmlFor="new-password">
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                placeholder="Enter new password"
              />
            </div>

            <div className="settings-field">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>

          </div>

          <div className="security-note">
            <span></span>

            <p>
              Password and account security will be connected to the
              authentication system by the backend.
            </p>
          </div>

        </section>

        {/* =========================
            ACTIONS
        ========================= */}

        <div className="settings-actions">

          <button
            type="button"
            className="settings-cancel-button"
          >
            Cancel
          </button>

          <button
            type="button"
            className="settings-save-button"
          >
            Save Changes
          </button>

        </div>

      </main>
    </div>
  );
}

export default Settings;