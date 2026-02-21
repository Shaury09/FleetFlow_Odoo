// 📦 MEMBER 3 — Revenue & Fuel Logging Page
// Branch: feature/revenue-fuel
// Task: Log fuel fills, track costs per trip/vehicle, show net profit
//   GET    /api/revenue
//   POST   /api/revenue
//   PUT    /api/revenue/:id
//   DELETE /api/revenue/:id

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Revenue() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/revenue').then(res => setRecords(res.data)).finally(() => setLoading(false));
  }, []);

  const totals = records.reduce((acc, r) => ({
    revenue: acc.revenue + r.revenue,
    fuelCost: acc.fuelCost + r.fuelCost,
    expenses: acc.expenses + r.expenses,
  }), { revenue: 0, fuelCost: 0, expenses: 0 });

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading revenue data...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Revenue & Fuel</div>
          <div className="page-subtitle">Digital wallet for your fleet</div>
        </div>
        {/* TODO: "+ Add Expense" button */}
      </div>

      {/* TODO: KPI summary cards for totals */}

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Trip</th>
                <th>Driver</th>
                <th>Fuel (L)</th>
                <th>Fuel Cost</th>
                <th>Revenue</th>
                <th>Expenses</th>
                <th>Net</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '32px' }}>
                  No revenue records yet.
                </td></tr>
              ) : records.map(r => (
                <tr key={r._id}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {r.trip ? '#trip' : '—'}
                  </td>
                  <td>{r.driver?.name || '—'}</td>
                  <td>{r.fuelLiters || '—'}</td>
                  <td>₹{r.fuelCost.toLocaleString()}</td>
                  <td style={{ color: 'var(--accent)' }}>₹{r.revenue.toLocaleString()}</td>
                  <td style={{ color: 'var(--accent-red)' }}>₹{r.expenses.toLocaleString()}</td>
                  <td style={{ fontWeight: 700 }}>₹{(r.revenue - r.fuelCost - r.expenses).toLocaleString()}</td>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
