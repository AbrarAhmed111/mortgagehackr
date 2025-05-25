export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      devices: {
        Row: {
          active: boolean
          active_payment_intent: string | null
          amounts: number[] | null
          beta_mode: boolean | null
          created_at: string
          custom_amounts: boolean
          default_amount: number | null
          default_fund_id: string | null
          device_id: string
          esper_device_id: string | null
          fund_ids: string[] | null
          maintenance_mode: boolean | null
          masjid_id: string | null
          name: string | null
          other_amounts: number[] | null
          other_fund_ids: string[] | null
          primary_message: string | null
          secondary_message: string | null
          stripe_terminal_id: string | null
          tertiary_message: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          active_payment_intent?: string | null
          amounts?: number[] | null
          beta_mode?: boolean | null
          created_at?: string
          custom_amounts?: boolean
          default_amount?: number | null
          default_fund_id?: string | null
          device_id?: string
          esper_device_id?: string | null
          fund_ids?: string[] | null
          maintenance_mode?: boolean | null
          masjid_id?: string | null
          name?: string | null
          other_amounts?: number[] | null
          other_fund_ids?: string[] | null
          primary_message?: string | null
          secondary_message?: string | null
          stripe_terminal_id?: string | null
          tertiary_message?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          active_payment_intent?: string | null
          amounts?: number[] | null
          beta_mode?: boolean | null
          created_at?: string
          custom_amounts?: boolean
          default_amount?: number | null
          default_fund_id?: string | null
          device_id?: string
          esper_device_id?: string | null
          fund_ids?: string[] | null
          maintenance_mode?: boolean | null
          masjid_id?: string | null
          name?: string | null
          other_amounts?: number[] | null
          other_fund_ids?: string[] | null
          primary_message?: string | null
          secondary_message?: string | null
          stripe_terminal_id?: string | null
          tertiary_message?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'devices_default_fund_id_fkey'
            columns: ['default_fund_id']
            isOneToOne: false
            referencedRelation: 'funds'
            referencedColumns: ['fund_id']
          },
          {
            foreignKeyName: 'devices_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
        ]
      }
      funds: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          fund_id: string
          headline: string | null
          masjid_id: string
          name: string
          tax_deductible: boolean
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          fund_id?: string
          headline?: string | null
          masjid_id: string
          name: string
          tax_deductible?: boolean
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          fund_id?: string
          headline?: string | null
          masjid_id?: string
          name?: string
          tax_deductible?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'FUNDS_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
        ]
      }
      interview_logs: {
        Row: {
          created_at: string
          device_battery_level: number
          device_charging: boolean
          device_id: string
          event_message: string | null
          log_id: string
          log_type: Database['public']['Enums']['log_types']
          reader_battery_level: number | null
          reader_charging: boolean | null
          reader_connection: boolean
          wifi_strength: number | null
        }
        Insert: {
          created_at?: string
          device_battery_level: number
          device_charging: boolean
          device_id: string
          event_message?: string | null
          log_id?: string
          log_type?: Database['public']['Enums']['log_types']
          reader_battery_level?: number | null
          reader_charging?: boolean | null
          reader_connection: boolean
          wifi_strength?: number | null
        }
        Update: {
          created_at?: string
          device_battery_level?: number
          device_charging?: boolean
          device_id?: string
          event_message?: string | null
          log_id?: string
          log_type?: Database['public']['Enums']['log_types']
          reader_battery_level?: number | null
          reader_charging?: boolean | null
          reader_connection?: boolean
          wifi_strength?: number | null
        }
        Relationships: []
      }
      logs: {
        Row: {
          created_at: string
          device_battery_level: number
          device_charging: boolean
          device_id: string
          event_message: string | null
          log_id: string
          log_type: Database['public']['Enums']['log_types']
          reader_battery_level: number | null
          reader_charging: boolean | null
          reader_connection: boolean
          wifi_strength: number | null
        }
        Insert: {
          created_at?: string
          device_battery_level: number
          device_charging: boolean
          device_id: string
          event_message?: string | null
          log_id?: string
          log_type?: Database['public']['Enums']['log_types']
          reader_battery_level?: number | null
          reader_charging?: boolean | null
          reader_connection: boolean
          wifi_strength?: number | null
        }
        Update: {
          created_at?: string
          device_battery_level?: number
          device_charging?: boolean
          device_id?: string
          event_message?: string | null
          log_id?: string
          log_type?: Database['public']['Enums']['log_types']
          reader_battery_level?: number | null
          reader_charging?: boolean | null
          reader_connection?: boolean
          wifi_strength?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'logs_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'devices'
            referencedColumns: ['device_id']
          },
          {
            foreignKeyName: 'logs_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'esper_device_urls'
            referencedColumns: ['device_id']
          },
        ]
      }
      masajid: {
        Row: {
          city: string
          container_text: string | null
          country: string
          created_at: string
          ein: string | null
          email: string
          estimated_attendance: number
          latitude: number
          logo_url: string | null
          longitude: number
          masjid_id: string
          name: string
          owner_id: string
          phone_number: string
          registration_status: Database['public']['Enums']['registration_status_types']
          slug: string
          state: string
          street_address: string
          stripe_account_id: string | null
          stripe_customer_id: string | null
          stripe_location_id: string | null
          timezone: string | null
          updated_at: string
          website_url: string | null
          zip_code: string
        }
        Insert: {
          city: string
          container_text?: string | null
          country: string
          created_at?: string
          ein?: string | null
          email: string
          estimated_attendance: number
          latitude: number
          logo_url?: string | null
          longitude: number
          masjid_id?: string
          name: string
          owner_id: string
          phone_number: string
          registration_status?: Database['public']['Enums']['registration_status_types']
          slug: string
          state: string
          street_address: string
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_location_id?: string | null
          timezone?: string | null
          updated_at?: string
          website_url?: string | null
          zip_code: string
        }
        Update: {
          city?: string
          container_text?: string | null
          country?: string
          created_at?: string
          ein?: string | null
          email?: string
          estimated_attendance?: number
          latitude?: number
          logo_url?: string | null
          longitude?: number
          masjid_id?: string
          name?: string
          owner_id?: string
          phone_number?: string
          registration_status?: Database['public']['Enums']['registration_status_types']
          slug?: string
          state?: string
          street_address?: string
          stripe_account_id?: string | null
          stripe_customer_id?: string | null
          stripe_location_id?: string | null
          timezone?: string | null
          updated_at?: string
          website_url?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: 'masajid_owner_id_fkey'
            columns: ['owner_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
        ]
      }
      payment_methods: {
        Row: {
          card_brand: string | null
          card_funding: Database['public']['Enums']['card_funding_types'] | null
          card_issuer: string | null
          card_last4: string | null
          card_month: number | null
          card_year: number | null
          created_at: string
          fingerprint: string
          payment_method_id: string
          user_id: string | null
          wallet: Database['public']['Enums']['wallet_types'] | null
        }
        Insert: {
          card_brand?: string | null
          card_funding?:
            | Database['public']['Enums']['card_funding_types']
            | null
          card_issuer?: string | null
          card_last4?: string | null
          card_month?: number | null
          card_year?: number | null
          created_at?: string
          fingerprint: string
          payment_method_id?: string
          user_id?: string | null
          wallet?: Database['public']['Enums']['wallet_types'] | null
        }
        Update: {
          card_brand?: string | null
          card_funding?:
            | Database['public']['Enums']['card_funding_types']
            | null
          card_issuer?: string | null
          card_last4?: string | null
          card_month?: number | null
          card_year?: number | null
          created_at?: string
          fingerprint?: string
          payment_method_id?: string
          user_id?: string | null
          wallet?: Database['public']['Enums']['wallet_types'] | null
        }
        Relationships: [
          {
            foreignKeyName: 'payment_methods_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
        ]
      }
      payouts: {
        Row: {
          amount: number
          arrival_date: string | null
          created_date: string
          currency: string | null
          masjid_id: string
          payout_id: string
          status: Database['public']['Enums']['payout_status_type']
          stripe_payout_id: string
        }
        Insert: {
          amount: number
          arrival_date?: string | null
          created_date: string
          currency?: string | null
          masjid_id?: string
          payout_id?: string
          status?: Database['public']['Enums']['payout_status_type']
          stripe_payout_id: string
        }
        Update: {
          amount?: number
          arrival_date?: string | null
          created_date?: string
          currency?: string | null
          masjid_id?: string
          payout_id?: string
          status?: Database['public']['Enums']['payout_status_type']
          stripe_payout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'payouts_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
        ]
      }
      permissions: {
        Row: {
          access_level: Database['public']['Enums']['permission_access_level']
          attribute: string
          created_at: string
          id: string
          masjid_id: string
          permission: Database['public']['Enums']['permissions_type']
          updated_at: string
          user_id: string
        }
        Insert: {
          access_level: Database['public']['Enums']['permission_access_level']
          attribute: string
          created_at?: string
          id?: string
          masjid_id: string
          permission: Database['public']['Enums']['permissions_type']
          updated_at?: string
          user_id: string
        }
        Update: {
          access_level?: Database['public']['Enums']['permission_access_level']
          attribute?: string
          created_at?: string
          id?: string
          masjid_id?: string
          permission?: Database['public']['Enums']['permissions_type']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'permissions_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
        ]
      }
      roles: {
        Row: {
          access_level: Database['public']['Enums']['role_access_level']
          created_at: string
          id: string
          masjid_id: string
          role: Database['public']['Enums']['role_types']
          updated_at: string
          user_id: string
        }
        Insert: {
          access_level: Database['public']['Enums']['role_access_level']
          created_at?: string
          id?: string
          masjid_id: string
          role: Database['public']['Enums']['role_types']
          updated_at?: string
          user_id: string
        }
        Update: {
          access_level?: Database['public']['Enums']['role_access_level']
          created_at?: string
          id?: string
          masjid_id?: string
          role?: Database['public']['Enums']['role_types']
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: 'roles_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          anonymous: boolean | null
          created_at: string
          currency: string
          device_id: string | null
          email: string | null
          fund_id: string
          masjid_id: string
          memo: string | null
          name: string | null
          payment_method_id: string | null
          payment_method_type: Database['public']['Enums']['payment_method_types']
          payout_id: string | null
          status: Database['public']['Enums']['transaction_status_types']
          stripe_fee: number | null
          stripe_transaction_id: string | null
          transaction_id: string
          transaction_type: Database['public']['Enums']['transaction_types']
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          anonymous?: boolean | null
          created_at?: string
          currency?: string
          device_id?: string | null
          email?: string | null
          fund_id: string
          masjid_id: string
          memo?: string | null
          name?: string | null
          payment_method_id?: string | null
          payment_method_type: Database['public']['Enums']['payment_method_types']
          payout_id?: string | null
          status: Database['public']['Enums']['transaction_status_types']
          stripe_fee?: number | null
          stripe_transaction_id?: string | null
          transaction_id?: string
          transaction_type: Database['public']['Enums']['transaction_types']
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          anonymous?: boolean | null
          created_at?: string
          currency?: string
          device_id?: string | null
          email?: string | null
          fund_id?: string
          masjid_id?: string
          memo?: string | null
          name?: string | null
          payment_method_id?: string | null
          payment_method_type?: Database['public']['Enums']['payment_method_types']
          payout_id?: string | null
          status?: Database['public']['Enums']['transaction_status_types']
          stripe_fee?: number | null
          stripe_transaction_id?: string | null
          transaction_id?: string
          transaction_type?: Database['public']['Enums']['transaction_types']
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'transactions_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'devices'
            referencedColumns: ['device_id']
          },
          {
            foreignKeyName: 'transactions_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'esper_device_urls'
            referencedColumns: ['device_id']
          },
          {
            foreignKeyName: 'transactions_fund_id_fkey'
            columns: ['fund_id']
            isOneToOne: false
            referencedRelation: 'funds'
            referencedColumns: ['fund_id']
          },
          {
            foreignKeyName: 'transactions_masjid_id_fkey'
            columns: ['masjid_id']
            isOneToOne: false
            referencedRelation: 'masajid'
            referencedColumns: ['masjid_id']
          },
          {
            foreignKeyName: 'transactions_payout_id_fkey'
            columns: ['payout_id']
            isOneToOne: false
            referencedRelation: 'payouts'
            referencedColumns: ['payout_id']
          },
          {
            foreignKeyName: 'transactions_user_id_fkey'
            columns: ['user_id']
            isOneToOne: false
            referencedRelation: 'users'
            referencedColumns: ['user_id']
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          first_name: string
          last_name: string
          role: Database['public']['Enums']['app_role'] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name: string
          last_name: string
          role?: Database['public']['Enums']['app_role'] | null
          updated_at?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string
          last_name?: string
          role?: Database['public']['Enums']['app_role'] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      enriched_logs_view: {
        Row: {
          created_at: string | null
          device_battery_level: number | null
          device_charging: boolean | null
          device_id: string | null
          device_name: string | null
          event_message: string | null
          log_id: string | null
          log_type: Database['public']['Enums']['log_types'] | null
          masjid_name: string | null
          reader_battery_level: number | null
          reader_charging: boolean | null
          reader_connection: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: 'logs_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'devices'
            referencedColumns: ['device_id']
          },
          {
            foreignKeyName: 'logs_device_id_fkey'
            columns: ['device_id']
            isOneToOne: false
            referencedRelation: 'esper_device_urls'
            referencedColumns: ['device_id']
          },
        ]
      }
      esper_device_urls: {
        Row: {
          device_id: string | null
          esper_device_id: string | null
          esper_device_url: string | null
          masjid_name: string | null
          name: string | null
          stripe_terminal_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_donation_summary: {
        Args: {
          masjid_id_param: string
        }
        Returns: {
          total_count: number
          total_amount: number
          daily_totals: Json
          fund_distribution: Json
        }[]
      }
      get_donations_by_date_range: {
        Args: {
          masjid_id_param: string
          start_date: string
          end_date: string
        }
        Returns: {
          daily_data: Json
          period_total: number
          period_count: number
          period_start_date: string
          period_end_date: string
          weekly_average: number
        }[]
      }
      get_masjid_stats: {
        Args: {
          masjid_id_param: string
        }
        Returns: {
          total_donations: number
          total_payouts: number
        }[]
      }
      get_paginated_transactions: {
        Args: {
          masjid_id_param: string
          page_num?: number
          items_per_page?: number
        }
        Returns: {
          transaction_data: Json
          total_count: number
        }[]
      }
      get_user_masajid: {
        Args: {
          input_user_id: string
        }
        Returns: {
          city: string
          container_text: string | null
          country: string
          created_at: string
          ein: string | null
          email: string
          estimated_attendance: number
          latitude: number
          logo_url: string | null
          longitude: number
          masjid_id: string
          name: string
          owner_id: string
          phone_number: string
          registration_status: Database['public']['Enums']['registration_status_types']
          slug: string
          state: string
          street_address: string
          stripe_account_id: string | null
          stripe_customer_id: string | null
          stripe_location_id: string | null
          timezone: string | null
          updated_at: string
          website_url: string | null
          zip_code: string
        }[]
      }
      getmostrecentpayout: {
        Args: {
          p_masjid_id: string
        }
        Returns: {
          payout_id: string
          count: number
          sum: number
          earliest_transaction: string
          latest_transaction: string
        }[]
      }
      is_masjid_owner: {
        Args: {
          input_user_id: string
          input_masjid_slug: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: 'super_admin' | 'admin' | 'user'
      card_funding_types: 'CREDIT' | 'DEBIT' | 'PREPAID' | 'UNKNOWN'
      log_types: 'INFO' | 'WARNING' | 'ERROR'
      payment_method_types: 'OTHER' | 'CASH' | 'CHECK' | 'CARD' | 'ACH'
      payout_status_type:
        | 'PENDING'
        | 'IN_TRANSIT'
        | 'PAID'
        | 'FAILED'
        | 'CANCELLED'
      permission_access_level: 'UPDATE' | 'READ'
      permissions_type: 'DESIGNATIONS'
      registration_status_types: 'PENDING' | 'VERIFIED' | 'REJECTED'
      role_access_level: 'ADMIN' | 'VIEWER'
      role_types: 'DESIGNATIONS' | 'DEVICES' | 'FINANCES' | 'SETTINGS'
      transaction_status_types: 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'REFUNDED'
      transaction_types: 'DONATION' | 'PAYMENT' | 'OTHER'
      wallet_types: 'APPLE_PAY' | 'GOOGLE_PAY' | 'SAMSUNG_PAY'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never
