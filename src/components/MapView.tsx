import React, { useState } from 'react';
import { Map as MapIcon, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MapViewProps {
  onViewChange: (view: 'list' | 'map') => void;
  currentView: 'list' | 'map';
}

const MapView: React.FC<MapViewProps> = ({ onViewChange, currentView }) => {
  const [mapboxToken, setMapboxToken] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={currentView === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('list')}
          className="flex items-center gap-2"
        >
          <List className="h-4 w-4" />
          List View
        </Button>
        <Button
          variant={currentView === 'map' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('map')}
          className="flex items-center gap-2"
        >
          <MapIcon className="h-4 w-4" />
          Map View
        </Button>
      </div>

      {currentView === 'map' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mapbox Token (Required)
            </label>
            <Input
              type="text"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Get your token from{' '}
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
          
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <MapIcon className="h-8 w-8 mx-auto mb-2" />
              <p className="font-medium">Map View</p>
              <p className="text-sm">
                {mapboxToken ? 'Map would render here with your token' : 'Enter Mapbox token to enable map'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;