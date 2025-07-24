import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Business } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

interface MapViewProps {
  businesses: Business[];
  className?: string;
}

const MapView: React.FC<MapViewProps> = ({ businesses, className = "" }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = React.useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      zoom: 10,
      center: [-74.0060, 40.7128], // NYC default
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for businesses
    businesses.slice(0, 50).forEach((business) => {
      if (business.locations.length > 0) {
        const location = business.locations[0];
        
        // Create marker
        const marker = new mapboxgl.Marker()
          .setLngLat([location.coordinates.lng, location.coordinates.lat])
          .addTo(map.current!);

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-sm">${business.name}</h3>
              <p class="text-xs text-gray-600">${business.subcategory}</p>
              <p class="text-xs mt-1">${location.address}</p>
              <p class="text-xs">${location.city}, ${location.state}</p>
            </div>
          `);

        marker.setPopup(popup);
      }
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [businesses, mapboxToken]);

  if (!mapboxToken) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Map View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Enter your Mapbox public token to view the map:
            </p>
            <Input
              placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGV..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Get your token at{' '}
              <a 
                href="https://mapbox.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                mapbox.com
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Map View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={mapContainer} className="h-64 w-full rounded-lg" />
      </CardContent>
    </Card>
  );
};

export default MapView;