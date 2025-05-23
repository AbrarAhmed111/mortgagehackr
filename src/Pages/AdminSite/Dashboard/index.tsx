'use client'
import React from 'react'
import {
  FiUsers,
  FiShoppingCart,
  FiDollarSign,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiMenu,
  FiBell,
  FiSettings,
  FiLogOut,
  FiSearch,
} from 'react-icons/fi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'

// Types
interface StatCard {
  id: number
  title: string
  value: string
  change: number
  changeType: 'increase' | 'decrease'
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface ChartData {
  name: string
  value: number
  sales?: number
  users?: number
  revenue?: number
}

const Dashboard: React.FC = () => {
  // Sample data for cards
  const statsCards: StatCard[] = [
    {
      id: 1,
      title: 'Total Users',
      value: '12,345',
      change: 12.5,
      changeType: 'increase',
      icon: FiUsers,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Total Orders',
      value: '2,847',
      change: 8.2,
      changeType: 'increase',
      icon: FiShoppingCart,
      color: 'bg-green-500',
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$45,678',
      change: -2.1,
      changeType: 'decrease',
      icon: FiDollarSign,
      color: 'bg-yellow-500',
    },
    {
      id: 4,
      title: 'Growth Rate',
      value: '23.5%',
      change: 5.7,
      changeType: 'increase',
      icon: FiTrendingUp,
      color: 'bg-purple-500',
    },
  ]

  interface LineChartData {
    name: string
    sales: number
    users: number
    revenue: number
  }

  // Sample data for line chart
  const lineChartData: LineChartData[] = [
    { name: 'Jan', sales: 4000, users: 2400, revenue: 2400 },
    { name: 'Feb', sales: 3000, users: 1398, revenue: 2210 },
    { name: 'Mar', sales: 2000, users: 9800, revenue: 2290 },
    { name: 'Apr', sales: 2780, users: 3908, revenue: 2000 },
    { name: 'May', sales: 1890, users: 4800, revenue: 2181 },
    { name: 'Jun', sales: 2390, users: 3800, revenue: 2500 },
    { name: 'Jul', sales: 3490, users: 4300, revenue: 2100 },
  ]

  // Sample data for bar chart
  const barChartData: ChartData[] = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 590 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 450 },
  ]

  // Sample data for pie chart
  const pieChartData: ChartData[] = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 35 },
    { name: 'Tablet', value: 20 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map(card => {
            const IconComponent = card.icon
            return (
              <div
                key={card.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${card.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div
                    className={`flex items-center text-sm font-medium ${
                      card.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {card.changeType === 'increase' ? (
                      <FiArrowUp className="h-4 w-4 mr-1" />
                    ) : (
                      <FiArrowDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(card.change)}%
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Revenue Analytics
              </h2>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
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
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Weekly Activity
              </h2>
            </div>
            <div className="h-80">
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
            </div>
          </div>
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Area Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                User Growth
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">New Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-600">Returning Users</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineChartData}>
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
                  <Area
                    type="monotone"
                    dataKey="users"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Device Usage
              </h2>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {pieChartData.map((entry, index) => (
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
                  <span className="font-medium text-gray-900">
                    {entry.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
