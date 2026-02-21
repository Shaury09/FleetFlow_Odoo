// 📦 MEMBER 2 — Vehicle Registry Page
// Branch: feature/vehicle-registry
// Task: Build full CRUD UI for vehicles using the API endpoints:
//   GET    /api/vehicles
//   POST   /api/vehicles
//   PUT    /api/vehicles/:id
//   DELETE /api/vehicles/:id

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/vehicles').then(res => setVehicles(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading vehicles...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Vehicle Registry</div>
          <div className="page-subtitle">Manage all fleet assets</div>
        </div>
        {/* TODO: Add "+ New Vehicle" button that opens a modal form */}
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>License Plate</th>
                <th>Make / Model</th>
                <th>Year</th>
                <th>Type</th>
                <th>Capacity (kg)</th>
                <th>Odometer (km)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
                  No vehicles yet. Add your first vehicle.
                </td></tr>
              ) : vehicles.map(v => (
                <tr key={v._id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{v.licensePlate}</td>
                  <td>{v.make} {v.model}</td>
                  <td>{v.year}</td>
                  <td>{v.type}</td>
                  <td>{v.capacity.toLocaleString()}</td>
                  <td>{v.currentOdometer.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${v.status === 'Ready' ? 'badge-green' : v.status === 'In Shop' ? 'badge-red' : 'badge-yellow'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    {/* TODO: Edit & Delete buttons */}
                    <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
