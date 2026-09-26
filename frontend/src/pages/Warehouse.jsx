import { useState, useEffect } from "react";
import "./Warehouse.css";

function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({ name: '', short_code: '', address: '' });

  const fetchWarehouses = async () => {
    try {
      const response = await fetch('/api/warehouses');
      const data = await response.json();
      setWarehouses(data.warehouses || []);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/warehouses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ name: '', short_code: '', address: '' }); // reset form
        fetchWarehouses(); // refresh list
      }
    } catch (error) {
      console.error('Error saving warehouse:', error);
    }
  };

  return (
    <div className="warehouse-page">
      <div className="warehouse-glow warehouse-glow-one"></div>
      <div className="warehouse-glow warehouse-glow-two"></div>

      <main className="warehouse-content">
        <div className="warehouse-layout">
          
          {/* Warehouse list */}
          <section className="warehouse-list-card">
            <div className="section-header">
              <div>
                <h2>Warehouses</h2>
                <p>Your available storage facilities</p>
              </div>
              <span className="section-count">{warehouses.length}</span>
            </div>

            <div className="warehouse-list">
              {warehouses.length === 0 ? (
                <div className="warehouse-empty">
                  <div className="warehouse-empty-icon">+</div>
                  <h3>No warehouses available</h3>
                </div>
              ) : (
                <ul>
                  {warehouses.map(w => (
                    <li key={w.id} className="warehouse-item">
                      <strong>{w.name}</strong> ({w.short_code})
                      <p>{w.address}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Add warehouse form */}
          <section className="warehouse-form-card">
            <form className="warehouse-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="warehouse-name">Warehouse Name</label>
                <input
                  id="warehouse-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter warehouse name"
                />
              </div>

              <div className="form-field">
                <label htmlFor="warehouse-code">Short Code</label>
                <input
                  id="warehouse-code"
                  type="text"
                  value={formData.short_code}
                  onChange={e => setFormData({...formData, short_code: e.target.value})}
                  placeholder="Enter short code"
                />
              </div>

              <div className="form-field">
                <label htmlFor="warehouse-address">Address</label>
                <textarea
                  id="warehouse-address"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter warehouse address"
                  rows="4"
                ></textarea>
              </div>

              <div className="warehouse-form-actions">
                <button type="button" className="warehouse-cancel-button" onClick={() => setFormData({name: '', short_code: '', address: ''})}>
                  Cancel
                </button>
                <button type="submit" className="warehouse-save-button">
                  Save Warehouse
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Warehouse;