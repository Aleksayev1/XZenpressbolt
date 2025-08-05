import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface CorporateLeadData {
  name: string
  position: string
  company: string
  cnpj: string
  email: string
  phone: string
  employees_count: string
  sector: string
  specific_needs?: string
  plan_type: 'corporate' | 'analytics'
  selected_plan: string
  created_at?: string
}

export const submitCorporateLead = async (leadData: CorporateLeadData) => {
  try {
    const { data, error } = await supabase.functions.invoke('handle-corporate-lead', {
      body: leadData
    })

    if (error) {
      throw error
    }

    return { success: true, data }
  } catch (error) {
    console.error('Erro ao enviar lead corporativo:', error)
    throw error
  }
}