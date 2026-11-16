import React,{useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {api,label} from '../api';
import TicketRow from '../components/TicketRow';
const statuses=['','OPEN','IN_PROGRESS','RESOLVED','CLOSED'];
const categories=['','IT_SUPPORT','ELECTRICAL','PLUMBING','CLASSROOM','HOSTEL','CLEANLINESS','OTHER'];
export default function Requests(){
 const [tickets,setTickets]=useState([]),[q,setQ]=useState(''),[status,setStatus]=useState(''),[category,setCategory]=useState(''),[error,setError]=useState(''),[loading,setLoading]=useState(true);
 useEffect(()=>{setLoading(true);api.tickets({q,status,category}).then(setTickets).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[q,status,category]);
 return <div className="page-stack">
  <section className="page-heading-row"><div><div className="eyebrow">CAMPUS SUPPORT</div><h1>All requests</h1><p>Search, filter and follow every issue submitted to the helpdesk.</p></div><Link className="button button-primary" to="/new">＋ New request</Link></section>
  <section className="panel filter-panel"><div className="search-box"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title, ticket ID, person or location…" aria-label="Search requests"/></div><select value={status} onChange={e=>setStatus(e.target.value)} aria-label="Filter by status"><option value="">All statuses</option>{statuses.slice(1).map(v=><option key={v} value={v}>{label(v)}</option>)}</select><select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter by category"><option value="">All categories</option>{categories.slice(1).map(v=><option key={v} value={v}>{label(v)}</option>)}</select><span className="result-count">{tickets.length} result{tickets.length===1?'':'s'}</span></section>
  {error&&<div className="alert alert-error">{error}</div>}
  <section className="panel list-panel"><div className="list-head"><span>REQUEST</span><span>PRIORITY / STATUS</span></div>{loading?<div className="empty-state">Loading requests…</div>:tickets.length?<div className="ticket-list">{tickets.map(t=><TicketRow key={t.id} ticket={t}/>)}</div>:<div className="empty-state"><div className="empty-icon">⌕</div><b>No matching requests</b><span>Try a different search or clear your filters.</span><button className="button button-quiet" onClick={()=>{setQ('');setStatus('');setCategory('')}}>Clear filters</button></div>}</section>
 </div>;
}
