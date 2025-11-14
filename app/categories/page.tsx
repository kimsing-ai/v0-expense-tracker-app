'use client';

import { useState, useMemo } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { fullCategoriesData } from '@/lib/full-sample-data';
import { Search } from 'lucide-react';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredCategories = useMemo(() => {
    return fullCategoriesData.filter((category) => {
      const matchesSearch = 
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.category_group.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || category.category_type === typeFilter;
      const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' ? category.is_active : !category.is_active);

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  return (
    <div className="min-h-screen pb-20 bg-muted/30">
      <div className="container mx-auto p-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">Categories</h1>
        
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category Type" />
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
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
                    <th className="text-left p-4 font-semibold text-sm">Category Name</th>
                    <th className="text-left p-4 font-semibold text-sm">Group</th>
                    <th className="text-left p-4 font-semibold text-sm">Type</th>
                    <th className="text-center p-4 font-semibold text-sm">Color</th>
                    <th className="text-center p-4 font-semibold text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((category) => (
                    <tr key={category.category_id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4 font-medium">{category.category_name}</td>
                      <td className="p-4 text-sm">{category.category_group}</td>
                      <td className="p-4 text-sm capitalize">{category.category_type}</td>
                      <td className="p-4 text-center">
                        {category.color_code && (
                          <div className="flex items-center justify-center gap-2">
                            <div 
                              className="w-6 h-6 rounded border border-border"
                              style={{ backgroundColor: category.color_code }}
                            />
                            <span className="text-xs text-muted-foreground">{category.color_code}</span>
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <Badge variant={category.is_active ? 'default' : 'secondary'}>
                          {category.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No categories found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <BottomNav />
    </div>
  );
}
