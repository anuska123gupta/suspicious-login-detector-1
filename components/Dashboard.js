import React from 'react';
import Button from './Button';
import './Dashboard.css';

function Dashboard({ handleAction }) {
  return (
    <div className="dashboard">
      <Button text="Start Detection" onClick={() => handleAction("Detection Started")} />
      <Button text="Stop Detection" onClick={() => handleAction("Detection Stopped")} />
      <Button text="View Reports" onClick={() => handleAction("Viewing Reports")} />
    </div>
  );
}

export default Dashboard;
