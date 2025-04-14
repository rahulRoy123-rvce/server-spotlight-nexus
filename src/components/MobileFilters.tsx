
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface MobileFiltersProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  const [open, setOpen] = useState(false);

  const handleSelectCategory = (categoryId: string) => {
    onSelectCategory(categoryId);
    setOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Categories</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => handleSelectCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md flex justify-between items-center ${
                      selectedCategory === category.id
                        ? 'bg-mcp-lightPurple text-mcp-purple font-medium'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-1">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilters;
