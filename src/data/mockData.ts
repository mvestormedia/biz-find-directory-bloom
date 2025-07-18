
export interface Award {
  name: string;
  year: number;
  organization: string;
  level: 'gold' | 'silver' | 'bronze' | 'platinum' | 'excellence';
}

export interface Location {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Business {
  id: string;
  name: string;
  description: string;
  logo: string;
  category: string;
  subcategory: string;
  awards: Award[];
  locations: Location[];
  website: string;
  email: string;
  rating: number;
  reviewCount: number;
  yearEstablished: number;
  services: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  isVerified: boolean;
  sponsorshipLevel: 'diamond' | 'gold' | 'silver' | 'bronze' | null;
  isCertifiedMember: boolean;
  categories: string[];
}

export interface Review {
  id: string;
  businessId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "auto",
    name: "Auto",
    subcategories: ["Auto Repair", "Car Dealerships", "Auto Parts", "Car Wash", "Towing Services", "Body Shops", "Oil Change", "Tire Services", "Auto Glass", "Auto Detailing", "Motorcycle Dealers", "RV Dealers", "Auto Insurance", "Auto Loans", "Car Rental"]
  },
  {
    id: "beauty-fashion",
    name: "Beauty-Fashion",
    subcategories: ["Hair Salons", "Nail Salons", "Spas", "Massage Therapy", "Skincare", "Makeup Artists", "Barber Shops", "Eyebrow Threading", "Tattoo Parlors", "Piercing Studios", "Fashion Boutiques", "Clothing Stores", "Shoe Stores", "Jewelry Stores", "Accessories"]
  },
  {
    id: "business",
    name: "Business",
    subcategories: ["Consulting", "Marketing", "Advertising", "Public Relations", "Business Services", "Office Supplies", "Printing Services", "Shipping Services", "Event Planning", "Photography", "Videography", "Web Design", "IT Services", "Software Development", "Coworking Spaces"]
  },
  {
    id: "contractors",
    name: "Contractors",
    subcategories: ["General Contractors", "Plumbing", "Electrical", "HVAC", "Roofing", "Flooring", "Painting", "Landscaping", "Tree Services", "Concrete", "Fencing", "Windows & Doors", "Kitchen Remodeling", "Bathroom Remodeling", "Deck Building"]
  },
  {
    id: "dining",
    name: "Dining",
    subcategories: ["Restaurants", "Fast Food", "Fine Dining", "Cafes", "Coffee Shops", "Bars", "Pubs", "Food Trucks", "Catering", "Bakeries", "Pizza", "Sushi", "Mexican Food", "Italian Food", "Asian Cuisine", "Steakhouses", "Seafood", "Vegetarian", "Food Delivery"]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subcategories: ["Movie Theaters", "Bowling Alleys", "Arcades", "Amusement Parks", "Mini Golf", "Escape Rooms", "Karaoke", "Comedy Clubs", "Concert Venues", "Sports Bars", "Pool Halls", "Dance Clubs", "Art Galleries", "Museums", "Theaters", "Live Music Venues"]
  },
  {
    id: "fitness-outdoors",
    name: "Fitness-Outdoors",
    subcategories: ["Gyms", "Yoga Studios", "Pilates", "Personal Training", "Martial Arts", "Dance Studios", "Swimming Pools", "Tennis Courts", "Golf Courses", "Hiking Trails", "Bike Shops", "Sporting Goods", "Outdoor Gear", "Camping", "Fishing", "Hunting"]
  },
  {
    id: "health",
    name: "Health",
    subcategories: ["Hospitals", "Medical Centers", "Urgent Care", "Family Medicine", "Specialists", "Dental Clinics", "Orthodontists", "Optometrists", "Chiropractors", "Physical Therapy", "Mental Health", "Pharmacies", "Medical Supplies", "Home Health", "Veterinarians"]
  },
  {
    id: "home-improvement",
    name: "Home Improvement",
    subcategories: ["Hardware Stores", "Home Centers", "Appliance Stores", "Furniture Stores", "Interior Design", "Carpet Cleaning", "House Cleaning", "Pest Control", "Security Systems", "Solar Panels", "Pool Services", "Garage Doors", "Gutters", "Insulation", "Siding"]
  },
  {
    id: "legal-finance",
    name: "Legal-Finance",
    subcategories: ["Attorneys", "Law Firms", "Legal Services", "Notaries", "Banks", "Credit Unions", "Investment Services", "Insurance", "Accounting", "Tax Services", "Financial Planning", "Real Estate", "Mortgage Brokers", "Title Companies", "Bail Bonds"]
  },
  {
    id: "services",
    name: "Services",
    subcategories: ["Dry Cleaning", "Laundromats", "Pet Services", "Pet Grooming", "Kennels", "Moving Services", "Storage Units", "Locksmiths", "Appliance Repair", "Electronics Repair", "Computer Repair", "Phone Repair", "Tailoring", "Watch Repair", "Shoe Repair"]
  },
  {
    id: "shopping",
    name: "Shopping",
    subcategories: ["Grocery Stores", "Supermarkets", "Department Stores", "Electronics Stores", "Book Stores", "Toy Stores", "Gift Shops", "Antiques", "Thrift Stores", "Farmers Markets", "Specialty Foods", "Wine Shops", "Garden Centers", "Art Supplies", "Office Supplies"]
  }
];

// Generate mock businesses
const generateMockBusinesses = (): Business[] => {
  const businesses: Business[] = [];
  const businessNames = [
    "Premium Auto Center", "Elite Beauty Salon", "Strategic Business Solutions", "Master Contractors Inc",
    "Gourmet Bistro", "Fun Zone Entertainment", "Peak Fitness Studio", "Advanced Medical Center",
    "Dream Home Improvements", "Trusted Legal Partners", "Quality Service Pro", "Shopping Paradise",
    "Precision Auto Works", "Luxe Beauty Spa", "Innovation Business Hub", "Reliable Contractors",
    "Taste of Heaven", "Adventure Entertainment", "Active Life Gym", "Complete Health Care",
    "Perfect Home Solutions", "Expert Legal Group", "Premier Services", "Value Shopping Center"
  ];

  const awardTypes = [
    { name: "Best of the Best", level: 'platinum' as const, org: "Industry Excellence Awards" },
    { name: "Customer Choice Award", level: 'gold' as const, org: "Local Business Association" },
    { name: "Excellence in Service", level: 'gold' as const, org: "Professional Standards Board" },
    { name: "Top Rated Business", level: 'silver' as const, org: "Community Choice Awards" },
    { name: "Quality Leader", level: 'bronze' as const, org: "Business Quality Institute" },
    { name: "Outstanding Achievement", level: 'excellence' as const, org: "Industry Professional Network" },
    { name: "Certified Professional", level: 'excellence' as const, org: "Professional Certification Board" },
    { name: "Innovation Award", level: 'gold' as const, org: "Technology Innovation Council" },
    { name: "Safety Excellence", level: 'silver' as const, org: "Safety Standards Organization" },
    { name: "Environmental Leader", level: 'bronze' as const, org: "Green Business Council" }
  ];

  const servicesByCategory: { [key: string]: string[] } = {
    "Auto": ["Oil Changes", "Brake Service", "Engine Repair", "Transmission Service", "AC Repair", "Tire Installation"],
    "Beauty-Fashion": ["Haircuts & Styling", "Hair Coloring", "Manicures & Pedicures", "Facials", "Massage Therapy", "Makeup Application"],
    "Business": ["Strategic Planning", "Digital Marketing", "Graphic Design", "Content Creation", "SEO Services", "Social Media Management"],
    "Contractors": ["Home Renovation", "Kitchen Remodeling", "Bathroom Remodeling", "Flooring Installation", "Painting", "Electrical Work"],
    "Dining": ["Dine-In Service", "Takeout", "Delivery", "Catering", "Private Events", "Happy Hour"],
    "Entertainment": ["Live Shows", "Private Parties", "Group Events", "Birthday Parties", "Corporate Events", "Team Building"],
    "Fitness-Outdoors": ["Personal Training", "Group Classes", "Equipment Rental", "Nutrition Counseling", "Fitness Assessments", "Outdoor Adventures"],
    "Health": ["Preventive Care", "Emergency Services", "Specialist Consultations", "Diagnostic Testing", "Treatment Plans", "Follow-up Care"],
    "Home Improvement": ["Design Consultation", "Installation Services", "Maintenance", "Repair Services", "Custom Solutions", "Warranty Support"],
    "Legal-Finance": ["Legal Consultation", "Document Preparation", "Court Representation", "Financial Planning", "Investment Advice", "Tax Preparation"],
    "Services": ["Pickup & Delivery", "Same-Day Service", "Emergency Service", "Maintenance Plans", "Consultation", "Custom Solutions"],
    "Shopping": ["In-Store Shopping", "Online Orders", "Curbside Pickup", "Home Delivery", "Personal Shopping", "Gift Wrapping"]
  };

  const sponsorshipLevels: ('diamond' | 'gold' | 'silver' | 'bronze' | null)[] = ['diamond', 'gold', 'silver', 'bronze', null];

  for (let i = 0; i < 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];
    
    // Generate 0-4 awards randomly
    const numAwards = Math.floor(Math.random() * 5);
    const businessAwards: Award[] = [];
    for (let j = 0; j < numAwards; j++) {
      const award = awardTypes[Math.floor(Math.random() * awardTypes.length)];
      businessAwards.push({
        name: award.name,
        year: 2020 + Math.floor(Math.random() * 4),
        organization: award.org,
        level: award.level
      });
    }

    // Generate additional categories (some businesses are in multiple categories)
    const businessCategories = [category.name];
    if (Math.random() > 0.7) {
      const additionalCategory = categories[Math.floor(Math.random() * categories.length)];
      if (additionalCategory.name !== category.name) {
        businessCategories.push(additionalCategory.name);
      }
    }

    // Generate services based on category
    const categoryServices = servicesByCategory[category.name] || ["Service A", "Service B", "Service C"];
    const numServices = Math.floor(Math.random() * 4) + 3; // 3-6 services
    const businessServices = categoryServices.slice(0, numServices);
    
    businesses.push({
      id: `business-${i + 1}`,
      name: `${businessNames[Math.floor(Math.random() * businessNames.length)]} ${i + 1}`,
      description: `Professional ${subcategory.toLowerCase()} services with over ${Math.floor(Math.random() * 20) + 5} years of experience. We pride ourselves on exceptional customer service and quality results that exceed expectations.`,
      logo: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center`,
      category: category.name,
      subcategory,
      awards: businessAwards,
      locations: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, idx) => ({
        id: `location-${i}-${idx}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main Street`,
        city: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"][Math.floor(Math.random() * 5)],
        state: ["NY", "CA", "IL", "TX", "AZ"][Math.floor(Math.random() * 5)],
        zipCode: String(Math.floor(Math.random() * 90000) + 10000),
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        coordinates: {
          lat: 40.7128 + (Math.random() - 0.5) * 10,
          lng: -74.0060 + (Math.random() - 0.5) * 10
        }
      })),
      website: `https://www.example-business-${i + 1}.com`,
      email: `contact@business-${i + 1}.com`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 500) + 10,
      yearEstablished: Math.floor(Math.random() * 30) + 1994,
      services: businessServices,
      socialMedia: {
        facebook: Math.random() > 0.6 ? `https://facebook.com/business${i + 1}` : undefined,
        instagram: Math.random() > 0.5 ? `https://instagram.com/business${i + 1}` : undefined,
        twitter: Math.random() > 0.7 ? `https://twitter.com/business${i + 1}` : undefined,
        linkedin: Math.random() > 0.6 ? `https://linkedin.com/company/business${i + 1}` : undefined,
        youtube: Math.random() > 0.8 ? `https://youtube.com/@business${i + 1}` : undefined
      },
      isVerified: Math.random() > 0.7, // 30% chance of being verified
      sponsorshipLevel: sponsorshipLevels[Math.floor(Math.random() * sponsorshipLevels.length)],
      isCertifiedMember: Math.random() > 0.6, // 40% chance of being certified member
      categories: businessCategories
    });
  }

  return businesses;
};

// Generate mock reviews
const generateMockReviews = (): Review[] => {
  const reviews: Review[] = [];
  const reviewerNames = [
    "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Thompson", "Jessica Wang",
    "Robert Miller", "Amanda Davis", "Christopher Lee", "Maria Garcia", "James Wilson",
    "Lisa Anderson", "Kevin Zhang", "Jennifer Brown", "Daniel Kim", "Ashley Taylor",
    "Matthew Martinez", "Nicole White", "Ryan Liu", "Lauren Johnson", "Brandon Davis"
  ];

  const reviewComments = [
    "Excellent service! Very professional and went above and beyond my expectations.",
    "Great experience from start to finish. Highly recommend to anyone looking for quality service.",
    "Outstanding work! They really know what they're doing and deliver on their promises.",
    "Good service overall. Fair pricing and timely completion of work.",
    "Professional team with great attention to detail. Will definitely use again.",
    "Exceeded my expectations! The quality of work was fantastic.",
    "Reliable and trustworthy. They delivered exactly what was promised.",
    "Amazing customer service. They made the entire process so easy.",
    "Top-notch quality! Worth every penny spent.",
    "Quick and efficient service. Very satisfied with the results.",
    "Friendly staff and excellent workmanship. Couldn't be happier!",
    "Great value for money. The team was professional and courteous.",
    "Impressed with their expertise and professionalism throughout the project.",
    "Solid service and good communication. They kept me informed every step of the way.",
    "Exceptional quality and attention to detail. Highly recommended!",
    "Very pleased with the outcome. They truly care about customer satisfaction.",
    "Fast, reliable, and affordable. What more could you ask for?",
    "Professional service with a personal touch. Will use them again for sure.",
    "Outstanding results! They delivered exactly what I was looking for.",
    "Great experience overall. The team was knowledgeable and helpful."
  ];

  // Generate reviews for each business
  for (let businessIndex = 1; businessIndex <= 1000; businessIndex++) {
    const numReviews = Math.floor(Math.random() * 15) + 5; // 5-19 reviews per business
    
    for (let reviewIndex = 0; reviewIndex < numReviews; reviewIndex++) {
      const daysAgo = Math.floor(Math.random() * 365);
      const reviewDate = new Date();
      reviewDate.setDate(reviewDate.getDate() - daysAgo);
      
      reviews.push({
        id: `review-${businessIndex}-${reviewIndex + 1}`,
        businessId: `business-${businessIndex}`,
        reviewerName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
        rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
        date: reviewDate.toISOString().split('T')[0], // YYYY-MM-DD format
        verified: Math.random() > 0.3 // 70% chance of being verified
      });
    }
  }

  return reviews;
};

export const mockReviews = generateMockReviews();

export const mockBusinesses = generateMockBusinesses();
