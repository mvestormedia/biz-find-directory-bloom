
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import BusinessCard from '@/components/BusinessCard';
import { mockBusinesses, Business } from '@/data/mockData';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || '');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const businessesPerPage = 12;

  useEffect(() => {
    let filtered = mockBusinesses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(business => business.category === selectedCategory);
    }

    // Filter by subcategory
    if (selectedSubcategory) {
      filtered = filtered.filter(business => business.subcategory === selectedSubcategory);
    }

    // Filter by location (basic implementation)
    if (location) {
      filtered = filtered.filter(business =>
        business.locations.some(loc =>
          loc.city.toLowerCase().includes(location.toLowerCase()) ||
          loc.state.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    setFilteredBusinesses(filtered);
    setCurrentPage(1);
  }, [searchTerm, location, selectedCategory, selectedSubcategory]);

  const handleSearch = () => {
    // Search is handled by useEffect when state changes
  };

  const handleCategoryChange = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  // Pagination
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentBusinesses = filteredBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);
  const totalPages = Math.ceil(filteredBusinesses.length / businessesPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with search */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <SearchBar
            searchTerm={searchTerm}
            location={location}
            onSearchChange={setSearchTerm}
            onLocationChange={setLocation}
            onSearch={handleSearch}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar with filters */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              onCategoryChange={handleCategoryChange}
              className="sticky top-24"
            />
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {filteredBusinesses.length} Results
                </h1>
                {(searchTerm || selectedCategory || location) && (
                  <p className="text-gray-600 mt-1">
                    {searchTerm && `for "${searchTerm}"`}
                    {selectedSubcategory ? ` in ${selectedSubcategory}` : selectedCategory ? ` in ${selectedCategory}` : ''}
                    {location && ` near ${location}`}
                  </p>
                )}
              </div>
            </div>

            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-6">
              <CategoryFilter
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Results grid */}
            {currentBusinesses.length > 0 ? (
              <>
                <div className="grid gap-6 mb-8">
                  {currentBusinesses.map((business) => (
                    <BusinessCard key={business.id} business={business} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or browse our categories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
