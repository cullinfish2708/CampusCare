import React from 'react';
import { label } from '../api';
export default function StatusPill({ value }) { return <span className={`pill pill-${String(value).toLowerCase()}`}>{label(value)}</span>; }
