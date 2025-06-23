import { getAnalyzerDealsList } from "@/lib/actions/analyzerLeads"

export async function POST(req: Request) {
  const body = await req.json()
  const result = await getAnalyzerDealsList(body)
  return Response.json(result)
}
