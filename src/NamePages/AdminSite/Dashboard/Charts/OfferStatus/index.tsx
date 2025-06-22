// components/Charts/OfferStatusChart.tsx
'use client'
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

interface OfferStatusChartProps {
  active: number
  inactive: number
}

const COLORS = ['#0088FE', '#00C49F']

const OfferStatus: React.FC<OfferStatusChartProps> = ({ active, inactive }) => {
  const data = [
    { name: 'Active Offers', value: active },
    { name: 'Inactive Offers', value: inactive },
  ].filter(item => item.value > 0)

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${payload[0].name}`}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {`Count: ${payload[0].value}`}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Offer Status</h2>
      </div>
      <div className="h-64">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No offer status data available
          </div>
        )}
      </div>
      {data.length > 0 && (
        <div className="space-y-2 mt-4">
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-gray-600">{entry.name}</span>
              </div>
              <span className="font-medium text-gray-900">{entry.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OfferStatus
