import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch dashboard");
        }

        setDashboard(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError(error.message);
      }
    };

    fetchDashboard();
  }, []);

  if (error) {
    return (
      <div className="dashboard-page">
        <main className="dashboard-content">
          <p>{error}</p>
        </main>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="dashboard-page">
        <main className="dashboard-content">
          <p>Loading dashboard...</p>
        </main>
      </div>
    );
  }

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
                {String(dashboard.receipts.total).padStart(2, "0")}
              </span>
            </div>

            <p className="card-description">
              Incoming inventory waiting to be received.
            </p>

            <div className="stats">

              <div className="stat">
                <span className="stat-number">
                  {String(dashboard.receipts.late).padStart(2, "0")}
                </span>

                <span className="stat-label">
                  Late
                </span>
              </div>

              <div className="stat-divider"></div>

              <div className="stat">
                <span className="stat-number">
                  {String(dashboard.receipts.waiting).padStart(2, "0")}
                </span>

                <span className="stat-label">
                  Waiting
                </span>
              </div>

            </div>

           <button
  className="operation-button"
  onClick={() => navigate("/receipts")}
>
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
                {String(dashboard.deliveries.total).padStart(2, "0")}
              </span>
            </div>

            <p className="card-description">
              Outgoing inventory waiting to be delivered.
            </p>

            <div className="stats">

              <div className="stat">
                <span className="stat-number">
                  {String(dashboard.deliveries.late).padStart(2, "0")}
                </span>

                <span className="stat-label">
                  Late
                </span>
              </div>

              <div className="stat-divider"></div>

              <div className="stat">
                <span className="stat-number">
                  {String(dashboard.deliveries.waiting).padStart(2, "0")}
                </span>

                <span className="stat-label">
                  Waiting
                </span>
              </div>

            </div>

            <button
  className="operation-button"
  onClick={() => navigate("/deliveries")}
>
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