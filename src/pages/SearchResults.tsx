
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, Info, List, Map } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import BusinessCard from '@/components/BusinessCard';
import MapView from '@/components/MapView';
import { mockBusinesses, Business } from '@/data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(searchParams.get('subcategory') || '');
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
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

    // Apply sorting
    const sortedBusinesses = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          // For demo purposes, sort by location count as proxy for distance
          return a.locations.length - b.locations.length;
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        case 'relevance':
        default:
          // Sort by rating as proxy for relevance
          return b.rating - a.rating;
      }
    });

    setFilteredBusinesses(sortedBusinesses);
    setCurrentPage(1);
  }, [searchTerm, location, selectedCategory, selectedSubcategory, sortBy]);


  const handleSearch = () => {
    // Search is handled by useEffect when state changes
  };

  const handleCategoryChange = (category: string, subcategory: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  // Separate sponsored and regular results
  const sponsoredBusinesses = filteredBusinesses.filter(business => business.isSponsored);
  const regularBusinesses = filteredBusinesses.filter(business => !business.isSponsored);

  // Pagination for regular businesses only (sponsored are shown all)
  const indexOfLastBusiness = currentPage * businessesPerPage;
  const indexOfFirstBusiness = indexOfLastBusiness - businessesPerPage;
  const currentRegularBusinesses = regularBusinesses.slice(indexOfFirstBusiness, indexOfLastBusiness);
  const totalPages = Math.ceil(regularBusinesses.length / businessesPerPage);

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
            <div className="space-y-6 sticky top-24">
              {/* Category Filter */}
              <CategoryFilter
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
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
              
              {/* View toggle and Sort dropdown */}
              <div className="flex items-center gap-4">
                {/* View mode toggle */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="flex items-center gap-2"
                  >
                    <List className="h-4 w-4" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    className="flex items-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    Map
                  </Button>
                </div>
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="alphabetical">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

            {/* Results content based on view mode */}
            {viewMode === 'map' ? (
              <div className="h-[600px]">
                <MapView businesses={filteredBusinesses} />
              </div>
            ) : (
              /* Results grid */
              (sponsoredBusinesses.length > 0 || currentRegularBusinesses.length > 0) ? (
                <>
                  {/* Sponsored Results */}
                  {sponsoredBusinesses.length > 0 && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Sponsored Results</h2>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button className="inline-flex items-center justify-center">
                              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs text-sm">
                              Candidates paid for this premium location as a benefit of their{' '}
                              <a 
                                href="/trusted-membership" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                Trusted Membership
                              </a>
                              .
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="grid gap-6 mb-8">
                        {sponsoredBusinesses.map((business) => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Other Results */}
                  {currentRegularBusinesses.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4">All Other Results</h2>
                      <div className="grid gap-6">
                        {currentRegularBusinesses.map((business) => (
                          <BusinessCard key={business.id} business={business} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                      {/* Previous button */}
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      >
                        Previous
                      </button>

                      {/* First page */}
                      {currentPage > 3 && (
                        <>
                          <button
                            onClick={() => setCurrentPage(1)}
                            className="px-3 py-2 rounded-md transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          >
                            1
                          </button>
                          {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                        </>
                      )}

                      {/* Page numbers around current page */}
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        
                        if (page < 1 || page > totalPages) return null;
                        
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-md transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}

                      {/* Last page */}
                      {currentPage < totalPages - 2 && totalPages > 5 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-2 rounded-md transition-colors bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}

                      {/* Next button */}
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or browse our categories.</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
