
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Search, X } from 'lucide-react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return categories;
    
    return categories.filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.subcategories.some(sub => 
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Auto-expand categories that match search results
  React.useEffect(() => {
    if (searchTerm && filteredCategories.length > 0) {
      // Auto-expand the first matching category
      setExpandedCategory(filteredCategories[0].id);
    }
  }, [searchTerm, filteredCategories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 ${className}`}>
      <h3 className="font-semibold text-lg mb-4 text-gray-800">Categories</h3>
      
      {/* Search input */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
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
        
        {filteredCategories.map((category) => (
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
                {category.subcategories
                  .filter(sub => !searchTerm || sub.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((subcategory) => (
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
