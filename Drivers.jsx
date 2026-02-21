// 📦 MEMBER 4 — Driver Performance & Safety Profiles Page
// Branch: feature/driver-profiles
// Task: Show driver list, license expiry, safety score, duty status
//   GET    /api/drivers
//   POST   /api/drivers
//   PUT    /api/drivers/:id
//   DELETE /api/drivers/:id

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/drivers').then(res => setDrivers(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading driver profiles...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Driver Profiles</div>
          <div className="page-subtitle">Performance & Safety Management</div>
        </div>
        {/* TODO: "+ Add Driver" button */}
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>License #</th>
                <th>Expiry</th>
                <th>Safety Score</th>
                <th>Total Trips</th>
                <th>Incidents</th>
                <th>Duty Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
                  No drivers registered yet.
                </td></tr>
              ) : drivers.map(d => (
                <tr key={d._id}>
                  <td style={{ fontWeight: 600 }}>{d.name}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{d.licenseNumber}</td>
                  <td style={{ color: d.licenseExpired ? 'var(--accent-red)' : 'var(--text-primary)' }}>
                    {new Date(d.licenseExpiry).toLocaleDateString()}
                    {d.licenseExpired && ' ⚠️'}
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', color: d.safetyScore >= 80 ? 'var(--accent)' : d.safetyScore >= 60 ? 'var(--accent-yellow)' : 'var(--accent-red)' }}>
                      {d.safetyScore}%
                    </span>
                  </td>
                  <td>{d.totalTrips}</td>
                  <td style={{ color: d.incidents > 0 ? 'var(--accent-red)' : 'var(--text-primary)' }}>{d.incidents}</td>
                  <td>
                    <span className={`badge ${d.dutyStatus === 'On Duty' ? 'badge-green' : d.dutyStatus === 'Suspended' ? 'badge-red' : 'badge-gray'}`}>
                      {d.dutyStatus}
                    </span>
                  </td>
                  <td>{/* TODO: Edit / Suspend / Delete */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
