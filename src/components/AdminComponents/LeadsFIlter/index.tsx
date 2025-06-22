import { FiX } from 'react-icons/fi'

interface Lead {
  id: string
  name: string
  email?: string
  phone: string
  source: string
  dealAnalyzerResult?: 'Great' | 'Fair' | 'Poor'
  propertyAddress?: string
  estimatedValue?: number
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost'
  createdAt: string
  lastContact?: string
}

interface LeadsFilterProps {
  leads: Lead[]
  statusFilter: string
  sourceFilter: string
  dealResultFilter: string
  onStatusFilterChange: (value: string) => void
  onSourceFilterChange: (value: string) => void
  onDealResultFilterChange: (value: string) => void
  onClearFilters: () => void
}

const LeadsFilter: React.FC<LeadsFilterProps> = ({
  leads,
  statusFilter,
  sourceFilter,
  dealResultFilter,
  onStatusFilterChange,
  onSourceFilterChange,
  onDealResultFilterChange,
  onClearFilters,
}) => {
  // Get unique values for filter options
  const uniqueStatuses = Array.from(new Set(leads.map(lead => lead.status)))
  const uniqueSources = Array.from(new Set(leads.map(lead => lead.source)))
  const uniqueDealResults = Array.from(
    new Set(leads.map(lead => lead.dealAnalyzerResult).filter(Boolean)),
  )

  return (
    <div className="bg-gray-50 p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={e => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Statuses</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Source
          </label>
          <select
            value={sourceFilter}
            onChange={e => onSourceFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Sources</option>
            {uniqueSources.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Result
          </label>
          <select
            value={dealResultFilter}
            onChange={e => onDealResultFilterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Results</option>
            {uniqueDealResults.map(result => (
              <option key={result} value={result}>
                {result}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={onClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FiX className="text-lg" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeadsFilter
