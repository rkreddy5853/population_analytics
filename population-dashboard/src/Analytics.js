// Analytics.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = ({ topCountriesData }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={topCountriesData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="population" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Analytics;
