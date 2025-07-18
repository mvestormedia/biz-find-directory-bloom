import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, MapPin, Phone, Globe, Mail, Calendar, Users, CheckCircle, Diamond, Facebook, Instagram, Twitter, Linkedin, Youtube, Shield, Tag, Star } from 'lucide-react';
import { mockBusinesses } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const business = mockBusinesses.find(b => b.id === id);

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Business Not Found</h1>
          <Link to="/search" className="text-blue-600 hover:text-blue-800">
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

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
        {level.charAt(0).toUpperCase() + level.slice(1)} Sponsor
      </Badge>
    );
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="h-4 w-4" />;
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'youtube': return <Youtube className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/search" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Results
          </Link>
          
          <div className="flex items-start gap-6">
            <img
              src={business.logo}
              alt={`${business.name} logo`}
              className="w-24 h-24 rounded-xl object-cover border border-gray-200"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
              <p className="text-lg text-gray-600 mb-3">{business.subcategory}</p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Est. {business.yearEstablished}</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <Users className="h-5 w-5" />
                  <span>{business.locations.length} location{business.locations.length !== 1 ? 's' : ''}</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{business.rating}</span>
                  <span>({business.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {business.isVerified && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                
                {getSponsorshipBadge(business.sponsorshipLevel)}
                
                {business.isCertifiedMember && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    <Shield className="h-3 w-3 mr-1" />
                    Certified Member
                  </Badge>
                )}
                
                {business.awards.slice(0, 2).map((award, index) => (
                  <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    <Award className="h-3 w-3 mr-1" />
                    {award.name} {award.year}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {business.categories.map((cat, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About {business.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {business.description}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            {business.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {business.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{service}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {business.locations.map((location) => (
                    <div key={location.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Address</h4>
                          <div className="text-gray-700 space-y-1">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5 text-gray-400" />
                              <div>
                                <p>{location.address}</p>
                                <p>{location.city}, {location.state} {location.zipCode}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Contact</h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <a href={`tel:${location.phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                                Tap to Call
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Map placeholder */}
                      <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p>Interactive map would be shown here</p>
                          <p className="text-sm">Lat: {location.coordinates.lat.toFixed(4)}, Lng: {location.coordinates.lng.toFixed(4)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <a href={`tel:${business.locations[0]?.phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                    Tap to Call
                  </a>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <a href={`mailto:${business.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                    {business.email}
                  </a>
                </div>
                
                {business.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-gray-400" />
                    <a 
                      href={business.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                
                <Button className="w-full mt-4">
                  Contact Business
                </Button>
                
                <Button variant="outline" className="w-full">
                  Claim Listing
                </Button>
              </CardContent>
            </Card>

            {/* Social Media */}
            {Object.entries(business.socialMedia).some(([_, url]) => url) && (
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(business.socialMedia).map(([platform, url]) => 
                      url ? (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                        >
                          {getSocialIcon(platform)}
                          <span className="capitalize">{platform}</span>
                        </a>
                      ) : null
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
