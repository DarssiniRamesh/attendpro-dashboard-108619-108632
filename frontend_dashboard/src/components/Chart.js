import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const COLORS = ['#1976d2', '#fbc02d', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];

// PUBLIC_INTERFACE
function Chart({ type, data, title, width = "100%", height = 300, xKey, yKey, colors = COLORS }) {
  /**
   * Reusable chart component using Recharts
   * @param {string} type - Chart type: 'bar', 'line', 'pie'
   * @param {Array} data - Chart data array
   * @param {string} title - Chart title
   * @param {string|number} width - Chart width
   * @param {number} height - Chart height
   * @param {string} xKey - X-axis data key
   * @param {string} yKey - Y-axis data key
   * @param {Array} colors - Color palette
   */
  
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Bar dataKey={yKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <YAxis 
              tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--border-color)' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={colors[0]} 
              strokeWidth={3}
              dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: colors[0] }}
            />
          </LineChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Legend />
          </PieChart>
        );
        
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 16px var(--shadow-light)',
      border: '1px solid var(--border-light)',
      marginBottom: '20px'
    }}>
      {title && (
        <h3 style={{
          color: 'var(--text-primary)',
          marginBottom: '16px',
          fontSize: '18px',
          fontWeight: '600'
        }}>
          {title}
        </h3>
      )}
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
