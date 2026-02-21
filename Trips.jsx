// 📦 MEMBER 2 — Trip Dispatcher Page
// Branch: feature/trip-dispatcher
// Task: Build UI to book trips, assign vehicle + driver, track status
//   GET  /api/trips
//   POST /api/trips  (validates cargo weight vs vehicle capacity)
//   PUT  /api/trips/:id  (update status)

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/trips').then(res => setTrips(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading trips...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Trip Dispatcher</div>
          <div className="page-subtitle">Book and manage deliveries</div>
        </div>
        {/* TODO: "+ New Trip" button */}
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Cargo (kg)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
                  No trips booked yet.
                </td></tr>
              ) : trips.map((t, i) => (
                <tr key={t._id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>#{i + 1}</td>
                  <td>{t.vehicle?.licensePlate || '—'}</td>
                  <td>{t.driver?.name || '—'}</td>
                  <td>{t.origin}</td>
                  <td>{t.destination}</td>
                  <td>{t.cargoWeight}</td>
                  <td>
                    <span className={`badge ${t.status === 'Completed' ? 'badge-green' : t.status === 'Cancelled' ? 'badge-red' : 'badge-yellow'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>{/* TODO: Update status, delete */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
