import React, { useState, useEffect } from 'react';

// --- MOCK DATA ---
const initialAlerts = [
  {
    id: 'a1',
    ip: '81.2.69.142',
    timestamp: '2025-09-25T23:40:15Z',
    country: 'United Kingdom',
    city: 'London',
    device: 'Desktop',
    os: 'Windows 10',
    browser: 'Chrome 115',
    rtt: 120,
    riskLevel: 'High',
    isAttack: true,
    reason: 'Login from a known malicious IP address and unusual location for this user.'
  },
  {
    id: 'a2',
    ip: '103.27.132.190',
    timestamp: '2025-09-25T23:39:55Z',
    country: 'India',
    city: 'Mumbai',
    device: 'Mobile',
    os: 'Android 13',
    browser: 'Firefox 112',
    rtt: 85,
    riskLevel: 'Medium',
    isAttack: false,
    reason: 'Successful login but with a significantly higher RTT than usual for this region.'
  },
  {
    id: 'a3',
    ip: '197.210.65.112',
    timestamp: '2025-09-25T23:39:21Z',
    country: 'Nigeria',
    city: 'Lagos',
    device: 'Desktop',
    os: 'Linux',
    browser: 'Chrome 114',
    rtt: 250,
    riskLevel: 'High',
    isAttack: true,
    reason: 'Impossible travel scenario. User logged in from Norway 20 minutes prior.'
  },
    {
    id: 'a4',
    ip: '47.91.68.231',
    timestamp: '2025-09-25T23:38:40Z',
    country: 'Norway',
    city: 'Oslo',
    device: 'Desktop',
    os: 'macOS',
    browser: 'Safari 16.5',
    rtt: 15,
    riskLevel: 'Low',
    isAttack: false,
    reason: 'Typical login from a recognized device and location.'
  }
];

// --- COMPONENTS (These are unchanged) ---

const Header = () => (
  <header className="header">
    <h1>Cyberattack Detection System</h1>
    <div className="status-indicator">
      <div className="dot"></div>
      <span>Real-time Monitoring</span>
    </div>
  </header>
);

const KeyMetrics = ({ alerts }) => {
  const totalLogins = 53201 + alerts.length - initialAlerts.length; // Now dynamic!
  const suspiciousCount = alerts.filter(a => a.riskLevel !== 'Low').length;
  const accountsAtRisk = alerts.filter(a => a.isAttack).length;

  return (
    <div className="key-metrics-card">
      <div className="metric-item">
        <h3>Total Logins (24h)</h3>
        <div className="value">{totalLogins.toLocaleString()}</div>
      </div>
      <div className="metric-item">
        <h3>Suspicious Activity</h3>
        <div className="value">{suspiciousCount}</div>
      </div>
      <div className="metric-item">
        <h3>Accounts At Risk</h3>
        <div className="value" style={{ color: 'var(--red-accent)' }}>{accountsAtRisk}</div>
      </div>
    </div>
  );
};

const AlertsFeed = ({ alerts, onSelectAlert, selectedAlert }) => (
  <div className="dashboard-card alerts-feed">
    <h2>Real-time Alerts</h2>
    <div className="alerts-list">
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className={`alert-item ${selectedAlert?.id === alert.id ? 'selected' : ''}`}
          onClick={() => onSelectAlert(alert)}
        >
          <div className="alert-info">
            <div className="ip">{alert.ip}</div>
            <div className="location">{`${alert.city}, ${alert.country}`}</div>
          </div>
          <div className={`risk-level ${alert.riskLevel}`}>{alert.riskLevel}</div>
        </div>
      ))}
    </div>
  </div>
);

const AlertDetails = ({ alert }) => {
  if (!alert) {
    return (
      <div className="dashboard-card alert-details" style={{ display: 'grid', placeContent: 'center' }}>
        <p>Select an alert to view details</p>
      </div>
    );
  }

  return (
    <div className="dashboard-card alert-details">
      <h2>Alert Details: {alert.ip}</h2>
      <div className="detail-grid">
        <div className="detail-item"><strong>Geolocation</strong> {`${alert.city}, ${alert.country}`}</div>
        <div className="detail-item"><strong>Device Type</strong> {alert.device}</div>
        <div className="detail-item"><strong>Operating System</strong> {alert.os}</div>
        <div className="detail-item"><strong>Browser</strong> {alert.browser}</div>
        <div className="detail-item"><strong>Round-Trip Time</strong> {alert.rtt} ms</div>
        <div className="detail-item"><strong>Timestamp</strong> {new Date(alert.timestamp).toLocaleString()}</div>
        <div className="detail-item" style={{ gridColumn: 'span 2' }}>
          <strong>Risk Analysis</strong>
          <span style={{ color: alert.isAttack ? 'var(--red-accent)' : 'var(--lightest-slate)'}}>
            {alert.reason}
          </span>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP ---
function App() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  // --- NEW: Simulate real-time data arriving every 5 seconds ---
  useEffect(() => {
    const interval = setInterval(() => {
      // Create a new mock alert
      const newAlert = {
        id: `a${Date.now()}`, // Unique ID based on timestamp
        ip: '203.0.113.25',
        timestamp: new Date().toISOString(),
        country: 'Japan',
        city: 'Tokyo',
        device: 'Mobile',
        os: 'iOS 17',
        browser: 'Safari 17.0',
        rtt: 150,
        riskLevel: 'Medium',
        isAttack: false,
        reason: 'Suspicious login from a new device for this user account.'
      };

      // Add the new alert to the top of the list
      // This uses the 'setAlerts' function we talked about!
      setAlerts(currentAlerts => [newAlert, ...currentAlerts]);

    }, 5000); // 5000 milliseconds = 5 seconds

    // Cleanup the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, []); // The empty array [] means this effect runs only once when the app starts

  // On first load, select the highest priority alert
  useEffect(() => {
    if (!selectedAlert && alerts.length > 0) {
      const highPriorityAlert = alerts.find(a => a.riskLevel === 'High');
      setSelectedAlert(highPriorityAlert || alerts[0]);
    }
  }, [alerts, selectedAlert]);


  return (
    <div className="app-container">
      <Header />
      <div className="dashboard-grid">
        <div className="key-metrics-card" style={{ gridColumn: 'span 12' }}>
          <KeyMetrics alerts={alerts} />
        </div>
        
        <AlertsFeed 
          alerts={alerts} 
          selectedAlert={selectedAlert}
          onSelectAlert={setSelectedAlert} 
        />

        <AlertDetails alert={selectedAlert} />
      </div>
    </div>
  );
}

export default App;