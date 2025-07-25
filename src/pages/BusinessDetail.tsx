import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Award, MapPin, Phone, Globe, Mail, Calendar, Users, CheckCircle, Diamond, Facebook, Instagram, Twitter, Linkedin, Youtube, Shield, Tag, Star, Search, Filter } from 'lucide-react';
import { mockBusinesses, mockReviews } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TrustedMemberBadge from '@/components/TrustedMemberBadge';
import AwardBadge from '@/components/AwardBadge';

const BusinessDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const business = mockBusinesses.find(b => b.id === id);
  const [reviewSearchTerm, setReviewSearchTerm] = useState('');
  const [showPhoneNumbers, setShowPhoneNumbers] = useState<{ [key: string]: boolean }>({});

  // Get reviews for this business
  const businessReviews = useMemo(() => {
    const reviews = mockReviews.filter(review => review.businessId === id);
    return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [id]);

  // Filter reviews based on search term
  const filteredReviews = useMemo(() => {
    if (!reviewSearchTerm) return businessReviews.slice(0, 10); // Show latest 10 reviews
    
    return businessReviews.filter(review => 
      review.reviewerName.toLowerCase().includes(reviewSearchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(reviewSearchTerm.toLowerCase())
    ).slice(0, 10);
  }, [businessReviews, reviewSearchTerm]);

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
            to="/" 
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
            
            <div className="flex-1 relative">
              {/* Badges in top-right */}
              <div className="absolute top-0 right-0 flex flex-wrap gap-2 justify-end">
                {business.isTrustedMember && (
                  <TrustedMemberBadge onClick={() => window.open('/trusted-membership', '_blank')} />
                )}
                
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
                {business.annualSponsorBadges.slice(0, 2).map((sponsor, index) => (
                  <AwardBadge
                    key={`sponsor-${index}`}
                    type="sponsor"
                    sponsorType={sponsor}
                  />
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2 pr-40">{business.name}</h1>
              <p className="text-lg text-gray-600 mb-3">{business.subcategory}</p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{business.rating}</span>
                  <span>({business.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="h-5 w-5" />
                  <span>{business.locations.length} location{business.locations.length !== 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex items-center gap-1 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Est. {business.yearEstablished}</span>
                </div>
              </div>
              
              {/* Claimed status and verification */}
              <div className="flex items-center gap-3 mb-4">
                {business.claimedStatus === 'claimed' ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                    Claimed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    <Link 
                      to="/claim-listing" 
                      className="flex items-center"
                    >
                      Claim This Listing
                    </Link>
                  </Badge>
                )}
                
                {business.claimedStatus === 'claimed' && business.verifiedDate && (
                  <Badge variant="outline" className="border-green-200 text-green-600">
                    Verified {business.verifiedDate}
                  </Badge>
                )}
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
                  <CardTitle>Services & Products</CardTitle>
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
                              {showPhoneNumbers[location.id] ? (
                                <span className="text-gray-900">{location.phone}</span>
                              ) : (
                                <button 
                                  onClick={() => setShowPhoneNumbers(prev => ({ ...prev, [location.id]: true }))}
                                  className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                  Get Phone Number
                                </button>
                              )}
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
                  {business.locations.length > 0 && showPhoneNumbers[business.locations[0].id] ? (
                    <span className="text-gray-900">{business.locations[0].phone}</span>
                  ) : (
                    <button 
                      onClick={() => business.locations.length > 0 && setShowPhoneNumbers(prev => ({ ...prev, [business.locations[0].id]: true }))}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Get Phone Number
                    </button>
                  )}
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
                
                {/* Social Media integrated */}
                {Object.entries(business.socialMedia).some(([_, url]) => url) && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Follow Us</h4>
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
                  </div>
                )}
                
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Recent Reviews
                </CardTitle>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Search reviews..."
                    value={reviewSearchTerm}
                    onChange={(e) => setReviewSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <div key={review.id} className="border border-gray-100 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{review.reviewerName}</span>
                          {review.verified && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                      <div className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p>No reviews found</p>
                    {reviewSearchTerm && (
                      <p className="text-sm">Try adjusting your search terms</p>
                    )}
                  </div>
                )}
                
                {reviewSearchTerm && filteredReviews.length > 0 && (
                  <div className="text-center pt-2">
                    <p className="text-xs text-gray-500">
                      Showing {filteredReviews.length} of {businessReviews.length} reviews
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetail;
