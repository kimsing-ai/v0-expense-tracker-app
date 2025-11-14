import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TransactionListProps {
  transactions: Array<{
    transaction_id: number;
    date: string;
    payee_name?: string;
    amount: number;
    transaction_type: 'income' | 'expense' | 'transfer';
    currency_code: string;
  }>;
  maxItems?: number;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$',
};

export function TransactionListWidget({ transactions, maxItems = 10 }: TransactionListProps) {
  const displayTransactions = transactions.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {displayTransactions.map((transaction) => {
            const symbol = currencySymbols[transaction.currency_code] || transaction.currency_code;
            const date = new Date(transaction.date);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const isIncome = transaction.transaction_type === 'income';
            const displayAmount = isIncome ? transaction.amount : -transaction.amount;

            return (
              <div key={transaction.transaction_id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="text-sm text-muted-foreground w-16 flex-shrink-0">{formattedDate}</span>
                  <span className="text-sm font-medium truncate">
                    {transaction.payee_name || (transaction.transaction_type === 'transfer' ? 'Transfer' : 'Unknown')}
                  </span>
                </div>
                <span className={cn(
                  "text-sm font-semibold flex-shrink-0 ml-2",
                  isIncome ? "text-green-600 dark:text-green-500" : "text-foreground"
                )}>
                  {isIncome ? '+' : ''}{symbol}{displayAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
