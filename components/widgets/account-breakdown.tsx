import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountBreakdownProps {
  accounts: Array<{
    account_id: number;
    account_name: string;
    account_type: string;
    institution_name?: string;
    current_balance: number;
    currency_code: string;
    is_closed: boolean;
  }>;
  showTotal?: boolean;
}

const currencySymbols: Record<string, string> = {
  USD: '$',
  GBP: '£',
  CAD: 'C$',
};

export function AccountBreakdownWidget({ accounts, showTotal = true }: AccountBreakdownProps) {
  const activeAccounts = accounts.filter(acc => !acc.is_closed);
  const total = activeAccounts.reduce((sum, acc) => sum + acc.current_balance, 0);
  const primaryCurrency = activeAccounts[0]?.currency_code || 'USD';
  const symbol = currencySymbols[primaryCurrency] || primaryCurrency;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activeAccounts.map((account) => {
            const accountSymbol = currencySymbols[account.currency_code] || account.currency_code;
            const displayName = account.institution_name 
              ? `${account.account_name} (${account.institution_name})`
              : account.account_name;

            return (
              <div key={account.account_id} className="flex items-center justify-between py-2">
                <span className="text-sm font-medium">{displayName}</span>
                <span className="text-sm font-semibold">
                  {accountSymbol}{account.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            );
          })}
          
          {showTotal && activeAccounts.length > 0 && (
            <div className="flex items-center justify-between py-2 border-t border-border mt-2 pt-4">
              <span className="text-sm font-bold">Total:</span>
              <span className="text-sm font-bold">
                {symbol}{total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
