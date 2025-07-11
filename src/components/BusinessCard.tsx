
import React from 'react';
import { MapPin, Star, Award, Globe, Phone } from 'lucide-react';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <img
            src={business.logo}
            alt={`${business.name} logo`}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1 min-w-0">
            <Link 
              to={`/business/${business.id}`}
              className="block group"
            >
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {business.name}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 mt-1">{business.subcategory}</p>
            
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{business.rating}</span>
                <span className="text-sm text-gray-500">({business.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{business.locations.length} location{business.locations.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {business.awards.length > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Award className="h-3 w-3 mr-1" />
              {business.awards[0].name}
            </Badge>
          )}
          
          <Badge variant="outline" className="text-xs">
            Est. {business.yearEstablished}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{business.locations[0]?.phone}</span>
            </div>
            
            {business.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a 
                  href={business.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Website
                </a>
              </div>
            )}
          </div>
          
          <Link 
            to={`/business/${business.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View Details →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
