import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PayeeSummaryProps {
  payees: Array<{
    payee_name: string;
    total_amount: number;
    transaction_count: number;
    currency_code: string;
  }>;
  period: string;
  maxItems?: number;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$',
};

export function PayeeSummaryWidget({ payees, period, maxItems = 10 }: PayeeSummaryProps) {
  const topPayees = payees.slice(0, maxItems);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Merchants</CardTitle>
        <p className="text-sm text-muted-foreground">{period}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPayees.map((payee, index) => {
            const symbol = currencySymbols[payee.currency_code] || payee.currency_code;
            
            return (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">{payee.payee_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {payee.transaction_count} transaction{payee.transaction_count !== 1 ? 's' : ''}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  {symbol}{payee.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
