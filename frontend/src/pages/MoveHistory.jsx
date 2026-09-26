import React, { useState, useEffect } from "react";
import "./MoveHistory.css";

function MoveHistory() {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when component mounts
  useEffect(() => {
    const fetchMoveHistory = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the JWT here
        
        // Fetching documents with type=transfer 
        const response = await fetch("/api/stock-documents?type=transfer", {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Failed to fetch move records");
        }

        const data = await response.json();
        setMoves(data.documents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoveHistory();
  }, []);

  return (
    <div className="move-page">
      <div className="move-glow move-glow-one"></div>
      <div className="move-glow move-glow-two"></div>

      <main className="move-content">
        {/* Header */}
        <div className="move-header">
          <div>
            <span className="move-eyebrow">INVENTORY OPERATIONS</span>
            <h1>Move History</h1>
            <p>Track all inventory movements between locations.</p>
          </div>
          <button className="new-move-button">
            <span>+</span> New Move
          </button>
        </div>

        {/* Main Card */}
        <section className="move-card">
          <div className="move-toolbar">
            <div>
              <h2>Inventory Moves</h2>
              <p>View stock transfers and movement records.</p>
            </div>
            <div className="move-search">
              <span>⌕</span>
              <input type="text" placeholder="Search by reference or contact..." />
            </div>
          </div>

          <div className="move-filters">
            <select defaultValue="all">
              <option value="all">All Status</option>
            </select>
            <select defaultValue="all">
              <option value="all">All Locations</option>
            </select>
          </div>

          <div className="move-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>REFERENCE</th>
                  <th>DATE</th>
                  <th>CONTACT</th>
                  <th>FROM</th>
                  <th>TO</th>
                  <th>PRODUCT</th>
                  <th>QUANTITY</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "2rem" }}>Loading...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" style={{ color: "red", textAlign: "center" }}>{error}</td>
                  </tr>
                ) : moves.length === 0 ? (
                  <tr>
                    <td colSpan="8">
                      {/* Empty State inside table body */}
                      <div className="move-empty">
                        <div className="move-empty-icon">↔</div>
                        <h3>No move records</h3>
                        <p>Movement records will appear here once connected to the backend.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  moves.map((move) => (
                    <tr key={move.id}>
                      <td>{move.reference || "-"}</td>
                      <td>{new Date(move.created_at).toLocaleDateString()}</td>
                      <td>{move.from_partner || "Internal"}</td>
                      <td>{move.source_location || "N/A"}</td>
                      <td>{move.dest_location || "N/A"}</td>
                      <td>{move.products_count} Items</td>
                      <td>-</td>
                      <td style={{ textTransform: 'capitalize' }}>{move.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MoveHistory;