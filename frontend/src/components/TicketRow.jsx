import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, label } from '../api';
import StatusPill from './StatusPill';
export default function TicketRow({ ticket }) {
 return <Link className="ticket-row" to={`/requests/${ticket.id}`}>
  <div className="ticket-row-main"><div className="ticket-code">{ticket.ticketCode}</div><strong>{ticket.title}</strong><span>{ticket.location} · {ticket.requesterName}</span></div>
  <div className="ticket-row-side"><span className={`priority priority-${ticket.priority.toLowerCase()}`}>{label(ticket.priority)}</span><StatusPill value={ticket.status}/><time>{formatDate(ticket.createdAt,{dateStyle:'medium',timeStyle:undefined})}</time></div>
 </Link>;
}
