import { FiDownload } from 'react-icons/fi'

interface CSVColumn<T> {
  header: string
  accessor: keyof T | ((item: T) => string | number | boolean)
  formatter?: (value: any) => string
}

interface CSVExportProps<T> {
  data: T[]
  columns: CSVColumn<T>[]
  filename?: string
  buttonText?: string
  className?: string
}

function CSVExport<T>({
  data,
  columns,
  filename = 'export',
  buttonText = 'Export CSV',
  className = '',
}: CSVExportProps<T>) {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    // Create CSV header
    const headers = columns.map(col => col.header)

    // Create CSV rows
    const rows = data.map(item => {
      return columns.map(col => {
        let value: any

        // Get the value using accessor
        if (typeof col.accessor === 'function') {
          value = col.accessor(item)
        } else {
          value = item[col.accessor]
        }

        // Apply formatter if provided
        if (col.formatter) {
          value = col.formatter(value)
        }

        // Convert to string and handle special characters
        const stringValue = String(value || '')

        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (
          stringValue.includes(',') ||
          stringValue.includes('"') ||
          stringValue.includes('\n')
        ) {
          return `"${stringValue.replace(/"/g, '""')}"`
        }

        return stringValue
      })
    })

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n')

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  const defaultClassName =
    'flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'

  return (
    <button
      onClick={exportToCSV}
      className={className || defaultClassName}
      disabled={!data || data.length === 0}
    >
      <FiDownload className="text-lg" />
      {buttonText}
    </button>
  )
}

export default CSVExport
