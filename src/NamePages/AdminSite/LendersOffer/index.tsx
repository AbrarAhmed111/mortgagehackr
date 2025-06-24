'use client'
import { useState, useEffect } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { FiPlus } from 'react-icons/fi'
import {
  createOffer,
  deleteOffer,
  getOffersWithLink,
  toggleOfferStatus,
  updateLenderOffer,
} from '@/lib/actions/lenderOffers'
import { StatusDropdown } from './Modals/StatusUpdateDropdown'
import { AddOfferModal } from './Modals/AddOfferModal'
import { UpdateOfferModal } from './Modals/UpdateOfferModal'
import { DeleteOfferModal } from './Modals/DeleteOfferModal'
import toast from 'react-hot-toast'
import { DataTableSkeleton } from '@/components/AdminComponents/Skeleton/DataTableSkeleton'
import CSVExport from '@/components/AdminComponents/ExportCSV'
import { lenderOfferCSVColumns } from '@/utils'

type LenderOffer = {
  id: string
  lender_name: string
  interest_rate: number
  apr: number
  loan_term: number
  eligibility?: string
  cta_link: string
  expiration_date: string
  status: boolean
  click_count?: number
  created_at?: string
  updated_at?: string
}

type Column<T> = {
  header: string
  accessor: keyof T | ((item: T) => React.ReactNode)
  render?: (item: T) => React.ReactNode
}

const LendersOfferManagement: React.FC = () => {
  const [offers, setOffers] = useState<LenderOffer[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<LenderOffer | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const itemsPerPage = 8

  // Load offers on component mount
  useEffect(() => {
    loadOffers()
  }, [])

  const loadOffers = async () => {
    try {
      setLoading(true)
      const data = await getOffersWithLink()
      setOffers(data)
    } catch (error) {
      console.error('Error loading offers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const columns: Column<LenderOffer>[] = [
    {
      header: 'Lender Name',
      accessor: 'lender_name',
    },
    {
      header: 'Interest Rate',
      accessor: (offer: LenderOffer) => `${offer.interest_rate}%`,
    },
    {
      header: 'APR',
      accessor: (offer: LenderOffer) => `${offer.apr}%`,
    },
    {
      header: 'Loan Term',
      accessor: (offer: LenderOffer) => `${offer.loan_term} months`,
    },
    {
      header: 'Eligibility',
      accessor: (offer: LenderOffer) => (
        <div className="max-w-xs truncate" title={offer.eligibility || 'N/A'}>
          {offer.eligibility || 'N/A'}
        </div>
      ),
    },
    {
      header: 'CTA Link',
      accessor: (offer: LenderOffer) => (
        <div className="max-w-xs truncate">
          <a
            href={offer.cta_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
            title={offer.cta_link}
          >
            {offer.cta_link}
          </a>
        </div>
      ),
    },
    {
      header: 'Clicks',
      accessor: (offer: LenderOffer) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {offer.click_count || 0}
        </span>
      ),
    },
    {
      header: 'Expiration Date',
      accessor: (offer: LenderOffer) => (
        <span className="text-sm text-gray-600">
          {new Date(offer.expiration_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (offer: LenderOffer) => (
        <StatusDropdown
          currentStatus={offer.status}
          offerId={offer.id}
          onStatusChange={handleStatusChange}
        />
      ),
    },
  ]

  const handleAdd = async (offerData: {
    lenderName: string
    interestRate: number
    apr: number
    loanTerm: number
    eligibility?: string
    ctaLink: string
    expirationDate: string
    status: 'active' | 'inactive'
  }) => {
    try {
      const result = await createOffer(offerData)
      if (result?.error) {
        console.error('Error creating offer:', result.error)
        return
      }
      toast.success('Offer Added successfully')

      await loadOffers()
      setIsAddModalOpen(false)
    } catch (error) {
      console.error('Error adding offer:', error)
    }
  }

  const handleEdit = (offer: LenderOffer) => {
    setSelectedOffer(offer)
    setIsUpdateModalOpen(true)
  }

  const handleUpdate = async (updatedData: {
    id: string
    lenderName: string
    interestRate: number
    apr: number
    loanTerm: number
    eligibility: string
    ctaLink: string
    expirationDate: string
    status: 'active' | 'inactive'
  }) => {
    try {
      const result = await updateLenderOffer({
        id: updatedData.id,
        lender_name: updatedData.lenderName,
        interest_rate: updatedData.interestRate,
        apr: updatedData.apr,
        loan_term: updatedData.loanTerm,
        eligibility: updatedData.eligibility,
        cta_link: updatedData.ctaLink,
        expiration_date: updatedData.expirationDate,
        status: updatedData.status === 'active',
      })

      if (result?.status === 200) {
        toast.success('Offer updated successfully')
        await loadOffers()
        setIsUpdateModalOpen(false)
        setSelectedOffer(null)
      }
    } catch (error: any) {
      console.error('Error updating offer:', error)
      toast.error(error?.message || 'Failed to update offer')
    }
  }

  const handleDelete = (offer: LenderOffer) => {
    setSelectedOffer(offer)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async (offerId: string) => {
    try {
      const result = await deleteOffer(offerId)
      if (result.error) {
        console.error('Error deleting offer:', result.error)
        return
      }

      toast.success('Offer Deleted successfully')

      await loadOffers()
      setIsDeleteModalOpen(false)
      setSelectedOffer(null)
    } catch (error) {
      console.error('Error deleting offer:', error)
    }
  }

  const handleStatusChange = async (
    offerId: string,
    newStatus: 'active' | 'inactive',
  ) => {
    try {
      const result = await toggleOfferStatus(offerId, newStatus)
      if (result.error) {
        console.error('Error updating status:', result.error)
        return
      }

      setOffers(prevOffers =>
        prevOffers.map(offer =>
          offer.id === offerId
            ? { ...offer, status: newStatus === 'active' }
            : offer,
        ),
      )
      toast.success('Status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lender Offers Management</h1>
        <div className="flex items-center gap-3">
          <CSVExport
            data={offers}
            columns={lenderOfferCSVColumns}
            filename="lender-offers"
            buttonText="Export CSV"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="text-lg" />
            Add Offer
          </button>
        </div>
      </div>
      {loading ? (
        <DataTableSkeleton
          columns={columns}
          itemsPerPage={10}
          showActions={!!handleDelete}
        />
      ) : offers.length > 0 ? (
        <DataTable
          data={offers}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          itemsPerPage={itemsPerPage}
          serverSide={true}
          currentPage={currentPage}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-500">No offers available.</div>
        </div>
      )}

      {/* Modals */}
      <AddOfferModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <UpdateOfferModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false)
          setSelectedOffer(null)
        }}
        onUpdate={handleUpdate}
        offer={selectedOffer}
      />

      <DeleteOfferModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedOffer(null)
        }}
        onDelete={handleDeleteConfirm}
        offer={selectedOffer}
      />
    </div>
  )
}

export default LendersOfferManagement
