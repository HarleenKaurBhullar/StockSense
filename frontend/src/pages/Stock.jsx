import { useState, useEffect } from "react";
import "./Stock.css";

function Stock() {
  const [inventory, setInventory] = useState([]);
  const [summary, setSummary] = useState({ totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0 });
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data on Component Mount
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Run all API calls at the same time
        const [stockRes, warehouseRes, categoryRes] = await Promise.all([
          fetch("/api/stock"), // Make sure your server is running on the correct port/proxy
          fetch("/api/warehouses"),
          fetch("/api/categories")
        ]);

        const stockData = await stockRes.json();
        const warehouseData = await warehouseRes.json();
        const categoryData = await categoryRes.json();

        if (stockData.inventory) {
          setInventory(stockData.inventory);
          setSummary(stockData.summary);
        }
        if (warehouseData.warehouses) setWarehouses(warehouseData.warehouses);
        if (categoryData.categories) setCategories(categoryData.categories);

      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="stock-page">
      {/* Background effects */}
      <div className="stock-glow stock-glow-one"></div>
      <div className="stock-glow stock-glow-two"></div>

      <main className="stock-content">
        {/* Page Header */}
        <div className="stock-header">
          <div>
            <span className="stock-eyebrow">INVENTORY</span>
            <h1>Stock</h1>
            <p>View and manage your current inventory levels.</p>
          </div>
          <button className="add-product-button">
            <span>+</span> Add Product
          </button>
        </div>

        {/* Summary Cards */}
        <div className="stock-summary">
          <div className="summary-card">
            <span className="summary-label">TOTAL PRODUCTS</span>
            <strong>{summary.totalProducts}</strong>
          </div>
          <div className="summary-card">
            <span className="summary-label">IN STOCK</span>
            <strong>{summary.inStock}</strong>
          </div>
          <div className="summary-card">
            <span className="summary-label">LOW STOCK</span>
            <strong>{summary.lowStock}</strong>
          </div>
          <div className="summary-card">
            <span className="summary-label">OUT OF STOCK</span>
            <strong>{summary.outOfStock}</strong>
          </div>
        </div>

        {/* Inventory Table */}
        <section className="stock-table-card">
          {/* Toolbar */}
          <div className="table-toolbar">
            <div>
              <h2>Inventory</h2>
              <span>Current stock by product and location</span>
            </div>
            {/* Search */}
            <div className="stock-search">
              <span className="search-icon">⌕</span>
              <input type="text" placeholder="Search products or SKU..." />
            </div>
          </div>

          {/* Filters */}
          <div className="stock-filters">
            <select defaultValue="all">
              <option value="all">All Warehouses</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>

            <select defaultValue="all">
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select defaultValue="all">
              <option value="all">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
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
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr key={`${item.sku}-${item.location_name}-${index}`}>
                    <td>{item.sku}</td>
                    <td>{item.product_name}</td>
                    <td>{item.category_name || "Uncategorized"}</td>
                    <td>{item.warehouse_name}</td>
                    <td>{item.location_name}</td>
                    <td>{item.on_hand}</td>
                    <td>
                      <span className={`status-badge ${
                        item.on_hand <= 0 ? "status-out" : 
                        item.on_hand <= 10 ? "status-low" : "status-in"
                      }`}>
                        {item.on_hand <= 0 ? "Out of Stock" : 
                         item.on_hand <= 10 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty state */}
            {!loading && inventory.length === 0 && (
              <div className="stock-empty-state">
                <div className="empty-icon">+</div>
                <h3>No inventory data</h3>
                <p>Inventory records will appear here once connected to the backend.</p>
              </div>
            )}
            
            {loading && (
              <div className="stock-loading-state" style={{ textAlign: "center", padding: "2rem" }}>
                <p>Loading inventory...</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Stock;