
export interface Award {
  name: string;
  year: number;
  organization: string;
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
    twitter?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    id: "automotive",
    name: "Automotive",
    subcategories: ["Auto Repair", "Car Dealerships", "Auto Parts", "Car Wash", "Towing Services"]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    subcategories: ["Hospitals", "Dental Clinics", "Pharmacies", "Medical Centers", "Specialists"]
  },
  {
    id: "retail",
    name: "Retail",
    subcategories: ["Clothing Stores", "Electronics", "Grocery Stores", "Home & Garden", "Sporting Goods"]
  },
  {
    id: "restaurants",
    name: "Restaurants & Food",
    subcategories: ["Fast Food", "Fine Dining", "Cafes", "Food Delivery", "Catering"]
  },
  {
    id: "services",
    name: "Professional Services",
    subcategories: ["Legal Services", "Accounting", "Real Estate", "Insurance", "Consulting"]
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    subcategories: ["Hair Salons", "Spas", "Fitness Centers", "Nail Salons", "Massage Therapy"]
  },
  {
    id: "home",
    name: "Home Services",
    subcategories: ["Plumbing", "Electrical", "HVAC", "Cleaning Services", "Landscaping"]
  },
  {
    id: "education",
    name: "Education",
    subcategories: ["Schools", "Universities", "Training Centers", "Tutoring", "Libraries"]
  },
  {
    id: "entertainment",
    name: "Entertainment",
    subcategories: ["Movie Theaters", "Bars & Nightlife", "Recreation Centers", "Event Venues", "Museums"]
  },
  {
    id: "technology",
    name: "Technology",
    subcategories: ["IT Services", "Software Development", "Computer Repair", "Web Design", "Digital Marketing"]
  }
];

// Generate mock businesses
const generateMockBusinesses = (): Business[] => {
  const businesses: Business[] = [];
  const businessNames = [
    "TechFlow Solutions", "Green Valley Motors", "Sunrise Medical Center", "Elite Consulting Group",
    "Urban Bistro", "Crystal Clear Cleaning", "Premier Legal Services", "Fitness First Gym",
    "Digital Marketing Pro", "Home Comfort HVAC", "Bella Vista Salon", "Mountain View Dental",
    "Swift Auto Repair", "Golden Gate Restaurant", "Precision Engineering", "Bright Future Academy"
  ];

  for (let i = 0; i < 1000; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const subcategory = category.subcategories[Math.floor(Math.random() * category.subcategories.length)];
    
    businesses.push({
      id: `business-${i + 1}`,
      name: `${businessNames[Math.floor(Math.random() * businessNames.length)]} ${i + 1}`,
      description: `Professional ${subcategory.toLowerCase()} services with over ${Math.floor(Math.random() * 20) + 5} years of experience. We pride ourselves on exceptional customer service and quality results.`,
      logo: `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center`,
      category: category.name,
      subcategory,
      awards: Math.random() > 0.7 ? [
        {
          name: "Excellence Award",
          year: 2023,
          organization: "Industry Association"
        }
      ] : [],
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
      services: [`Service A`, `Service B`, `Service C`].slice(0, Math.floor(Math.random() * 3) + 1),
      socialMedia: {
        facebook: Math.random() > 0.5 ? `https://facebook.com/business${i + 1}` : undefined,
        linkedin: Math.random() > 0.5 ? `https://linkedin.com/company/business${i + 1}` : undefined
      }
    });
  }

  return businesses;
};

export const mockBusinesses = generateMockBusinesses();
