"use server";

import { createClient } from "../supabase/server";

export async function createDealAnalyzerLead(
  loanInfo: string,
  resultType: "Great" | "Fair" | "Poor",
  email?: string | null
) {
  const supabase = await createClient();

  const { error } = await supabase.from("deal_analyzer_leads").insert([
    {
      loan_info: loanInfo,
      result_type: resultType,
      email: email || null,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  return { success: "Lead created successfully" };
}

export async function getDealAnalyzerLeads(
  page = 1,
  limit = 10,
  filterResultType?: "Great" | "Fair" | "Poor",
  startDate?: string,
  endDate?: string
) {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("deal_analyzer_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (filterResultType) {
    query = query.eq("result_type", filterResultType);
  }

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  if (endDate) {
    query = query.lte("created_at", endDate);
  }

  const { data, error } = await query.range(from, to);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}

export async function exportDealAnalyzerLeads(format: "csv" | "json") {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deal_analyzer_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  if (!data || data.length === 0) {
    return { error: "No leads found for export" };
  }

  if (format === "json") {
    return JSON.stringify(data, null, 2);
  }

  if (format === "csv") {
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), // header row
      ...data.map((lead) =>
        headers.map((h) => `"${(lead as any)[h]}"`).join(",")
      ),
    ];
    return csvRows.join("\n");
  }

  return { error: "Invalid export format" };
}
