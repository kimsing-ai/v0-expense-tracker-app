import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BalanceSummaryProps {
  totalBalance: number;
  currency: string;
  monthChange: {
    amount: number;
    percentage: number;
    direction: 'up' | 'down';
  };
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$',
};

export function BalanceSummaryWidget({ totalBalance, currency, monthChange }: BalanceSummaryProps) {
  const symbol = currencySymbols[currency] || currency;
  const isPositive = monthChange.direction === 'up';

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Total Balance</p>
          <p className="text-4xl font-bold tracking-tight">
            {symbol}{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
          )}>
            {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>
              {symbol}{Math.abs(monthChange.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              {' '}({monthChange.percentage > 0 ? '+' : ''}{monthChange.percentage.toFixed(1)}%) this month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
