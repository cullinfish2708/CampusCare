import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, label } from '../api';
import MetricCard from '../components/MetricCard';
import TicketRow from '../components/TicketRow';

export default function Dashboard() {
 const [summary,setSummary]=useState(null), [tickets,setTickets]=useState([]), [error,setError]=useState(''), [loading,setLoading]=useState(true);
 useEffect(()=>{Promise.all([api.summary(),api.tickets()]).then(([s,t])=>{setSummary(s);setTickets(t.slice(0,5));}).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[]);
 const total=summary?.total||0;
 return <div className="page-stack">
  <section className="welcome-row"><div><div className="eyebrow">CAMPUS SUPPORT CENTER</div><h1>Good morning, <em>Campus.</em></h1><p>One place to raise issues, follow progress and keep the campus moving.</p></div><Link className="button button-primary" to="/new"><span>＋</span> Create request</Link></section>
  {error&&<div className="alert alert-error">{error} · Start the API and database to load live data.</div>}
  <section className="metric-grid">
   <MetricCard label="Total requests" value={loading?'…':total} hint="All requests recorded" symbol="▤" tone="mint"/>
   <MetricCard label="Open requests" value={loading?'…':summary?.open} hint="Awaiting assignment" symbol="◷" tone="amber"/>
   <MetricCard label="In progress" value={loading?'…':summary?.inProgress} hint="Being worked on" symbol="↗" tone="blue"/>
   <MetricCard label="Resolved" value={loading?'…':summary?.resolved} hint="Completed requests" symbol="✓" tone="violet"/>
  </section>
  <section className="dashboard-grid">
   <div className="panel recent-panel"><div className="panel-heading"><div><div className="eyebrow">LIVE QUEUE</div><h2>Recent requests</h2></div><Link to="/requests" className="text-link">View all <span>→</span></Link></div>
    {tickets.length? <div className="ticket-list">{tickets.map(t=><TicketRow key={t.id} ticket={t}/>)}</div> : <div className="empty-state"><div className="empty-icon">▤</div><b>{loading?'Loading requests…':'No requests yet'}</b><span>{loading?'Fetching current queue':'Create the first request to start the queue.'}</span></div>}
   </div>
   <div className="panel category-panel"><div className="eyebrow">REQUEST BREAKDOWN</div><h2>By category</h2><p className="muted-copy">Distribution across support areas.</p>
    <div className="category-bars">{Object.entries(summary?.byCategory||{}).map(([key,value],i)=><div className="category-bar" key={key}><div className="bar-label"><span>{label(key)}</span><b>{value}</b></div><div className="bar-track"><span style={{width:`${total?Math.max(3,value/total*100):0}%`}} className={`bar-fill bar-${i%5}`}/></div></div>)}</div>
    <div className="urgent-callout"><span>!</span><div><b>{summary?.urgent||0} urgent requests</b><small>Prioritise issues that may interrupt campus activity.</small></div></div>
   </div>
  </section>
  <section className="info-strip"><div className="info-icon">✦</div><div><b>Keep requests clear and actionable</b><span>Add a precise location, useful details and a reachable campus email so the team can respond faster.</span></div><Link to="/new" className="text-link">Raise an issue →</Link></section>
 </div>;
}
