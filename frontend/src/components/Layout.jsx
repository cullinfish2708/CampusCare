import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
const links = [
  { to: '/', title: 'Overview', icon: '⌂', end: true },
  { to: '/requests', title: 'All requests', icon: '▤' },
  { to: '/new', title: 'Submit request', icon: '+' },
  { to: '/activity', title: 'Activity log', icon: '◷' },
];
const heading = { '/': 'Overview', '/requests': 'Request management', '/new': 'Submit a request', '/activity': 'Activity log' };
export default function Layout() {
 const location = useLocation();
 const title = location.pathname.startsWith('/requests/') ? 'Request details' : heading[location.pathname] || 'CampusCare';
 return <div className="app-shell">
  <aside className="sidebar">
   <div className="brand"><div className="brand-mark">C<span>+</span></div><div><b>campuscare</b><small>CAMPUS HELPDESK</small></div></div>
   <div className="workspace-label">WORKSPACE</div>
   <nav>{links.map(item => <NavLink key={item.to} to={item.to} end={item.end} className={({isActive})=>`nav-link ${isActive?'active':''}`}><span className="nav-icon">{item.icon}</span>{item.title}{item.to==='/new'&&<span className="nav-shortcut">NEW</span>}</NavLink>)}</nav>
   <div className="sidebar-bottom"><div className="help-card"><span className="help-light"/><b>Helpdesk is online</b><small>Requests are monitored by the campus support team.</small></div><div className="profile"><div className="avatar">CC</div><div><b>Campus Support</b><small>Demo workspace</small></div><span className="profile-dots">•••</span></div></div>
  </aside>
  <main className="main-area"><header className="topbar"><div className="mobile-brand"><div className="brand-mark">C<span>+</span></div><b>campuscare</b></div><div className="breadcrumb">Workspace <span>/</span> <b>{title}</b></div><div className="topbar-right"><span className="system-status"><i/> System operational</span><div className="top-avatar">CC</div></div></header><div className="content-area"><Outlet/></div><footer className="footer">CampusCare · SRM Institute of Science and Technology · Demo environment</footer></main>
 </div>;
}
