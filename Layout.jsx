import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/app', label: 'Dashboard', icon: '⬛', end: true },
  { path: '/app/vehicles', label: 'Vehicle Registry', icon: '🚛' },
  { path: '/app/trips', label: 'Trip Dispatcher', icon: '📍' },
  { path: '/app/maintenance', label: 'Maintenance', icon: '🔧' },
  { path: '/app/revenue', label: 'Revenue & Fuel', icon: '💰' },
  { path: '/app/drivers', label: 'Driver Profiles', icon: '👤' },
  { path: '/app/analytics', label: 'Analytics', icon: '📊' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo">Fleet<span>Flow</span></div>
        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>{user?.name}</div>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', fontSize: '0.75rem' }}>
            Logout
          </button>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
