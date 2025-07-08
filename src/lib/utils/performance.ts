// Performance utilities for database operations

// Cache for storing query results
const queryCache = new Map<string, { data: any; timestamp: number; ttl: number }>()

// Cache TTL in milliseconds (30 seconds instead of 5 minutes)
const CACHE_TTL = 30 * 1000

export const cacheUtils = {
  // Get cached data if valid
  get: (key: string) => {
    const cached = queryCache.get(key)
    if (!cached) return null
    
    const now = Date.now()
    if (now - cached.timestamp > cached.ttl) {
      queryCache.delete(key)
      return null
    }
    
    return cached.data
  },
  
  // Set cache with TTL
  set: (key: string, data: any, ttl: number = CACHE_TTL) => {
    queryCache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  },
  
  // Invalidate cache
  invalidate: (key: string) => {
    queryCache.delete(key)
  },
  
  // Invalidate multiple related caches
  invalidateMultiple: (keys: string[]) => {
    keys.forEach(key => queryCache.delete(key))
  },
  
  // Clear all cache
  clear: () => {
    queryCache.clear()
  },
  
  // Generate cache key
  generateKey: (prefix: string, params: Record<string, any>) => {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|')
    return `${prefix}:${sortedParams}`
  }
}

// Database query optimization
export const queryOptimizer = {
  // Add pagination to query
  withPagination: (query: any, page: number, limit: number) => {
    const from = (page - 1) * limit
    const to = from + limit - 1
    return query.range(from, to)
  },
  
  // Add sorting to query
  withSorting: (query: any, field: string, ascending: boolean = false) => {
    return query.order(field, { ascending })
  },
  
  // Add filtering to query
  withFilter: (query: any, field: string, value: any) => {
    if (value && value !== 'all') {
      return query.eq(field, value)
    }
    return query
  },
  
  // Add search to query
  withSearch: (query: any, field: string, searchTerm: string) => {
    if (searchTerm) {
      return query.ilike(field, `%${searchTerm}%`)
    }
    return query
  }
}

// Performance monitoring
export const performanceMonitor = {
  start: (operation: string) => {
    const start = performance.now()
    return {
      end: () => {
        const end = performance.now()
        const duration = end - start
        console.log(`${operation} took ${duration.toFixed(2)}ms`)
        return duration
      }
    }
  }
}

// Batch operations utility
export const batchOperations = {
  // Process items in batches
  processBatch: async <T, R>(
    items: T[],
    batchSize: number,
    processor: (batch: T[]) => Promise<R[]>
  ): Promise<R[]> => {
    const results: R[] = []
    
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize)
      const batchResults = await processor(batch)
      results.push(...batchResults)
    }
    
    return results
  },
  
  // Debounce function calls
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },
  
  // Throttle function calls
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
} 