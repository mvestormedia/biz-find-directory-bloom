import React from 'react';
import { Shield, CheckCircle, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TrustedMembership: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 text-white rounded-full mb-6">
              <Shield className="h-10 w-10" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Trusted Membership</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our exclusive community of verified businesses and unlock premium benefits that help you stand out from the competition.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Premium Placement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your business appears in sponsored results, giving you maximum visibility to potential customers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Verified Badge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Display the trusted member badge that builds credibility and trust with your customers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-purple-500" />
                  Enhanced Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access to premium profile features, detailed analytics, and priority customer support.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Join?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Take your business to the next level with our Trusted Membership program.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button size="lg">
                    Get Started Today
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedMembership;