import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

interface LeadsFilterProps {
  searchTerm: string
  sourceFilter: string
  dealResultFilter: string
  onSearchTermChange: (value: string) => void
  onSourceFilterChange: (value: string) => void
  onDealResultFilterChange: (value: string) => void
  onClearFilters: () => void
  loading?: boolean
}

const LeadsFilter: React.FC<LeadsFilterProps> = ({
  searchTerm,
  sourceFilter,
  dealResultFilter,
  onSearchTermChange,
  onSourceFilterChange,
  onDealResultFilterChange,
  onClearFilters,
  loading = false,
}) => {
  const sourceOptions = [
    { value: 'All', label: 'All Sources' },
    { value: 'DealAnalyzer', label: 'Deal Analyzer' },
    { value: 'HELOC', label: 'HELOC' },
  ]

  const dealResultOptions = [
    { value: 'All', label: 'All Results' },
    { value: 'Great', label: 'Great' },
    { value: 'Fair', label: 'Fair' },
    { value: 'Poor', label: 'Poor' },
  ]

  const hasActiveFilters =
    searchTerm !== '' || sourceFilter !== 'All' || dealResultFilter !== 'All'

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex flex-col space-y-4">
        {/* Search Input */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email or IP address..."
            defaultValue={searchTerm}
            onChange={e => onSearchTermChange(e.target.value)}
            disabled={loading}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Source Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <select
              value={sourceFilter}
              onChange={e => onSourceFilterChange(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              {sourceOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Deal Result Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deal Result
            </label>
            <select
              value={dealResultFilter}
              onChange={e => onDealResultFilterChange(e.target.value)}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              {dealResultOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <button
              onClick={onClearFilters}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:cursor-not-allowed"
            >
              <FiX className="text-sm" />
              Clear Filters
            </button>
          </div>
        )}

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Search: "{searchTerm}"
                <button
                  onClick={() => onSearchTermChange('')}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}

            {sourceFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Source: {sourceFilter}
                <button
                  onClick={() => onSourceFilterChange('All')}
                  className="hover:bg-purple-200 rounded-full p-0.5"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
            {dealResultFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                Result: {dealResultFilter}
                <button
                  onClick={() => onDealResultFilterChange('All')}
                  className="hover:bg-yellow-200 rounded-full p-0.5"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadsFilter
