import React from 'react';
const colorMap = { Critical:'#ff3b30', High:'#ff9500', Medium:'#ffd60a', Low:'#8e8e93' };

export default function TaskCard({ task }){
  return (
    <div style={{ border:`2px solid ${colorMap[task.priorityLabel]||'#ccc'}`, padding:12, marginBottom:12, borderRadius:8 }}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <h3>{task.summary || task.text}</h3>
        <div style={{fontWeight:'bold'}}>{task.priorityLabel}</div>
      </div>
      <p style={{marginTop:8}}>{task.text}</p>
      <div style={{fontSize:13, color:'#666'}}>Deadline: {task.deadline || '—'} | Est: {task.duration || '—'} mins</div>
    </div>
  )
}
