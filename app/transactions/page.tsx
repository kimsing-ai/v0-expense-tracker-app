'use client';

import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { fullTransactionsData } from '@/lib/full-sample-data';
import { Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountFilter, setAccountFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = fullTransactionsData.filter((transaction) => {
      const matchesSearch = 
        (transaction.payee?.payee_name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
        (transaction.category?.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesAccount = accountFilter === 'all' || transaction.account.account_name === accountFilter;
      const matchesType = typeFilter === 'all' || transaction.transaction_type === typeFilter;
      const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;

      return matchesSearch && matchesAccount && matchesType && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = new Date(a.transaction_date).getTime();
        const dateB = new Date(b.transaction_date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });

    return filtered;
  }, [searchTerm, accountFilter, typeFilter, statusFilter, sortBy, sortOrder]);

  const uniqueAccounts = Array.from(new Set(fullTransactionsData.map(t => t.account.account_name)));

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Transactions</h1>
        
        <Card className="mb-6">
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={accountFilter} onValueChange={setAccountFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Accounts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {uniqueAccounts.map(account => (
                    <SelectItem key={account} value={account}>{account}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Transaction Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cleared">Cleared</SelectItem>
                  <SelectItem value="reconciled">Reconciled</SelectItem>
                  <SelectItem value="void">Void</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left p-4 font-semibold text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleSort('date')}
                        className="h-auto p-0 hover:bg-transparent"
                      >
                        Date <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </th>
                    <th className="text-left p-4 font-semibold text-sm">Account</th>
                    <th className="text-left p-4 font-semibold text-sm">Payee</th>
                    <th className="text-left p-4 font-semibold text-sm">Category</th>
                    <th className="text-left p-4 font-semibold text-sm">Type</th>
                    <th className="text-right p-4 font-semibold text-sm">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toggleSort('amount')}
                        className="h-auto p-0 hover:bg-transparent"
                      >
                        Amount <ArrowUpDown className="ml-1 h-3 w-3" />
                      </Button>
                    </th>
                    <th className="text-center p-4 font-semibold text-sm">Status</th>
                    <th className="text-left p-4 font-semibold text-sm">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedTransactions.map((transaction) => {
                    const date = new Date(transaction.transaction_date);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const isIncome = transaction.transaction_type === 'income';

                    return (
                      <tr key={transaction.transaction_id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-4 text-sm">{formattedDate}</td>
                        <td className="p-4 text-sm">{transaction.account.account_name}</td>
                        <td className="p-4 text-sm font-medium">{transaction.payee?.payee_name || '-'}</td>
                        <td className="p-4 text-sm">{transaction.category?.category_name || '-'}</td>
                        <td className="p-4 text-sm">
                          <Badge variant={isIncome ? 'default' : 'secondary'} className="capitalize">
                            {transaction.transaction_type}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-right font-semibold">
                          <span className={isIncome ? 'text-green-600 dark:text-green-500' : ''}>
                            {isIncome ? '+' : '-'}${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Badge variant="outline" className="capitalize">
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground truncate max-w-xs">
                          {transaction.description || '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {filteredAndSortedTransactions.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No transactions found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
        
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing {filteredAndSortedTransactions.length} of {fullTransactionsData.length} transactions
        </div>
      </div>
      
      <BottomNav />
    </div>
  );
}
