import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CategorySpendingProps {
  categories: Array<{
    category_name: string;
    category_group: string;
    total_amount: number;
    percentage: number;
    color_code?: string;
  }>;
  period: string;
  displayMode?: 'list' | 'chart';
}

const currencySymbol = '$';

export function CategorySpendingWidget({ categories, period, displayMode = 'list' }: CategorySpendingProps) {
  const topCategories = categories.slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <p className="text-sm text-muted-foreground">{period}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category.category_group}</span>
                <span className="font-semibold">
                  {currencySymbol}{category.total_amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Progress 
                  value={category.percentage} 
                  className="h-2 flex-1"
                  style={{ 
                    ['--progress-background' as string]: category.color_code || 'hsl(var(--primary))'
                  } as React.CSSProperties}
                />
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {category.percentage.toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
