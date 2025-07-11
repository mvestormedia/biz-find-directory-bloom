
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { categories, Category } from '@/data/mockData';

interface CategoryFilterProps {
  selectedCategory: string;
  selectedSubcategory: string;
  onCategoryChange: (category: string, subcategory: string) => void;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  selectedSubcategory,
  onCategoryChange,
  className = ""
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    selectedCategory || null
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Categories</h3>
      
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('', '')}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            !selectedCategory 
              ? 'bg-blue-100 text-blue-800 font-medium' 
              : 'hover:bg-gray-50'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleCategory(category.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                selectedCategory === category.name && !selectedSubcategory
                  ? 'bg-blue-100 text-blue-800 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onCategoryChange(category.name, '');
                }}
                className="flex-1 text-left"
              >
                {category.name}
              </span>
              {expandedCategory === category.id ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
            
            {expandedCategory === category.id && (
              <div className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory}
                    onClick={() => onCategoryChange(category.name, subcategory)}
                    className={`w-full text-left px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedSubcategory === subcategory
                        ? 'bg-blue-100 text-blue-800 font-medium'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {subcategory}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
