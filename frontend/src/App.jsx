import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TaskInput from './components/TaskInput';

export default function App(){
  return (
    <BrowserRouter>
      <div style={{padding:20}}>
        <nav style={{marginBottom:20}}>
          <Link to="/">Dashboard</Link> | <Link to="/add" style={{marginLeft:10}}>Add Task</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/add" element={<TaskInput/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
