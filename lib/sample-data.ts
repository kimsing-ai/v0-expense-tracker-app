// Sample data for the expense tracker application

export const sampleBalanceData = {
  totalBalance: 8456.23,
  currency: 'USD' as const,
  monthChange: {
    amount: 235.00,
    percentage: 2.9,
    direction: 'up' as const,
  },
};

export const sampleAccounts = [
  {
    account_id: 1,
    account_name: 'Checking',
    account_type: 'checking',
    institution_name: 'Chase',
    current_balance: 2345.67,
    currency_code: 'USD' as const,
    is_closed: false,
  },
  {
    account_id: 2,
    account_name: 'Savings',
    account_type: 'savings',
    institution_name: 'Chase',
    current_balance: 5000.00,
    currency_code: 'USD' as const,
    is_closed: false,
  },
  {
    account_id: 3,
    account_name: 'Credit Card',
    account_type: 'credit_card',
    institution_name: 'Amex',
    current_balance: -890.44,
    currency_code: 'USD' as const,
    is_closed: false,
  },
  {
    account_id: 4,
    account_name: 'Cash',
    account_type: 'cash',
    institution_name: undefined,
    current_balance: 200.00,
    currency_code: 'USD' as const,
    is_closed: false,
  },
];

export const sampleTransactions = [
  {
    transaction_id: 1,
    date: '2025-11-12',
    payee_name: 'Salary',
    amount: 3200.00,
    transaction_type: 'income' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 2,
    date: '2025-11-14',
    payee_name: 'Safeway',
    amount: 87.23,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 3,
    date: '2025-11-14',
    payee_name: 'Shell Gas',
    amount: 45.00,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 4,
    date: '2025-11-13',
    payee_name: 'Starbucks',
    amount: 5.75,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 5,
    date: '2025-11-13',
    payee_name: 'Amazon',
    amount: 156.99,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 6,
    date: '2025-11-11',
    payee_name: 'Target',
    amount: 43.21,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 7,
    date: '2025-11-10',
    payee_name: 'Chipotle',
    amount: 12.50,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 8,
    date: '2025-11-09',
    payee_name: 'Uber',
    amount: 23.45,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 9,
    date: '2025-11-08',
    payee_name: 'Netflix',
    amount: 15.99,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
  {
    transaction_id: 10,
    date: '2025-11-07',
    payee_name: 'Shell Gas',
    amount: 52.00,
    transaction_type: 'expense' as const,
    currency_code: 'USD' as const,
  },
];

export const sampleCategories = [
  {
    category_name: 'Groceries',
    category_group: 'Food & Dining',
    total_amount: 456.78,
    percentage: 35,
    color_code: '#10b981',
  },
  {
    category_name: 'Gas',
    category_group: 'Transportation',
    total_amount: 234.50,
    percentage: 18,
    color_code: '#3b82f6',
  },
  {
    category_name: 'Restaurants',
    category_group: 'Food & Dining',
    total_amount: 187.25,
    percentage: 14,
    color_code: '#10b981',
  },
  {
    category_name: 'Shopping',
    category_group: 'Shopping',
    total_amount: 156.99,
    percentage: 12,
    color_code: '#f59e0b',
  },
  {
    category_name: 'Entertainment',
    category_group: 'Entertainment',
    total_amount: 98.50,
    percentage: 8,
    color_code: '#8b5cf6',
  },
  {
    category_name: 'Utilities',
    category_group: 'Bills & Utilities',
    total_amount: 89.00,
    percentage: 7,
    color_code: '#ef4444',
  },
  {
    category_name: 'Transportation',
    category_group: 'Transportation',
    total_amount: 76.45,
    percentage: 6,
    color_code: '#3b82f6',
  },
];

export const sampleCashFlowData = [
  { date: 'Week 1', income: 800, expense: 450 },
  { date: 'Week 2', income: 0, expense: 380 },
  { date: 'Week 3', income: 3200, expense: 520 },
  { date: 'Week 4', income: 150, expense: 490 },
  { date: 'Week 5', income: 0, expense: 410 },
];

export const samplePayees = [
  {
    payee_name: 'Safeway',
    total_amount: 456.78,
    transaction_count: 8,
    currency_code: 'USD' as const,
  },
  {
    payee_name: 'Shell Gas',
    total_amount: 234.00,
    transaction_count: 12,
    currency_code: 'USD' as const,
  },
  {
    payee_name: 'Amazon',
    total_amount: 187.50,
    transaction_count: 5,
    currency_code: 'USD' as const,
  },
  {
    payee_name: 'Starbucks',
    total_amount: 87.50,
    transaction_count: 15,
    currency_code: 'USD' as const,
  },
  {
    payee_name: 'Target',
    total_amount: 76.23,
    transaction_count: 4,
    currency_code: 'USD' as const,
  },
];
