// Type definitions for the Expense Tracker application

export type AccountType = 'checking' | 'savings' | 'credit_card' | 'cash' | 'investment' | 'loan';
export type CurrencyCode = 'USD' | 'GBP' | 'CAD';
export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionStatus = 'pending' | 'cleared' | 'reconciled' | 'void';
export type CategoryType = 'income' | 'expense' | 'transfer';

export interface Account {
  account_id: number;
  account_name: string;
  account_type: {
    type_name: AccountType;
    description: string;
    is_asset: boolean;
  };
  account_number?: string;
  institution_name?: string;
  currency_code: CurrencyCode;
  initial_balance: number;
  current_balance: number;
  credit_limit?: number;
  is_closed: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  category_id: number;
  category_group: string;
  category_name: string;
  category_type: CategoryType;
  color_code?: string;
  icon_name?: string;
  is_active: boolean;
  created_at: string;
}

export interface Transaction {
  transaction_id: number;
  account: {
    account_id: number;
    account_name: string;
  };
  payee?: {
    payee_id: number;
    payee_name: string;
  };
  category?: {
    category_id: number;
    category_name: string;
    category_group: string;
  };
  transaction_type: TransactionType;
  amount: number;
  currency_code: CurrencyCode;
  transaction_date: string;
  description?: string;
  reference_number?: string;
  status: TransactionStatus;
  transfer_account_id?: number;
  location?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}
