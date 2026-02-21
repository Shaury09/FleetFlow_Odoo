// 📦 MEMBER 3 — Maintenance & Service Logs Page
// Branch: feature/maintenance-logs
// Task: Log repairs, track vehicle health, auto-set vehicle to "In Shop"
//   GET    /api/maintenance
//   POST   /api/maintenance
//   PUT    /api/maintenance/:id
//   DELETE /api/maintenance/:id

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Maintenance() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/maintenance').then(res => setLogs(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading maintenance logs...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Maintenance & Service</div>
          <div className="page-subtitle">Keep your fleet healthy</div>
        </div>
        {/* TODO: "+ Log Repair" button */}
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
                  No maintenance logs yet.
                </td></tr>
              ) : logs.map(log => (
                <tr key={log._id}>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{log.vehicle?.licensePlate}</td>
                  <td>{log.type}</td>
                  <td>{log.description}</td>
                  <td>₹{log.cost.toLocaleString()}</td>
                  <td>{new Date(log.date).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${log.status === 'Completed' ? 'badge-green' : log.status === 'In Progress' ? 'badge-red' : 'badge-yellow'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{/* TODO: Edit / Delete */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
