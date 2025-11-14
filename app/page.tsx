import { BottomNav } from '@/components/bottom-nav';
import { BalanceSummaryWidget } from '@/components/widgets/balance-summary';
import { TransactionListWidget } from '@/components/widgets/transaction-list';
import { sampleBalanceData, sampleTransactions } from '@/lib/sample-data';

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>
        
        <div className="space-y-6">
          <BalanceSummaryWidget 
            totalBalance={sampleBalanceData.totalBalance}
            currency={sampleBalanceData.currency}
            monthChange={sampleBalanceData.monthChange}
          />
          
          <TransactionListWidget 
            transactions={sampleTransactions}
            maxItems={10}
          />
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
