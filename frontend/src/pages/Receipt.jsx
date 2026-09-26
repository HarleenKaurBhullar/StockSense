import "./Receipt.css";

function Receipt() {
  return (
    <div className="receipt-page">
      <div className="receipt-glow receipt-glow-one"></div>
      <div className="receipt-glow receipt-glow-two"></div>

      <main className="receipt-content">
        {/* PAGE HEADER */}
        <div className="receipt-page-header">
          <div>
            <span className="receipt-eyebrow">OPERATIONS / RECEIPTS</span>

            <h1>Receipts</h1>

            <p>
              Manage incoming inventory receipts and track their status.
            </p>
          </div>

          <button type="button" className="new-receipt-button">
            <span>+</span>
            New Receipt
          </button>
        </div>

        {/* FILTER / SEARCH CARD */}
        <section className="receipt-filter-card">
          <div className="receipt-filter-header">
            <div>
              <h2>Receipts</h2>
              <p>Search and filter incoming inventory receipts.</p>
            </div>

            <span className="receipt-count">—</span>
          </div>

          <div className="receipt-filters">
            {/* SEARCH */}
            <div className="receipt-search">
              <span className="receipt-search-icon">⌕</span>

              <input
                type="text"
                placeholder="Search by reference..."
              />
            </div>

            {/* FROM */}
            <div className="receipt-filter-field">
              <label htmlFor="receipt-from">From</label>

              <select id="receipt-from" defaultValue="all">
                <option value="all">All Sources</option>
              </select>
            </div>

            {/* DESTINATION */}
            <div className="receipt-filter-field">
              <label htmlFor="receipt-destination">
                Destination
              </label>

              <select id="receipt-destination" defaultValue="all">
                <option value="all">All Destinations</option>
              </select>
            </div>

            {/* STATUS */}
            <div className="receipt-filter-field">
              <label htmlFor="receipt-status">Status</label>

              <select id="receipt-status" defaultValue="all">
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="waiting">Waiting</option>
                <option value="ready">Ready</option>
                <option value="done">Done</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
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
                {/* Backend data will be rendered here */}
              </tbody>
            </table>

            {/* EMPTY STATE */}
            <div className="receipt-empty-state">
              <div className="receipt-empty-icon">↓</div>

              <h3>No receipts available</h3>

              <p>
                Receipt records will appear here once connected
                to the backend.
              </p>

              <button
                type="button"
                className="receipt-empty-button"
              >
                <span>+</span>
                New Receipt
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Receipt;