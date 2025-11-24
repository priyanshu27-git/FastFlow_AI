import React, { useState } from 'react';
import { createTask } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function TaskInput(){
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const userId = 'demo-user-1';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!text.trim()) return;
    try{
      const res = await createTask({ userId, text, deadline });
      if(res.success){
        alert('Task added: ' + res.task.priorityLabel);
        navigate('/');
      }
    }catch(err){
      alert('Error adding task');
      console.error(err);
    }
  };

  return (
    <div style={{maxWidth:700, margin:'40px auto'}}>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <textarea rows={4} value={text} onChange={e=>setText(e.target.value)} style={{width:'100%'}} placeholder="Describe your task..."></textarea>
        <div style={{marginTop:8}}>
          <input type="datetime-local" value={deadline} onChange={e=>setDeadline(e.target.value)} />
        </div>
        <div style={{marginTop:12}}>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )
}
