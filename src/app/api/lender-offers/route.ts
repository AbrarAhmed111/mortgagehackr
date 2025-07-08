import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cacheUtils, performanceMonitor } from '../../../lib/utils/performance'
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const interestRateMin = searchParams.get('interestRateMin')
    const interestRateMax = searchParams.get('interestRateMax')
    const lenderName = searchParams.get('lenderName')
    const loanTerm = searchParams.get('loanTerm')
    const status = searchParams.get('status')
    const withLink = searchParams.get('withLink') === 'true'
    const timestamp = searchParams.get('_t') // For cache busting

    // Build filters object
    const filters: any = {}
    if (interestRateMin) filters.interestRateMin = parseFloat(interestRateMin)
    if (interestRateMax) filters.interestRateMax = parseFloat(interestRateMax)
    if (lenderName) filters.lenderName = lenderName
    if (loanTerm) filters.loanTerm = parseInt(loanTerm, 10)
    if (status) filters.status = status === 'true'

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    if (withLink) {
      // Get offers with click counts
      const monitor = performanceMonitor.start('getOffersWithLink')
      const cacheKey = cacheUtils.generateKey('offersWithLink', { timestamp })
      const cached = cacheUtils.get(cacheKey)
      
      if (cached && !timestamp) {
        monitor.end()
        return NextResponse.json(cached)
      }

      // Get all lender offers ordered by interest_rate ascending
      const { data: offers, error } = await supabase
        .from('lender_offers')
        .select('*')
        .order('interest_rate', { ascending: true })

      if (error || !offers) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
      }

      // For each offer, fetch the total clicks count
      const offersWithClicks = await Promise.all(
        offers.map(async (offer) => {
          const { count, error: countError } = await supabase
            .from('apply_now_clicks')
            .select('*', { count: 'exact', head: true })
            .eq('lender_offer_id', offer.id)

          if (countError) {
            console.error(
              `Error counting clicks for offer ${offer.id}:`,
              countError,
            )
            return { ...offer, click_count: 0 }
          }

          return { ...offer, click_count: count ?? 0 }
        }),
      )

      // Only cache if no timestamp (not a refresh request)
      if (!timestamp) {
        cacheUtils.set(cacheKey, offersWithClicks, 2 * 60 * 1000)
      }
      monitor.end()
      return NextResponse.json(offersWithClicks)
    } else {
      // Get offers with filters
      const monitor = performanceMonitor.start('getOffers')
      const cacheKey = cacheUtils.generateKey('offers', { filters, timestamp })
      const cached = cacheUtils.get(cacheKey)
      
      if (cached && !timestamp) {
        monitor.end()
        return NextResponse.json(cached)
      }

      let query = supabase.from('lender_offers').select('*')

      if (filters.interestRateMin !== undefined)
        query = query.gte('interest_rate', filters.interestRateMin)
      if (filters.interestRateMax !== undefined)
        query = query.lte('interest_rate', filters.interestRateMax)
      if (filters.lenderName)
        query = query.ilike('lender_name', `%${filters.lenderName}%`)
      if (filters.loanTerm) query = query.eq('loan_term', filters.loanTerm)
      if (filters.status !== undefined) query = query.eq('status', filters.status)

      const { data, error } = await query.order('interest_rate', {
        ascending: true,
      })

      if (error) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
      }

      // Only cache if no timestamp (not a refresh request)
      if (!timestamp) {
        cacheUtils.set(cacheKey, data, 2 * 60 * 1000)
      }
      monitor.end()
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Error in GET /api/lender-offers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, ...data } = body

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    switch (action) {
      case 'create':
        const { data: createdOffer, error: createError } = await supabase
          .from('lender_offers')
          .insert([{
            lender_name: data.lenderName,
            interest_rate: data.interestRate,
            apr: data.apr,
            loan_term: data.loanTerm,
            eligibility: data.eligibilityCriteria ?? null,
            cta_link: data.ctaLink,
            expiration_date: data.expirationDate,
            status: data.status === 'active' ? true : false,
          }])
          .select()
          .single()

        if (createError) {
          return NextResponse.json(
            { error: createError.message },
            { status: 500 }
          )
        }

        // Invalidate related caches
        cacheUtils.invalidateMultiple([
          'offers',
          'offersWithLink',
          'topOffers',
          'offerStatusCounts'
        ])

        return NextResponse.json(createdOffer)

      case 'update':
        const { data: updatedOffer, error: updateError } = await supabase
          .from('lender_offers')
          .update({
            lender_name: data.lenderName,
            interest_rate: data.interestRate,
            apr: data.apr,
            loan_term: data.loanTerm,
            eligibility: data.eligibility,
            cta_link: data.ctaLink,
            expiration_date: data.expirationDate,
            status: data.status === 'active' ? true : false,
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.id)
          .select()
          .single()

        if (updateError) {
          return NextResponse.json(
            { error: updateError.message },
            { status: 500 }
          )
        }

        // Invalidate related caches
        cacheUtils.invalidateMultiple([
          'offers',
          'offersWithLink',
          'topOffers',
          'offerStatusCounts'
        ])

        return NextResponse.json(updatedOffer)

      case 'delete':
        const { data: deletedOffer, error: deleteError } = await supabase
          .from('lender_offers')
          .delete()
          .eq('id', data.id)
          .select()
          .single()

        if (deleteError) {
          return NextResponse.json(
            { error: deleteError.message },
            { status: 500 }
          )
        }

        // Invalidate related caches
        cacheUtils.invalidateMultiple([
          'offers',
          'offersWithLink',
          'topOffers',
          'offerStatusCounts'
        ])

        return NextResponse.json(deletedOffer)

      case 'toggleStatus':
        const { data: toggledOffer, error: toggleError } = await supabase
          .from('lender_offers')
          .update({
            status: data.newStatus === 'active',
            updated_at: new Date().toISOString(),
          })
          .eq('id', data.offerId)
          .select()
          .single()

        if (toggleError) {
          return NextResponse.json(
            { error: toggleError.message },
            { status: 500 }
          )
        }

        // Invalidate related caches
        cacheUtils.invalidateMultiple([
          'offers',
          'offersWithLink',
          'topOffers',
          'offerStatusCounts'
        ])

        return NextResponse.json(toggledOffer)

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error in POST /api/lender-offers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 