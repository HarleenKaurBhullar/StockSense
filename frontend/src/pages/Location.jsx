import { useState, useEffect } from "react";
import "./Location.css";

function Location() {
  const [locations, setLocations] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [formData, setFormData] = useState({ name: '', short_code: '', warehouse_id: '' });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token
      
      // Shared headers configuration
      const fetchConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const [locRes, whRes] = await Promise.all([
        fetch('http://localhost:5000/api/locations', fetchConfig),
        fetch('http://localhost:5000/api/warehouses', fetchConfig)
      ]);
      
      const locData = await locRes.json();
      const whData = await whRes.json();
      
      setLocations(locData.locations || []);
      setWarehouses(whData.warehouses || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get token

      const response = await fetch('http://localhost:5000/api/locations', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach token
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormData({ name: '', short_code: '', warehouse_id: '' }); // reset
        fetchData(); // refresh list
      } else {
        console.error('Failed to save location');
      }
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <div className="location-page">
      <div className="location-glow location-glow-one"></div>
      <div className="location-glow location-glow-two"></div>

      <main className="location-content">
        <div className="location-layout">
          {/* Locations List */}
          <section className="location-list-card">
            <div className="location-table-wrapper">
              <table className="location-table">
                <thead>
                  <tr>
                    <th>NAME</th>
                    <th>SHORT CODE</th>
                    <th>WAREHOUSE</th>
                  </tr>
                </thead>
                <tbody>
                  {locations.map((loc) => (
                    <tr key={loc.id}>
                      <td>{loc.name}</td>
                      <td>{loc.short_code}</td>
                      <td>{loc.warehouse_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {locations.length === 0 && (
                <div className="location-empty-state">
                  <div className="location-empty-icon">+</div>
                  <h3>No locations available</h3>
                </div>
              )}
            </div>
          </section>

          {/* Add Location Form */}
          <section className="location-form-card">
            <form className="location-form" onSubmit={handleSubmit}>
              <div className="location-form-field">
                <label htmlFor="location-name">Location Name</label>
                <input
                  id="location-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter location name"
                />
              </div>

              <div className="location-form-field">
                <label htmlFor="location-code">Short Code</label>
                <input
                  id="location-code"
                  type="text"
                  value={formData.short_code}
                  onChange={e => setFormData({...formData, short_code: e.target.value})}
                  placeholder="Enter short code"
                />
              </div>

              <div className="location-form-field">
                <label htmlFor="location-warehouse">Warehouse</label>
                <select
                  id="location-warehouse"
                  required
                  value={formData.warehouse_id}
                  onChange={e => setFormData({...formData, warehouse_id: e.target.value})}
                >
                  <option value="" disabled>Select warehouse</option>
                  {warehouses.map(wh => (
                    <option key={wh.id} value={wh.id}>
                      {wh.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="location-form-actions">
                <button type="submit" className="location-save-button">
                  Save Location
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Location;