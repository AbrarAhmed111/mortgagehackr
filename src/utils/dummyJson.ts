// utils/dummyData.ts
export const lenderOffers = [
  {
    id: '1',
    lender_name: 'HomeTrust Bank',
    interest_rate: 3.750,
    apr: 3.890,
    loan_term: 30,
    eligibility: 'Minimum credit score 680',
    cta_link: 'https://hometrustbank.com/apply',
    expiration_date: '2025-07-31',
    status: true,
    created_at: '2025-05-01T10:00:00Z',
    updated_at: '2025-05-01T10:00:00Z',
  },
  {
    id: '2',
    lender_name: 'MortgageOne',
    interest_rate: 3.250,
    apr: 3.380,
    loan_term: 15,
    eligibility: '',
    cta_link: 'https://mortgageone.com/start',
    expiration_date: '2025-08-15',
    status: true,
    created_at: '2025-05-02T11:00:00Z',
    updated_at: '2025-05-02T11:00:00Z',
  },
  {
    id: '3',
    lender_name: 'OpenLend Financial',
    interest_rate: 4.125,
    apr: 4.300,
    loan_term: 30,
    eligibility: 'Must be first-time buyer',
    cta_link: 'https://openlend.com/offer',
    expiration_date: '2025-06-20',
    status: true,
    created_at: '2025-05-03T12:00:00Z',
    updated_at: '2025-05-03T12:00:00Z',
  },
  {
    id: '4',
    lender_name: 'SafeHouse Loans',
    interest_rate: 3.500,
    apr: 3.600,
    loan_term: 15,
    eligibility: '',
    cta_link: 'https://safehouseloans.com/apply-now',
    expiration_date: '2025-07-01',
    status: false,
    created_at: '2025-05-04T13:00:00Z',
    updated_at: '2025-05-04T13:00:00Z',
  },
  {
    id: '5',
    lender_name: 'Citywide Lending',
    interest_rate: 3.875,
    apr: 3.950,
    loan_term: 30,
    eligibility: 'Valid US residency required',
    cta_link: 'https://citywidelending.com/deals',
    expiration_date: '2025-09-10',
    status: true,
    created_at: '2025-05-05T14:00:00Z',
    updated_at: '2025-05-05T14:00:00Z',
  },
];


export const contactLeads = [
  {
    id: 'lead1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    message: 'I have a question about eligibility for one of the lenders.',
    submitted_at: '2025-05-20T12:00:00Z',
    ip_address: '192.168.0.20',
  },
  {
    id: 'lead2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    message: 'Can someone contact me regarding refinancing?',
    submitted_at: '2025-05-21T09:15:00Z',
    ip_address: '192.168.0.21',
  },
  {
    id: 'lead3',
    name: 'Carla Mendez',
    email: 'carla@example.com',
    message: 'Great website! I love the mortgage calculator.',
    submitted_at: '2025-05-21T13:45:00Z',
    ip_address: '192.168.0.22',
  },
  {
    id: 'lead4',
    name: 'Daniel Wu',
    email: 'daniel@example.com',
    message: 'Do you work with lenders in Texas?',
    submitted_at: '2025-05-22T08:30:00Z',
    ip_address: '192.168.0.23',
  },
  {
    id: 'lead5',
    name: 'Emily Thompson',
    email: 'emily@example.com',
    message: 'Can I lock this rate today?',
    submitted_at: '2025-05-22T10:05:00Z',
    ip_address: '192.168.0.24',
  },
];


export const analyzerLeads = [
  {
    "email": "alice.great@example.com",
    "source": "DealAnalyzer",
    "result_type": "Great",
    "loan_start_month": 2,
    "loan_start_year": 2023,
    "loan_amount": 450000.00,
    "interest_rate": 4.950,
    "loan_term": 30,
    "ip_address": "203.0.113.11"
  },
  {
    "email": "bob.fair@example.com",
    "source": "DealAnalyzer",
    "result_type": "Fair",
    "loan_start_month": 6,
    "loan_start_year": 2022,
    "loan_amount": 320000.00,
    "interest_rate": 6.200,
    "loan_term": 15,
    "ip_address": "203.0.113.12"
  },
  {
    "email": "carol.poor@example.com",
    "source": "DealAnalyzer",
    "result_type": "Poor",
    "loan_start_month": 11,
    "loan_start_year": 2021,
    "loan_amount": 275000.00,
    "interest_rate": 7.150,
    "loan_term": 30,
    "ip_address": "203.0.113.13"
  },
  {
    "email": "dave.heloc@example.com",
    "source": "HELOC",
    "result_type": "Great",
    "loan_start_month": 2,
    "loan_start_year": 2023,
    "loan_amount": 450000.00,
    "interest_rate": 4.950,
    "loan_term": 30,
    "ip_address": "203.0.113.21"
  },
  {
    "email": "eve.heloc@example.com",
    "source": "HELOC",
    "result_type": "Great",
    "loan_start_month": 4,
    "loan_start_year": 2023,
    "loan_amount": 390000.00,
    "interest_rate": 4.850,
    "loan_term": 15,
    "ip_address": "203.0.113.22"
  }
];


export const blogs = [
  {
    id: 'b1',
    title: 'How to Compare Mortgage Rates Effectively',
    slug: 'compare-mortgage-rates',
    content: [
      {
        image: '/images/blog1-step1.jpg',
        description: 'Start by checking your credit score and understanding your credit profile.',
      },
      {
        image: '/images/blog1-step2.jpg',
        description: 'Compare multiple lenders using a trusted platform to get rate estimates.',
      },
    ],
    profile_image: '/images/blog1-profile.jpg',
    created_at: '2025-05-10T10:00:00Z',
  },
  {
    id: 'b2',
    title: 'Top 5 Mortgage Mistakes to Avoid',
    slug: 'mortgage-mistakes-to-avoid',
    content: [
      {
        image: '/images/blog2-1.jpg',
        description: 'Not checking your credit report can lead to surprises.',
      },
      {
        image: '/images/blog2-2.jpg',
        description: 'Avoid taking new loans before closing on your mortgage.',
      },
    ],
    profile_image: '/images/blog2-profile.jpg',
    created_at: '2025-05-12T14:00:00Z',
  },
  {
    id: 'b3',
    title: '15-Year vs 30-Year Mortgage: Pros and Cons',
    slug: '15-vs-30-year-mortgage',
    content: [
      {
        image: '/images/blog3-1.jpg',
        description: 'A 15-year mortgage has higher monthly payments but less interest overall.',
      },
      {
        image: '/images/blog3-2.jpg',
        description: 'A 30-year mortgage offers more flexibility and lower monthly payments.',
      },
    ],
    profile_image: '/images/blog3-profile.jpg',
    created_at: '2025-05-14T11:30:00Z',
  },
  {
    id: 'b4',
    title: 'Understanding APR vs Interest Rate',
    slug: 'apr-vs-interest-rate',
    content: [
      {
        image: '/images/blog4-1.jpg',
        description: 'The APR includes both the interest rate and other loan charges.',
      },
      {
        image: '/images/blog4-2.jpg',
        description: 'Use APR for a better comparison between lenders.',
      },
    ],
    profile_image: '/images/blog4-profile.jpg',
    created_at: '2025-05-15T09:00:00Z',
  },
  {
    id: 'b5',
    title: 'Is Now the Right Time to Refinance?',
    slug: 'right-time-to-refinance',
    content: [
      {
        image: '/images/blog5-1.jpg',
        description: 'Refinancing may save you money if rates are lower than your current loan.',
      },
      {
        image: '/images/blog5-2.jpg',
        description: 'Consider fees and your long-term plans before refinancing.',
      },
    ],
    profile_image: '/images/blog5-profile.jpg',
    created_at: '2025-05-16T13:45:00Z',
  },
];
