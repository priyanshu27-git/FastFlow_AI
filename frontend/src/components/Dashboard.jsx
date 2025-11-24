import React, { useEffect, useState } from 'react';
import { getUserTasks } from '../services/api';
import TaskCard from './TaskCard';

export default function Dashboard(){
  const userId = 'demo-user-1';
  const [tasks, setTasks] = useState([]);

  useEffect(()=>{
    const load = async ()=>{
      const res = await getUserTasks(userId);
      if(res.success) setTasks(res.tasks);
    };
    load();
  },[]);

  return (
    <div style={{maxWidth:900, margin:'40px auto'}}>
      <h1>FastFlow AI — Dashboard</h1>
      <div>
        {tasks.length===0 && <p>No tasks yet. Add one.</p>}
        {tasks.map(t=> <TaskCard key={t.taskId} task={t} />)}
      </div>
    </div>
  )
}
