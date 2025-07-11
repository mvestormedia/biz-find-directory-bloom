
import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchTerm: string;
  location: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onSearch: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  location,
  onSearchChange,
  onLocationChange,
  onSearch,
  className = ""
}) => {
  return (
    <div className={`flex flex-col md:flex-row gap-4 w-full max-w-4xl ${className}`}>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      
      <div className="relative flex-1 md:flex-initial md:w-80">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="pl-10 h-12 text-lg border-2 border-gray-200 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
      </div>
      
      <Button 
        onClick={onSearch}
        className="h-12 px-8 text-lg bg-blue-600 hover:bg-blue-700 transition-colors"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
