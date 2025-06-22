import { FiDownload } from 'react-icons/fi'

interface ContactLead {
  name: string
  email: string
  message: string
  submitted_at: string
}

interface CSVExportProps {
  data: ContactLead[]
  filename?: string
  buttonText?: string
  className?: string
}

const CSVExport: React.FC<CSVExportProps> = ({
  data,
  filename = 'leads-export',
  buttonText = 'Export CSV',
  className = '',
}) => {
  const exportToCSV = () => {
    const csvContent = [
      // CSV Header
      ['Name', 'Email', 'Message', 'Submitted At', 'Created At'].join(','),
      // CSV rows
      ...data.map(lead =>
        [
          `"${lead.name}"`,
          `"${lead.email}"`,
          `"${lead.message.replace(/"/g, '""')}"`,
          new Date(lead.submitted_at).toLocaleDateString(),
        ].join(','),
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const defaultClassName =
    'flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors'

  return (
    <button onClick={exportToCSV} className={className || defaultClassName}>
      <FiDownload className="text-lg" />
      {buttonText}
    </button>
  )
}

export default CSVExport
