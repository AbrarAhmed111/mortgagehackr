// types/csv.types.ts
export interface CSVColumn<T> {
  header: string
  accessor: keyof T | ((item: T) => string | number | boolean)
  formatter?: (value: any) => string
}

// types/index.ts (or wherever you define your types)
export type LenderOffer = {
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

export interface ContactLead {
  name: string
  email: string
  message: string
  submitted_at: string
}

export const lenderOfferCSVColumns: CSVColumn<LenderOffer>[] = [
  {
    header: 'Lender Name',
    accessor: 'lender_name',
  },
  {
    header: 'Interest Rate (%)',
    accessor: 'interest_rate',
    formatter: (value: number) => `${value}%`,
  },
  {
    header: 'APR (%)',
    accessor: 'apr',
    formatter: (value: number) => `${value}%`,
  },
  {
    header: 'Loan Term (Months)',
    accessor: 'loan_term',
    formatter: (value: number) => `${value} months`,
  },
  {
    header: 'Eligibility',
    accessor: 'eligibility',
    formatter: (value: string | undefined) => value || 'N/A',
  },
  {
    header: 'CTA Link',
    accessor: 'cta_link',
  },
  {
    header: 'Click Count',
    accessor: 'click_count',
    formatter: (value: number | undefined) => String(value || 0),
  },
  {
    header: 'Expiration Date',
    accessor: 'expiration_date',
    formatter: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    header: 'Status',
    accessor: 'status',
    formatter: (value: boolean) => (value ? 'Active' : 'Inactive'),
  },
  {
    header: 'Created At',
    accessor: 'created_at',
    formatter: (value: string | undefined) =>
      value ? new Date(value).toLocaleDateString() : 'N/A',
  },
  {
    header: 'Updated At',
    accessor: 'updated_at',
    formatter: (value: string | undefined) =>
      value ? new Date(value).toLocaleDateString() : 'N/A',
  },
]

export const contactLeadCSVColumns: CSVColumn<ContactLead>[] = [
  {
    header: 'Name',
    accessor: 'name',
  },
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Message',
    accessor: 'message',
    formatter: (value: string) => value.replace(/\n/g, ' ').replace(/\r/g, ' '),
  },
  {
    header: 'Submitted At',
    accessor: 'submitted_at',
    formatter: (value: string) => new Date(value).toLocaleDateString(),
  },
  {
    header: 'Submitted Date & Time',
    accessor: 'submitted_at',
    formatter: (value: string) => new Date(value).toLocaleString(),
  },
]

// Alternative: If you want to use function accessors for more complex data extraction
// export const lenderOfferCSVColumnsAdvanced: CSVColumn<LenderOffer>[] = [
//   {
//     header: 'Lender Name',
//     accessor: (offer: LenderOffer) => offer.lender_name,
//   },
//   {
//     header: 'Interest Rate (%)',
//     accessor: (offer: LenderOffer) => offer.interest_rate,
//     formatter: (value: number) => `${value}%`,
//   },
//   {
//     header: 'APR (%)',
//     accessor: (offer: LenderOffer) => offer.apr,
//     formatter: (value: number) => `${value}%`,
//   },
//   {
//     header: 'Loan Term (Months)',
//     accessor: (offer: LenderOffer) => offer.loan_term,
//     formatter: (value: number) => `${value} months`,
//   },
//   {
//     header: 'Eligibility',
//     accessor: (offer: LenderOffer) => offer.eligibility || 'N/A',
//   },
//   {
//     header: 'CTA Link',
//     accessor: (offer: LenderOffer) => offer.cta_link,
//   },
//   {
//     header: 'Click Count',
//     accessor: (offer: LenderOffer) => offer.click_count || 0,
//   },
//   {
//     header: 'Expiration Date',
//     accessor: (offer: LenderOffer) => offer.expiration_date,
//     formatter: (value: string) => new Date(value).toLocaleDateString(),
//   },
//   {
//     header: 'Status',
//     accessor: (offer: LenderOffer) => offer.status,
//     formatter: (value: boolean) => (value ? 'Active' : 'Inactive'),
//   },
//   {
//     header: 'Is Expired',
//     accessor: (offer: LenderOffer) =>
//       new Date(offer.expiration_date) < new Date(),
//     formatter: (value: boolean) => (value ? 'Yes' : 'No'),
//   },
//   {
//     header: 'Created At',
//     accessor: (offer: LenderOffer) => offer.created_at || '',
//     formatter: (value: string) =>
//       value ? new Date(value).toLocaleDateString() : 'N/A',
//   },
//   {
//     header: 'Updated At',
//     accessor: (offer: LenderOffer) => offer.updated_at || '',
//     formatter: (value: string) =>
//       value ? new Date(value).toLocaleDateString() : 'N/A',
//   },
// ]
