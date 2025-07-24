
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import TrustedMemberBadge from './TrustedMemberBadge';
import AwardBadge from './AwardBadge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface BusinessCardProps {
  business: Business;
}

// Helper to get award badges for the business
const getAwardBadges = (business: Business) => {
  const awardBadges = business.awards.slice(0, 2).map((award, index) => (
    <AwardBadge key={`award-${index}`} type="award" level={award.level} year={award.year} />
  ));
  
  // Add sponsor badge if business has sponsorship level
  if (business.sponsorshipLevel) {
    awardBadges.push(
      <AwardBadge key="sponsor" type="sponsor" level={business.sponsorshipLevel} />
    );
  }
  
  return awardBadges;
};

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <TooltipProvider>
      <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
        <CardHeader className="pb-2">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={business.logo}
                alt={`${business.name} logo`}
                className="w-[75px] h-[75px] rounded-lg object-cover border border-gray-200"
              />
              {/* Trusted Member Badge in top-right */}
              {business.isCertifiedMember && (
                <div className="absolute -top-2 -right-2">
                  <TrustedMemberBadge size="sm" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <Link 
                to={`/business/${business.id}`}
                className="block group"
              >
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {business.name}
                </h3>
              </Link>
              
              {/* Show multiple categories if available */}
              <div className="flex flex-wrap gap-1 mt-1">
                <span className="text-sm text-gray-600">{business.subcategory}</span>
                {business.categories.slice(1).map((category, index) => (
                  <span key={index} className="text-sm text-gray-600">
                    • {category}
                  </span>
                ))}
              </div>
              
              {/* Swapped: Reviews first, then locations */}
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
                    <span>{business.locations.length} locations</span>
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
          
          {/* Award and Sponsor badges at bottom */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 flex-1">
              {getAwardBadges(business)}
              
              {business.awards.length > 2 && (
                <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                  +{business.awards.length - 2} more
                </span>
              )}
            </div>
            
            <Link 
              to={`/business/${business.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm whitespace-nowrap"
            >
              View Details →
            </Link>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default BusinessCard;
