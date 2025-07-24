
import React from 'react';
import { MapPin, Award, CheckCircle, Diamond, Shield, Star } from 'lucide-react';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Link } from 'react-router-dom';
import TrustedMemberBadge from './TrustedMemberBadge';
import AwardBadge from './AwardBadge';

interface BusinessCardProps {
  business: Business;
}

const getAwardColor = (level: string) => {
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

const getSponsorshipBadge = (level: string | null) => {
  if (!level) return null;
  
  const colors = {
    diamond: 'bg-purple-100 text-purple-800 border-purple-200',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    silver: 'bg-gray-100 text-gray-800 border-gray-200',
    bronze: 'bg-orange-100 text-orange-800 border-orange-200'
  };
  
  return (
    <Badge variant="secondary" className={colors[level as keyof typeof colors]}>
      <Diamond className="h-3 w-3 mr-1" />
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </Badge>
  );
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const handleTrustedMemberClick = () => {
    window.open('/trusted-membership', '_blank');
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="w-[75px] h-[75px] rounded-lg object-cover border border-gray-200"
            />
          </div>
          <div className="flex-1 min-w-0 relative">
            {/* Trusted Member Badge in top-right */}
            {business.isTrustedMember && (
              <div className="absolute top-0 right-0">
                <TrustedMemberBadge onClick={handleTrustedMemberClick} />
              </div>
            )}
            
            <Link 
              to={`/business/${business.id}`}
              className="block group"
            >
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-20">
                {business.name}
              </h3>
            </Link>
            
            {/* Multiple categories display */}
            <div className="flex flex-wrap gap-1 text-sm text-gray-600 mt-1">
              {business.categories.map((category, index) => (
                <span key={category}>
                  {category}
                  {index < business.categories.length - 1 && <span className="mx-1">•</span>}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{business.rating}</span>
                <span>({business.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {business.locations.length === 1 ? (
                  <span>{business.locations[0].address}, {business.locations[0].city}</span>
                ) : (
                  <span>{business.locations.length} location{business.locations.length !== 1 ? 's' : ''}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>
        
        {/* Bottom badges section */}
        <div className="flex flex-wrap gap-2 mb-3">
          {/* Award badges */}
          {business.awards.slice(0, 2).map((award, index) => (
            <AwardBadge
              key={`award-${index}`}
              type="award"
              level={award.level}
              year={award.year}
            />
          ))}
          
          {/* Annual sponsor badges */}
          {business.annualSponsorBadges.map((sponsor, index) => (
            <AwardBadge
              key={`sponsor-${index}`}
              type="sponsor"
              sponsorType={sponsor}
            />
          ))}
          
          {(business.awards.length > 2 || business.annualSponsorBadges.length > 2) && (
            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
              +{Math.max(0, business.awards.length - 2 + business.annualSponsorBadges.length - 2)} more
            </Badge>
          )}
        </div>
        
        <div className="flex justify-end">
          <Link 
            to={`/business/${business.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm whitespace-nowrap"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
