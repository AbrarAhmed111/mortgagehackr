// components/LeadsBySourceChart.tsx
'use client'
import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface LeadsData {
  contactLeads: number
  helocLeads: number
  dealAnalyzerLeads: {
    Great: number
    Fair: number
    Poor: number
  }
}

interface LeadsBySourceChartProps {
  leadsData: LeadsData
}

const LeadsBySource: React.FC<LeadsBySourceChartProps> = ({ leadsData }) => {
  // Prepare data for the chart
  const barChartData = [
    { name: 'Contact Leads', value: leadsData.contactLeads },
    { name: 'HELOC Leads', value: leadsData.helocLeads },
    { name: 'Great Deals', value: leadsData.dealAnalyzerLeads.Great },
    { name: 'Fair Deals', value: leadsData.dealAnalyzerLeads.Fair },
    { name: 'Poor Deals', value: leadsData.dealAnalyzerLeads.Poor },
  ].filter(item => item.value > 0) // Only show non-zero values

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Leads by Source</h2>
      </div>
      <div className="h-80">
        {barChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="#8b5cf6"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No leads data available
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadsBySource
