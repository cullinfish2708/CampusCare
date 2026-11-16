import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import NewRequest from './pages/NewRequest';
import RequestDetails from './pages/RequestDetails';
import Activity from './pages/Activity';
export default function App(){return <Routes><Route element={<Layout/>}><Route index element={<Dashboard/>}/><Route path="requests" element={<Requests/>}/><Route path="requests/:id" element={<RequestDetails/>}/><Route path="new" element={<NewRequest/>}/><Route path="activity" element={<Activity/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
