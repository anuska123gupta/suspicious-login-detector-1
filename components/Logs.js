import React from 'react';
import './Logs.css';

function Logs({ logs }) {
  return (
    <div className="logs-container">
      <h2>Activity Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default Logs;
