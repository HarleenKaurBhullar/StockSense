import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Background decoration */}
      <div className="dashboard-glow dashboard-glow-one"></div>
      <div className="dashboard-glow dashboard-glow-two"></div>

      <main className="dashboard-content">

        {/* Operation Cards */}
        <div className="operation-grid">

          {/* =========================
              RECEIPTS
          ========================= */}
          <section className="operation-card">

            <div className="card-top">
              <div className="card-icon">
                ↓
              </div>

              <span className="card-label">
                INCOMING
              </span>
            </div>

            <div className="card-title-row">
              <h2>Receipts</h2>

              <span className="operation-count">
                06
              </span>
            </div>

            <p className="card-description">
              Incoming inventory waiting to be received.
            </p>

            <div className="stats">

              <div className="stat">
                <span className="stat-number">
                  01
                </span>

                <span className="stat-label">
                  Late
                </span>
              </div>

              <div className="stat-divider"></div>

              <div className="stat">
                <span className="stat-number">
                  05
                </span>

                <span className="stat-label">
                  Waiting
                </span>
              </div>

            </div>

            <button className="operation-button">
              <span>Go to receive</span>

              <span className="arrow">
                →
              </span>
            </button>

          </section>


          {/* =========================
              DELIVERIES
          ========================= */}
          <section className="operation-card">

            <div className="card-top">
              <div className="card-icon">
                ↑
              </div>

              <span className="card-label">
                OUTGOING
              </span>
            </div>

            <div className="card-title-row">
              <h2>Deliveries</h2>

              <span className="operation-count">
                06
              </span>
            </div>

            <p className="card-description">
              Outgoing inventory waiting to be delivered.
            </p>

            <div className="stats">

              <div className="stat">
                <span className="stat-number">
                  01
                </span>

                <span className="stat-label">
                  Late
                </span>
              </div>

              <div className="stat-divider"></div>

              <div className="stat">
                <span className="stat-number">
                  05
                </span>

                <span className="stat-label">
                  Waiting
                </span>
              </div>

            </div>

            <button className="operation-button">
              <span>Go to deliver</span>

              <span className="arrow">
                →
              </span>
            </button>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;