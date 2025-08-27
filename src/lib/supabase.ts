import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://seu-projeto.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua-chave-anonima'

// Create client - ready for production
const isSupabaseConfigured = supabaseUrl !== 'https://seu-projeto.supabase.co' && 
                            supabaseAnonKey !== 'sua-chave-anonima' &&
                            supabaseUrl && supabaseAnonKey

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

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
  // Check if Supabase is configured
  if (!supabase) {
    console.warn('Supabase not configured. Lead data:', leadData)
    // Simulate success for development
    return { 
      success: true, 
      data: { id: 'mock-' + Date.now() },
      message: 'Supabase não configurado - dados simulados para desenvolvimento' 
    }
  }

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