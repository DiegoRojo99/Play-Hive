import React from 'react';

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 50;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text x="50%" y="50%" textAnchor="middle" stroke="#333" strokeWidth="1px" dy=".3em">
          {percentage.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
