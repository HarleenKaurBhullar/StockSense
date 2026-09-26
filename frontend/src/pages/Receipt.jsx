import { useState, useEffect } from "react";
import "./Receipt.css";

function Receipt() {
  // 1. Set up state to hold the backend data
  const [receipts, setReceipts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch data when the component loads
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        // UPDATED: Added full URL http://localhost:5000 to reach your Express backend
        const response = await fetch('http://localhost:5000/api/stock-documents?type=receipt');
        
        // ADDED: Better error handling to catch failed requests
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.documents) {
          setReceipts(data.documents);
        }
      } catch (error) {
        console.error("Error fetching receipts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  return (
    <div className="receipt-page">
      <div className="receipt-glow receipt-glow-one"></div>
      <div className="receipt-glow receipt-glow-two"></div>

      <main className="receipt-content">
        {/* PAGE HEADER */}
        <div className="receipt-page-header">
          {/* ... (Keep existing header code) ... */}
        </div>

        {/* FILTER / SEARCH CARD */}
        <section className="receipt-filter-card">
          <div className="receipt-filter-header">
            <div>
              <h2>Receipts</h2>
              <p>Search and filter incoming inventory receipts.</p>
            </div>
            
            {/* 3. Show actual dynamic count */}
            <span className="receipt-count">
              {receipts.length} {receipts.length === 1 ? 'Receipt' : 'Receipts'}
            </span>
          </div>

          <div className="receipt-filters">
             {/* ... (Keep existing filter code) ... */}
          </div>
        </section>

        {/* RECEIPT TABLE */}
        <section className="receipt-table-card">
          <div className="receipt-table-wrapper">
            <table className="receipt-table">
              <thead>
                <tr>
                  <th>REFERENCE</th>
                  <th>DATE</th>
                  <th>FROM</th>
                  <th>DESTINATION</th>
                  <th>PRODUCTS</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {/* 4. Map through the data to create rows */}
                {receipts.map((receipt) => (
                  <tr key={receipt.id}>
                    <td>{receipt.reference}</td>
                    <td>{new Date(receipt.created_at).toLocaleDateString()}</td>
                    <td>{receipt.from_partner || 'N/A'}</td>
                    <td>{receipt.dest_location}</td>
                    <td>{receipt.products_count} items</td>
                    <td>
                      <span className={`status-badge status-${receipt.status}`}>
                        {receipt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 5. Conditionally render the empty state */}
            {!isLoading && receipts.length === 0 && (
              <div className="receipt-empty-state">
                <div className="receipt-empty-icon">↓</div>
                <h3>No receipts available</h3>
                <p>Receipt records will appear here once connected to the backend.</p>
                <button type="button" className="receipt-empty-button">
                  <span>+</span> New Receipt
                </button>
              </div>
            )}
            
            {isLoading && (
               <div className="receipt-loading-state">Loading receipts...</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Receipt;