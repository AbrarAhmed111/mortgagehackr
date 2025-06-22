// components/StatsCards.tsx
'use client'
import React from 'react'
import { FiTrendingUp } from 'react-icons/fi'
import { TbHandClick } from 'react-icons/tb'
import { SiGoogleadsense } from 'react-icons/si'
import { GoDotFill } from 'react-icons/go'
interface StatsCardsProps {
  totalClicks: number
  totalLeads: number
  activeOffers: number
  activeOfferPercentage: number
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalClicks,
  totalLeads,
  activeOffers,
  activeOfferPercentage,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Clicks Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-blue-500">
            <TbHandClick className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Total Clicks
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalClicks.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Total Leads Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-green-500">
            <SiGoogleadsense className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Total Leads
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {totalLeads.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Active Offers Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg border  bg-gray-200">
            <GoDotFill className="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Active Offers
          </h3>
          <p className="text-2xl font-bold text-gray-900">{activeOffers}</p>
        </div>
      </div>

      {/* Offer Success Rate Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg bg-purple-500">
            <FiTrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Active Offer Rate
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {activeOfferPercentage.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatsCards
