import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Star, CheckCircle, Diamond } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const TrustedMembership: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Verified Business Status",
      description: "Display your verified status to build customer trust and credibility."
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      title: "Premium Listing Placement",
      description: "Get featured in sponsored results for maximum visibility to potential customers."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-green-600" />,
      title: "Enhanced Business Profile",
      description: "Access to advanced profile features and detailed business information display."
    },
    {
      icon: <Diamond className="h-6 w-6 text-purple-600" />,
      title: "Exclusive Member Badge",
      description: "Display the Trusted Member badge to distinguish your business from competitors."
    }
  ];

  const membershipTiers = [
    {
      name: "Silver Membership",
      price: "$99/month",
      features: [
        "Verified business status",
        "Basic premium placement",
        "Enhanced profile features",
        "Customer support"
      ]
    },
    {
      name: "Gold Membership",
      price: "$199/month",
      features: [
        "All Silver benefits",
        "Priority listing placement",
        "Advanced analytics",
        "Featured business spotlight",
        "Priority customer support"
      ],
      popular: true
    },
    {
      name: "Diamond Membership",
      price: "$399/month",
      features: [
        "All Gold benefits",
        "Top-tier premium placement",
        "Custom business features",
        "Dedicated account manager",
        "Marketing consultation"
      ]
    }
  ];

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
            Back to Search
          </Link>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted Membership Program
            </h1>
            <p className="text-xl text-gray-600">
              Join our exclusive membership program to enhance your business visibility 
              and build customer trust with verified credentials.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Membership Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Choose Your Membership Tier
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {membershipTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${tier.popular ? 'border-blue-500 shadow-lg' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {tier.name}
                  </CardTitle>
                  <div className="text-3xl font-bold text-blue-600 mt-2">
                    {tier.price}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={tier.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Become a Trusted Member?
              </h3>
              <p className="text-gray-600 mb-6">
                Join thousands of businesses who have enhanced their credibility 
                and increased their customer base through our Trusted Membership program.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Start Your Membership Today
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TrustedMembership;