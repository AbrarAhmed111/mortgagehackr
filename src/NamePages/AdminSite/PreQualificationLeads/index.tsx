'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Download,
  Search,
  Filter,
  Eye,
  Edit,
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  Home,
  CreditCard,
} from 'lucide-react'
import { getPreQualificationLeads, updatePreQualificationStatus } from '@/lib/actions/preQualification'
import toast from 'react-hot-toast'

interface PreQualificationLead {
  id: string
  name: string
  email: string
  phone: string
  loan_amount: string
  property_type: string
  credit_score: string
  message: string | null
  ip_address: string | null
  status: 'pending' | 'accepted' | 'rejected'
  submitted_at: string
  responded_at: string | null
}

export default function PreQualificationLeads() {
  const [leads, setLeads] = useState<PreQualificationLead[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalLeads, setTotalLeads] = useState(0)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLead, setSelectedLead] = useState<PreQualificationLead | null>(null)
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: 'pending',
    adminNotes: '',
  })

  // Debounced search function
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout
      return (value: string) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          setSearchTerm(value)
        }, 300)
      }
    })(),
    []
  )

  const limit = 10

  useEffect(() => {
    loadLeads()
  }, [currentPage, statusFilter])

  const loadLeads = async () => {
    try {
      setLoading(true)
      const result = await getPreQualificationLeads(currentPage, limit, statusFilter === 'all' ? undefined : statusFilter)
      
      if (result.success) {
        setLeads(result.data)
        setTotalPages(result.pagination.totalPages)
        setTotalLeads(result.pagination.total)
      } else {
        toast.error(result.error || 'Failed to load leads')
      }
    } catch (error) {
      console.error('Error loading leads:', error)
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async () => {
    if (!selectedLead || !statusUpdateData.status) return

    // Store original state for rollback
    const originalLeads = [...leads]
    
    // Optimistic update - update UI immediately
    const optimisticLeads = leads.map(lead => 
      lead.id === selectedLead.id 
        ? { ...lead, status: statusUpdateData.status as 'pending' | 'accepted' | 'rejected', responded_at: new Date().toISOString() }
        : lead
    )
    setLeads(optimisticLeads)

    try {
      setUpdatingStatus(selectedLead.id)
      const result = await updatePreQualificationStatus({
        id: selectedLead.id,
        status: statusUpdateData.status as 'pending' | 'accepted' | 'rejected',
        adminNotes: statusUpdateData.adminNotes || undefined,
      })

      if (result.success) {
        toast.success(result.success)
        setSelectedLead(null)
        setStatusUpdateData({ status: 'pending', adminNotes: '' })
        // Refresh data to ensure consistency
        setTimeout(() => loadLeads(), 500)
      } else {
        // Revert optimistic update on error
        setLeads(originalLeads)
        toast.error(result.error || 'Failed to update status')
      }
    } catch (error) {
      // Revert optimistic update on error
      setLeads(originalLeads)
      console.error('Error updating status:', error)
      toast.error('Failed to update status')
    } finally {
      setUpdatingStatus(null)
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Loan Amount',
      'Property Type',
      'Credit Score',
      'Message',
      'Status',
      'Submitted At',
      'Responded At',
      'IP Address'
    ]

    const csvData = leads.map(lead => [
      lead.name,
      lead.email,
      lead.phone,
      lead.loan_amount,
      lead.property_type,
      lead.credit_score,
      lead.message || '',
      lead.status,
      new Date(lead.submitted_at).toLocaleString(),
      lead.responded_at ? new Date(lead.responded_at).toLocaleString() : '',
      lead.ip_address || ''
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pre-qualification-leads-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Accepted</Badge>
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    lead.loan_amount.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pre-Qualification Leads</h1>
          <p className="text-gray-600">Manage and respond to pre-qualification requests</p>
        </div>
        <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Accepted</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'accepted').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{leads.filter(l => l.status === 'rejected').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{totalLeads}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, phone..."
                  defaultValue={searchTerm}
                  onChange={(e) => debouncedSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="accepted">Accepted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
                              <Button 
                  variant="outline" 
                  onClick={() => {
                    setStatusFilter('all')
                    setSearchTerm('')
                    setCurrentPage(1)
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pre-Qualification Leads</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Loan Details</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{lead.name}</p>
                            <p className="text-sm text-gray-500">{lead.ip_address}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="h-3 w-3 mr-1" />
                              {lead.email}
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="h-3 w-3 mr-1" />
                              {lead.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {lead.loan_amount}
                            </div>
                            <div className="flex items-center text-sm">
                              <Home className="h-3 w-3 mr-1" />
                              {lead.property_type}
                            </div>
                            <div className="flex items-center text-sm">
                              <CreditCard className="h-3 w-3 mr-1" />
                              {lead.credit_score}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(lead.status)}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(lead.submitted_at).toLocaleDateString()}</p>
                            <p className="text-gray-500">{new Date(lead.submitted_at).toLocaleTimeString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setSelectedLead(lead)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Lead Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Name</Label>
                                      <p className="font-medium">{lead.name}</p>
                                    </div>
                                    <div>
                                      <Label>Email</Label>
                                      <p className="font-medium">{lead.email}</p>
                                    </div>
                                    <div>
                                      <Label>Phone</Label>
                                      <p className="font-medium">{lead.phone}</p>
                                    </div>
                                    <div>
                                      <Label>Loan Amount</Label>
                                      <p className="font-medium">{lead.loan_amount}</p>
                                    </div>
                                    <div>
                                      <Label>Property Type</Label>
                                      <p className="font-medium">{lead.property_type}</p>
                                    </div>
                                    <div>
                                      <Label>Credit Score</Label>
                                      <p className="font-medium">{lead.credit_score}</p>
                                    </div>
                                  </div>
                                  {lead.message && (
                                    <div>
                                      <Label>Additional Message</Label>
                                      <p className="text-sm text-gray-600">{lead.message}</p>
                                    </div>
                                  )}
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Status</Label>
                                      <div className="mt-1">{getStatusBadge(lead.status)}</div>
                                    </div>
                                    <div>
                                      <Label>Submitted</Label>
                                      <p className="text-sm">{new Date(lead.submitted_at).toLocaleString()}</p>
                                    </div>
                                  </div>
                                  {lead.responded_at && (
                                    <div>
                                      <Label>Responded</Label>
                                      <p className="text-sm">{new Date(lead.responded_at).toLocaleString()}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedLead(lead)
                                    setStatusUpdateData({ status: 'pending', adminNotes: '' })
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Update Status</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                      value={statusUpdateData.status}
                                      onValueChange={(value) => setStatusUpdateData(prev => ({ ...prev, status: value }))}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="accepted">Accepted</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Admin Notes (Optional)</Label>
                                    <Textarea
                                      placeholder="Add notes for the user..."
                                      value={statusUpdateData.adminNotes}
                                      onChange={(e) => setStatusUpdateData(prev => ({ ...prev, adminNotes: e.target.value }))}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => {
                                        setSelectedLead(null)
                                        setStatusUpdateData({ status: 'pending', adminNotes: '' })
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      onClick={handleStatusUpdate}
                                      disabled={updatingStatus === lead.id}
                                    >
                                      {updatingStatus === lead.id ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Updating...
                                        </>
                                      ) : (
                                        'Update Status'
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <PaginationItem key={pageNum}>
                            <PaginationLink
                              onClick={() => setCurrentPage(pageNum)}
                              className={currentPage === pageNum ? 'bg-primary text-primary-foreground' : 'cursor-pointer'}
                            >
                              {pageNum}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      
                      {totalPages > 5 && (
                        <>
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(totalPages)}
                              className={currentPage === totalPages ? 'bg-primary text-primary-foreground' : 'cursor-pointer'}
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        </>
                      )}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 