'use client';

import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { fullAccountsData } from '@/lib/full-sample-data';
import { Search } from 'lucide-react';

export default function AccountsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAccounts = useMemo(() => {
    return fullAccountsData.filter((account) => {
      const matchesSearch = 
        account.account_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (account.institution_name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      
      const matchesType = accountTypeFilter === 'all' || account.account_type.type_name === accountTypeFilter;
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? !account.is_closed : account.is_closed);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, accountTypeFilter, statusFilter]);

  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Accounts</h1>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Account Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="checking">Checking</SelectItem>
                  <SelectItem value="savings">Savings</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="loan">Loan</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
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
                    <th className="text-left p-4 font-semibold text-sm">Account Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Type</th>
                    <th className="text-left p-4 font-semibold text-sm">Institution</th>
                    <th className="text-left p-4 font-semibold text-sm">Currency</th>
                    <th className="text-right p-4 font-semibold text-sm">Balance</th>
                    <th className="text-right p-4 font-semibold text-sm">Credit Limit</th>
                    <th className="text-center p-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.account_id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 font-medium">{account.account_name}</td>
                      <td className="p-4 text-sm capitalize">{account.account_type.type_name.replace('_', ' ')}</td>
                      <td className="p-4 text-sm">{account.institution_name || '-'}</td>
                      <td className="p-4 text-sm">{account.currency_code}</td>
                      <td className="p-4 text-sm text-right font-semibold">
                        ${account.current_balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 text-sm text-right">
                        {account.credit_limit ? `$${account.credit_limit.toLocaleString('en-US')}` : '-'}
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant={account.is_closed ? 'secondary' : 'default'}>
                          {account.is_closed ? 'Closed' : 'Active'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredAccounts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No accounts found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
