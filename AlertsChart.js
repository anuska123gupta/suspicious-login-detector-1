import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// This component is responsible for rendering the line chart.
// It receives the processed 'data' as a prop from App.js.
const AlertsChart = ({ data }) => {
  return (
    // ResponsiveContainer makes the chart fill its parent div.
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        {/* CartesianGrid adds the background grid for readability */}
        <CartesianGrid strokeDasharray="3 3" stroke="#233554" />
        
        {/* XAxis defines the horizontal axis (our timestamps) */}
        <XAxis dataKey="time" stroke="#a8b2d1" />
        
        {/* YAxis defines the vertical axis (number of alerts) */}
        {/* allowDecimals={false} ensures we only see whole numbers like 1, 2, 3 */}
        <YAxis allowDecimals={false} stroke="#a8b2d1" />
        
        {/* Tooltip shows details when you hover over a data point */}
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#112240', 
            borderColor: '#233554' 
          }} 
        />
        
        {/* Legend displays the name of the data line */}
        <Legend />
        
        {/* Line defines the actual line on the chart */}
        <Line 
          type="monotone" 
          dataKey="alerts" // This should match the key in our data objects
          stroke="#64ffda"  // The accent color for the line
          strokeWidth={2}
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AlertsChart;