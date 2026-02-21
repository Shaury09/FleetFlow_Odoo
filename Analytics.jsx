// 📦 MEMBER 4 — Operational Analytics & Financial Reports Page
// Branch: feature/analytics-reports
// Task: Charts for fuel efficiency, vehicle ROI, monthly financial summary
//   GET /api/analytics/summary
//   GET /api/analytics/fuel-efficiency
//   GET /api/analytics/financial

import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import api from '../utils/api';

export default function Analytics() {
  const [financial, setFinancial] = useState({});
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/analytics/summary'), api.get('/analytics/financial')])
      .then(([s, f]) => { setSummary(s.data); setFinancial(f.data); })
      .finally(() => setLoading(false));
  }, []);

  const chartData = Object.entries(financial).map(([month, vals]) => ({ month, ...vals, profit: vals.revenue - vals.fuelCost - vals.expenses }));

  if (loading) return <div style={{ color: 'var(--accent)' }}>Loading analytics...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Analytics & Reports</div>
          <div className="page-subtitle">Operational insights & financial overview</div>
        </div>
        {/* TODO: Export PDF / Excel button */}
      </div>

      {/* KPI Summary */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginBottom: '24px' }}>
        <div className="kpi-card">
          <div className="kpi-value">₹{(summary?.totalRevenue || 0).toLocaleString()}</div>
          <div className="kpi-label">Total Revenue</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: 'var(--accent-red)' }}>₹{(summary?.totalFuelCost || 0).toLocaleString()}</div>
          <div className="kpi-label">Total Fuel Cost</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-value" style={{ color: 'var(--accent-yellow)' }}>{summary?.totalVehicles || 0}</div>
          <div className="kpi-label">Total Vehicles</div>
        </div>
      </div>

      {/* Financial Chart */}
      {chartData.length > 0 ? (
        <div className="card" style={{ marginBottom: '24px' }}>
          <strong style={{ display: 'block', marginBottom: '16px' }}>Monthly Financial Summary</strong>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} />
              <Legend />
              <Bar dataKey="revenue" fill="#00d4aa" name="Revenue" radius={[4,4,0,0]} />
              <Bar dataKey="fuelCost" fill="#ff4757" name="Fuel Cost" radius={[4,4,0,0]} />
              <Bar dataKey="profit" fill="#ffa502" name="Net Profit" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="card" style={{ marginBottom: '24px', textAlign: 'center', color: 'var(--text-secondary)', padding: '48px' }}>
          No financial data yet. Add revenue records to see charts.
        </div>
      )}

      {/* TODO: Add Fuel Efficiency Trend (LineChart) and Top 5 Cost Vehicles (BarChart) */}
    </div>
  );
}
