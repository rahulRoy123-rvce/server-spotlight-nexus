
import React from 'react';
import { Category } from '@/lib/types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-full p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      <nav>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => onSelectCategory(category.id)}
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
      </nav>
    </aside>
  );
};

export default Sidebar;
