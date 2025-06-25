import {  saveAnalyzerLead, submitAnalyzerEmail } from "@/lib/actions/analyzerLeads"

export async function POST(req: Request) {
  const body = await req.json()
  const result = await submitAnalyzerEmail(body)
  return Response.json(result)
}
