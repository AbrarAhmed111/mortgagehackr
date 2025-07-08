// Lender Offers API functions
export const lenderOffersApi = {
  // Get offers with optional filters
  getOffers: async (filters?: {
    interestRateMin?: number
    interestRateMax?: number
    lenderName?: string
    loanTerm?: number
    status?: boolean
  }) => {
    const params = new URLSearchParams()
    
    if (filters?.interestRateMin !== undefined) {
      params.append('interestRateMin', filters.interestRateMin.toString())
    }
    if (filters?.interestRateMax !== undefined) {
      params.append('interestRateMax', filters.interestRateMax.toString())
    }
    if (filters?.lenderName) {
      params.append('lenderName', filters.lenderName)
    }
    if (filters?.loanTerm) {
      params.append('loanTerm', filters.loanTerm.toString())
    }
    if (filters?.status !== undefined) {
      params.append('status', filters.status.toString())
    }

    const response = await fetch(`/api/lender-offers?${params.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch offers: ${response.statusText}`)
    }
    
    return response.json()
  },

  // Get offers with click counts (for admin panel)
  getOffersWithLink: async () => {
    const response = await fetch('/api/lender-offers?withLink=true')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch offers with link: ${response.statusText}`)
    }
    
    return response.json()
  },

  // Create new offer
  createOffer: async (offerData: {
    lenderName: string
    interestRate: number
    apr: number
    loanTerm: number
    eligibilityCriteria?: string
    ctaLink: string
    expirationDate: string
    status: 'active' | 'inactive'
  }) => {
    const response = await fetch('/api/lender-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        ...offerData,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to create offer')
    }

    return response.json()
  },

  // Update offer
  updateOffer: async (offerData: {
    id: string
    lenderName?: string
    interestRate?: number
    apr?: number
    loanTerm?: number
    eligibility?: string
    ctaLink?: string
    expirationDate?: string
    status?: 'active' | 'inactive'
  }) => {
    const response = await fetch('/api/lender-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'update',
        ...offerData,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update offer')
    }

    return response.json()
  },

  // Delete offer
  deleteOffer: async (offerId: string) => {
    const response = await fetch('/api/lender-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'delete',
        id: offerId,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to delete offer')
    }

    return response.json()
  },

  // Toggle offer status
  toggleOfferStatus: async (offerId: string, newStatus: 'active' | 'inactive') => {
    const response = await fetch('/api/lender-offers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'toggleStatus',
        offerId,
        newStatus,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to toggle offer status')
    }

    return response.json()
  },

  // Force refresh offers (bypass cache)
  refreshOffers: async () => {
    // Add a timestamp to force fresh data
    const response = await fetch(`/api/lender-offers?withLink=true&_t=${Date.now()}`)
    
    if (!response.ok) {
      throw new Error(`Failed to refresh offers: ${response.statusText}`)
    }
    
    return response.json()
  }
}

// Analytics API functions
export const analyticsApi = {
  // Get offer status counts
  getOfferStatusCounts: async () => {
    const response = await fetch('/api/analytics/offer-status-counts')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch offer status counts: ${response.statusText}`)
    }
    
    return response.json()
  },

  // Get top offers
  getTopOffers: async () => {
    const response = await fetch('/api/analytics/top-offers')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch top offers: ${response.statusText}`)
    }
    
    return response.json()
  },

  // Get clicks over time
  getClicksOverTime: async (timeframe: 'day' | 'week' | 'month' = 'day') => {
    const response = await fetch(`/api/analytics/clicks-over-time?timeframe=${timeframe}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch clicks over time: ${response.statusText}`)
    }
    
    return response.json()
  },

  // Get leads by source
  getLeadsBySource: async () => {
    const response = await fetch('/api/analytics/leads-by-source')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch leads by source: ${response.statusText}`)
    }
    
    return response.json()
  }
}

// Deal Analyzer API functions
export const dealAnalyzerApi = {
  // Get paginated, filtered leads (with cache busting)
  getLeads: async (params: { page?: number; limit?: number; result_type?: string; source?: string; _t?: number } = {}) => {
    const search = new URLSearchParams()
    if (params.page) search.append('page', params.page.toString())
    if (params.limit) search.append('limit', params.limit.toString())
    if (params.result_type) search.append('result_type', params.result_type)
    if (params.source) search.append('source', params.source)
    if (params._t) search.append('_t', params._t.toString())
    const response = await fetch(`/api/deal-analyzer?${search.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch leads')
    return response.json()
  },
  // Force refresh (bypass cache)
  refreshLeads: async (params: { page?: number; limit?: number; result_type?: string; source?: string } = {}) => {
    return dealAnalyzerApi.getLeads({ ...params, _t: Date.now() })
  },
  // Delete a lead
  deleteLead: async (id: string) => {
    const response = await fetch(`/api/deal-analyzer?id=${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete lead')
    return response.json()
  },
}

// Prequalification API functions
export const prequalificationApi = {
  // Get paginated, filtered leads (with cache busting)
  getLeads: async (params: { page?: number; limit?: number; status?: string; _t?: number } = {}) => {
    const search = new URLSearchParams()
    if (params.page) search.append('page', params.page.toString())
    if (params.limit) search.append('limit', params.limit.toString())
    if (params.status) search.append('status', params.status)
    if (params._t) search.append('_t', params._t.toString())
    const response = await fetch(`/api/prequalification?${search.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch leads')
    return response.json()
  },
  // Force refresh (bypass cache)
  refreshLeads: async (params: { page?: number; limit?: number; status?: string } = {}) => {
    return prequalificationApi.getLeads({ ...params, _t: Date.now() })
  },
  // Delete a lead
  deleteLead: async (id: string) => {
    const response = await fetch(`/api/prequalification?id=${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete lead')
    return response.json()
  },
}

// Blogs API functions
export const blogsApi = {
  // Get paginated blogs (with cache busting)
  getBlogs: async (params: { page?: number; limit?: number; _t?: number } = {}) => {
    const search = new URLSearchParams()
    if (params.page) search.append('page', params.page.toString())
    if (params.limit) search.append('limit', params.limit.toString())
    if (params._t) search.append('_t', params._t.toString())
    const response = await fetch(`/api/blogs?${search.toString()}`)
    if (!response.ok) throw new Error('Failed to fetch blogs')
    return response.json()
  },
  // Force refresh (bypass cache)
  refreshBlogs: async (params: { page?: number; limit?: number } = {}) => {
    return blogsApi.getBlogs({ ...params, _t: Date.now() })
  },
  // Delete a blog
  deleteBlog: async (id: string) => {
    const response = await fetch(`/api/blogs?id=${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to delete blog')
    return response.json()
  },
}
