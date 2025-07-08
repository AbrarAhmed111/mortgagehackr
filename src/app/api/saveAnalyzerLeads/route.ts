import { saveAnalyzerLead } from '@/lib/actions/analyzerLeads'
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body || Object.keys(body).length === 0) {
      return new Response(
        JSON.stringify({ error: 'Request body is required.' }),
        { status: 400 }
      )
    }

    const result = await saveAnalyzerLead(body)

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error saving analyzer lead:', error)

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500 }
    )
  }
}
