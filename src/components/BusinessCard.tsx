
import React from 'react';
import { MapPin, Award, CheckCircle, Diamond, Shield, Star } from 'lucide-react';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="w-14 h-14 rounded-lg object-cover border border-gray-200"
            />
            {business.isVerified && (
              <div className="absolute -top-1 -right-1 bg-blue-600 rounded-full p-1">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Link 
              to={`/business/${business.id}`}
              className="block group"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {business.name}
                </h3>
                {business.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
            </Link>
            <p className="text-sm text-gray-600 mt-1">{business.subcategory}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{business.locations.length} location{business.locations.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>{business.rating}</span>
                <span>({business.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
          {business.description}
        </p>
        
        {/* Badges and View Details section */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2 flex-1">
            {getSponsorshipBadge(business.sponsorshipLevel)}
            
            {business.isCertifiedMember && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                Certified
              </Badge>
            )}
            
            {business.awards.slice(0, 2).map((award, index) => (
              <Badge
                key={index}
                variant="outline"
                className={`text-xs ${getAwardColor(award.level)}`}
              >
                <Award className="h-3 w-3 mr-1" />
                {award.name} {award.year}
              </Badge>
            ))}
            
            {business.awards.length > 2 && (
              <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600">
                +{business.awards.length - 2} more
              </Badge>
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
  );
};

export default BusinessCard;
