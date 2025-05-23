'use client'
import { useState } from 'react'
import { DataTable } from '@/components/AdminComponents/DataTable'
import { LenderOffer, LenderOffersColumn } from '@/utils/types'
import { FiPlus } from 'react-icons/fi'
import { lenderOffersData } from '@/constants'

// export function LendersOfferManagement() {
const LendersOfferManagement: React.FC = () => {
  const [offers, setOffers] = useState<LenderOffer[]>(lenderOffersData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState<LenderOffer | null>(null)

  const columns: LenderOffersColumn<LenderOffer>[] = [
    {
      header: 'Lender Name',
      accessor: 'lenderName',
    },
    {
      header: 'Interest Rate',
      accessor: 'interestRate',
    },
    {
      header: 'Loan Term',
      accessor: 'loanTerm',
    },
    {
      header: 'Eligibility',
      accessor: 'eligibility',
    },
    {
      header: 'CTA Link',
      accessor: 'ctaLink',
    },

    {
      header: 'Expiration Date',
      accessor: 'expirationDate',
      render: (offers: LenderOffer) => (
        <span className="text-sm text-gray-600">
          {new Date(offers.expirationDate).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
    },
  ]

  const handleAdd = (newOffer: LenderOffer) => {
    setOffers([...offers, newOffer])
    setIsAddModalOpen(false)
  }

  const handleEdit = (offer: LenderOffer) => {
    setSelectedOffer(offer)
    setIsUpdateModalOpen(true)
  }

  const handleUpdate = (updatedOffer: LenderOffer) => {
    setOffers(
      offers.map(offer =>
        offer.id === updatedOffer.id ? updatedOffer : offer,
      ),
    )
    setIsUpdateModalOpen(false)
  }

  const handleDelete = (offer: LenderOffer) => {
    setSelectedOffer(offer)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (selectedOffer) {
      setOffers(offers.filter(offer => offer.id !== selectedOffer.id))
      setIsDeleteModalOpen(false)
    }
  }

  const handleSelection = (selected: LenderOffer[]) => {
    console.log('Selected Offers:', selected)
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lender Offers Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiPlus className="text-lg" />
          Add Offer
        </button>
      </div>

      <DataTable
        data={offers}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSelect={handleSelection}
        itemsPerPage={8}
      />
    </div>
  )
}

export default LendersOfferManagement
