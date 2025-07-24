import React from 'react';
import { Award, Diamond } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AwardBadgeProps {
  type: 'award' | 'sponsor';
  level: string;
  year?: number;
  size?: 'sm' | 'md';
}

const AwardBadge: React.FC<AwardBadgeProps> = ({ type, level, year, size = 'sm' }) => {
  const getAwardColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  const getSponsorColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'diamond':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ruby':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'emerald':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'sapphire':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sizeClass = size === 'sm' ? 'text-xs' : 'text-sm';
  const iconSize = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';

  if (type === 'award') {
    return (
      <Badge 
        variant="outline" 
        className={`${sizeClass} ${getAwardColor(level)}`}
      >
        <Award className={`${iconSize} mr-1`} />
        {year} {level.charAt(0).toUpperCase() + level.slice(1)} Winner
      </Badge>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className={`${sizeClass} ${getSponsorColor(level)}`}
    >
      <Diamond className={`${iconSize} mr-1`} />
      {level.charAt(0).toUpperCase() + level.slice(1)} Sponsor
    </Badge>
  );
};

export default AwardBadge;