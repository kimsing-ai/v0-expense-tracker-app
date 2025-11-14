import { BottomNav } from '@/components/bottom-nav';
import { BalanceSummaryWidget } from '@/components/widgets/balance-summary';
import { TransactionListWidget } from '@/components/widgets/transaction-list';
import { AccountBreakdownWidget } from '@/components/widgets/account-breakdown';
import { CategorySpendingWidget } from '@/components/widgets/category-spending';
import { CashFlowTimelineWidget } from '@/components/widgets/cash-flow-timeline';
import { PayeeSummaryWidget } from '@/components/widgets/payee-summary';
import {
  sampleBalanceData,
  sampleAccounts,
  sampleTransactions,
  sampleCategories,
  sampleCashFlowData,
  samplePayees,
} from '@/lib/sample-data';

export default function DebugPage() {
  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Debug - Type A Widgets</h1>
          <p className="text-muted-foreground">
            Showcase of all widget components with sample data for design review
          </p>
        </div>

        <div className="space-y-8">
          {/* Widget 1: Balance Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              1. Balance Summary Widget
            </h2>
            <BalanceSummaryWidget
              totalBalance={sampleBalanceData.totalBalance}
              currency={sampleBalanceData.currency}
              monthChange={sampleBalanceData.monthChange}
            />
          </div>

          {/* Widget 2: Transaction List */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              2. Transaction List Widget
            </h2>
            <TransactionListWidget transactions={sampleTransactions} maxItems={10} />
          </div>

          {/* Widget 3: Account Breakdown */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              3. Account Breakdown Widget
            </h2>
            <AccountBreakdownWidget accounts={sampleAccounts} showTotal={true} />
          </div>

          {/* Widget 4: Category Spending */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              4. Category Spending Widget
            </h2>
            <CategorySpendingWidget
              categories={sampleCategories}
              period="October 2025"
              displayMode="list"
            />
          </div>

          {/* Widget 5: Cash Flow Timeline */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              5. Cash Flow Timeline Widget
            </h2>
            <CashFlowTimelineWidget
              data={sampleCashFlowData}
              period="month"
              currency="USD"
            />
          </div>

          {/* Widget 6: Payee Summary */}
          <div>
            <h2 className="text-xl font-semibold mb-3 text-foreground/90">
              6. Merchant/Payee Summary Widget
            </h2>
            <PayeeSummaryWidget
              payees={samplePayees}
              period="October 2025"
              maxItems={5}
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This page displays all Type A widget components with
            realistic sample data for development and design review purposes. Each widget is
            a reusable component that can be integrated into other pages with different data.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
