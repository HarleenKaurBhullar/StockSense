import { useState, useEffect } from "react";
import "./Deliveries.css";

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch delivery documents on mount
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch('/api/stock-documents?type=delivery');
        const data = await response.json();
        setDeliveries(data.documents || []);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="deliveries-page">
      <div className="deliveries-glow deliveries-glow-one"></div>
      <div className="deliveries-glow deliveries-glow-two"></div>

      <main className="deliveries-content">
        {/* Header section remains the same... */}
        <div className="deliveries-header">
          <div>
            <span className="deliveries-eyebrow">INVENTORY OPERATIONS</span>
            <h1>Deliveries</h1>
            <p>Manage outgoing inventory and delivery orders.</p>
          </div>
          <button className="new-delivery-button">
            <span>+</span>New Delivery
          </button>
        </div>

        <section className="delivery-card">
          {/* Toolbar and Filters remain the same... */}
          
          <div className="delivery-table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>REFERENCE</th>
                  <th>FROM PARTNER</th>
                  <th>DESTINATION</th>
                  <th>ITEMS</th>
                  <th>DATE</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery.id}>
                    <td>{delivery.reference}</td>
                    <td>{delivery.from_partner || 'N/A'}</td>
                    <td>{delivery.dest_location || 'N/A'}</td>
                    <td>{delivery.products_count}</td>
                    <td>{new Date(delivery.created_at).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${delivery.status}`}>
                        {delivery.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {!loading && deliveries.length === 0 && (
              <div className="delivery-empty">
                <div className="delivery-empty-icon">↑</div>
                <h3>No delivery orders</h3>
                <p>Delivery records will appear here once connected to the backend.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Deliveries;