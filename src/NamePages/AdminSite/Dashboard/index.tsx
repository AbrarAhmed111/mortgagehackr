'use client'
import React, { useState, useEffect } from 'react'
import {
  getTopOffers,
  getClicksOverTime,
  getOfferStatusCounts,
  getLeadsBySource,
} from '@/lib/actions/analytics'
import TopOffersTable from '@/components/AdminComponents/TopOffersTable'
import LeadsBySource from './Charts/LeadsBySource'
import StatsCards from './Charts/StatsCard'
import OfferStatus from './Charts/OfferStatus'
import DashboardSkeleton from '@/components/AdminComponents/Skeleton'
import { LeadsData, OfferStatusData, TopOffer } from '@/utils/types'

const Dashboard: React.FC = () => {
  const [topOffers, setTopOffers] = useState<TopOffer[]>([])
  const [offerStatus, setOfferStatus] = useState<OfferStatusData>({
    active: 0,
    inactive: 0,
  })
  const [leadsData, setLeadsData] = useState<LeadsData>({
    contactLeads: 0,
    helocLeads: 0,
    dealAnalyzerLeads: { Great: 0, Fair: 0, Poor: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day')

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [offers, clicks, status, leads] = await Promise.all([
          getTopOffers(),
          getClicksOverTime(timeframe),
          getOfferStatusCounts(),
          getLeadsBySource(),
        ])

        // Set top offers
        setTopOffers(offers || [])
        // Set offer status
        if (status && !status.error) {
          setOfferStatus(status)
        }

        // Set leads data
        if (leads && !leads.error) {
          setLeadsData(leads)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [timeframe])

  // Calculate stats for cards from real data
  const totalClicks = topOffers.reduce(
    (sum, offer) => sum + offer.click_count,
    0,
  )
  const totalOffers = offerStatus.active + offerStatus.inactive
  const totalLeads =
    leadsData.contactLeads +
    leadsData.helocLeads +
    Object.values(leadsData.dealAnalyzerLeads).reduce(
      (sum, count) => sum + count,
      0,
    )
  const activeOfferPercentage =
    totalOffers > 0 ? (offerStatus.active / totalOffers) * 100 : 0

  if (loading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading dashboard</div>
          <div className="text-gray-600">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="p-6">
        {/* Header with timeframe selector */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-2">
            {(['day', 'week', 'month'] as const).map(period => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  timeframe === period
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalClicks={totalClicks}
          totalLeads={totalLeads}
          activeOffers={offerStatus.active}
          activeOfferPercentage={activeOfferPercentage}
        />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart - Offer Status */}
          <OfferStatus
            active={offerStatus.active}
            inactive={offerStatus.inactive}
          />{' '}
          {/* Bar Chart - Leads by Source */}
          <LeadsBySource leadsData={leadsData} />
        </div>

        {/* Bottom Charts */}
        <div className="w-full gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border-gray-200">
            <TopOffersTable />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
