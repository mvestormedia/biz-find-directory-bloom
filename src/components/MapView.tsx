import React from 'react';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  businesses: Business[];
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ businesses, className = "" }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Map View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>Interactive map would be shown here</p>
            <p className="text-sm">{businesses.length} businesses in this area</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;