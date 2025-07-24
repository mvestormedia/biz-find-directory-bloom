import React from 'react';
import { Award, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AwardBadgeProps {
  type: 'award' | 'sponsor';
  level?: 'gold' | 'silver' | 'bronze' | 'platinum' | 'excellence';
  year?: number;
  sponsorType?: 'Diamond Sponsor' | 'Ruby Sponsor' | 'Emerald Sponsor' | 'Sapphire Sponsor';
  className?: string;
}

const AwardBadge: React.FC<AwardBadgeProps> = ({ 
  type, 
  level, 
  year, 
  sponsorType, 
  className = "" 
}) => {
  if (type === 'award' && level && year) {
    const getAwardColor = () => {
      switch (level) {
        case 'platinum':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'gold':
          return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'silver':
          return 'bg-gray-100 text-gray-800 border-gray-200';
        case 'bronze':
          return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'excellence':
          return 'bg-green-100 text-green-800 border-green-200';
        default:
          return 'bg-blue-100 text-blue-800 border-blue-200';
      }
    };

    return (
      <Badge variant="outline" className={`text-xs ${getAwardColor()} ${className}`}>
        <Award className="h-3 w-3 mr-1" />
        {year} {level.charAt(0).toUpperCase() + level.slice(1)} Winner
      </Badge>
    );
  }

  if (type === 'sponsor' && sponsorType) {
    const getSponsorColor = () => {
      switch (sponsorType) {
        case 'Diamond Sponsor':
          return 'bg-purple-100 text-purple-800 border-purple-200';
        case 'Ruby Sponsor':
          return 'bg-red-100 text-red-800 border-red-200';
        case 'Emerald Sponsor':
          return 'bg-green-100 text-green-800 border-green-200';
        case 'Sapphire Sponsor':
          return 'bg-blue-100 text-blue-800 border-blue-200';
        default:
          return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    };

    return (
      <Badge variant="outline" className={`text-xs ${getSponsorColor()} ${className}`}>
        <Diamond className="h-3 w-3 mr-1" />
        {sponsorType}
      </Badge>
    );
  }

  return null;
};

export default AwardBadge;