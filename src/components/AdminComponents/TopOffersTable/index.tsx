// components/TopOffersTable.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { getTopOffers } from '@/lib/actions/analytics'

interface TopOffer {
  id: number
  lender_name: string
  expiration_date: string
  click_count: number
}

const TopOffersTable: React.FC = () => {
  const [topOffers, setTopOffers] = useState<TopOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopOffers = async () => {
      try {
        setLoading(true)
        const offers = await getTopOffers()
        setTopOffers(offers || [])
      } catch (err) {
        console.error('Error fetching top offers:', err)
        setError('Failed to load top offers')
      } finally {
        setLoading(false)
      }
    }

    fetchTopOffers()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="flex items-center space-x-2">
          <span className="text-gray-600">Loading offers...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Top Performing Offers
        </h2>
      </div>
      <div className="overflow-x-auto">
        {topOffers.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Lender
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Clicks
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">
                  Expiration
                </th>
              </tr>
            </thead>
            <tbody>
              {topOffers.map((offer, index) => (
                <tr key={offer.id} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3 ${
                          index === 0
                            ? 'bg-yellow-500'
                            : index === 1
                              ? 'bg-gray-400'
                              : index === 2
                                ? 'bg-orange-500'
                                : 'bg-blue-500'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">
                        {offer.lender_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {offer.click_count}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(offer.expiration_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            No offers data available
          </div>
        )}
      </div>
    </div>
  )
}

export default TopOffersTable
