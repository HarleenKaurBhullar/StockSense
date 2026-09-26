import "./Stock.css";

function Stock() {
  return (
    <div className="stock-page">

      {/* Background effects */}
      <div className="stock-glow stock-glow-one"></div>
      <div className="stock-glow stock-glow-two"></div>

      <main className="stock-content">

        {/* Page Header */}
        <div className="stock-header">

          <div>
            <span className="stock-eyebrow">
              INVENTORY
            </span>

            <h1>Stock</h1>

            <p>
              View and manage your current inventory levels.
            </p>
          </div>

          <button className="add-product-button">
            <span>+</span>
            Add Product
          </button>

        </div>


        {/* Summary Cards */}
        <div className="stock-summary">

          <div className="summary-card">
            <span className="summary-label">
              TOTAL PRODUCTS
            </span>

            <strong>—</strong>
          </div>


          <div className="summary-card">
            <span className="summary-label">
              IN STOCK
            </span>

            <strong>—</strong>
          </div>


          <div className="summary-card">
            <span className="summary-label">
              LOW STOCK
            </span>

            <strong>—</strong>
          </div>


          <div className="summary-card">
            <span className="summary-label">
              OUT OF STOCK
            </span>

            <strong>—</strong>
          </div>

        </div>


        {/* Inventory Table */}
        <section className="stock-table-card">

          {/* Toolbar */}
          <div className="table-toolbar">

            <div>
              <h2>
                Inventory
              </h2>

              <span>
                Current stock by product and location
              </span>
            </div>


            {/* Search */}
            <div className="stock-search">

              <span className="search-icon">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search products or SKU..."
              />

            </div>

          </div>


          {/* Filters */}
          <div className="stock-filters">

            <select defaultValue="all">
              <option value="all">
                All Warehouses
              </option>

              <option value="main">
                Main Warehouse
              </option>

              <option value="secondary">
                Secondary Warehouse
              </option>
            </select>


            <select defaultValue="all">
              <option value="all">
                All Categories
              </option>
            </select>


            <select defaultValue="all">
              <option value="all">
                All Status
              </option>

              <option value="in-stock">
                In Stock
              </option>

              <option value="low-stock">
                Low Stock
              </option>

              <option value="out-of-stock">
                Out of Stock
              </option>
            </select>

          </div>


          {/* Table */}
          <div className="table-wrapper">

            <table>

              <thead>
                <tr>

                  <th>SKU</th>

                  <th>PRODUCT</th>

                  <th>CATEGORY</th>

                  <th>WAREHOUSE</th>

                  <th>LOCATION</th>

                  <th>ON HAND</th>

                  <th>FREE TO USE</th>

                  <th>STATUS</th>

                </tr>
              </thead>


              {/* Backend will populate this section */}
              <tbody>

              </tbody>

            </table>


            {/* Empty state */}
            <div className="stock-empty-state">

              <div className="empty-icon">
                +
              </div>

              <h3>
                No inventory data
              </h3>

              <p>
                Inventory records will appear here once connected to the backend.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Stock;