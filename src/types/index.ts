// Location Types
export interface Location {
  address: string;
  lat: number;
  lng: number;
  name?: string;
}

// Trip Details
export interface TripDetails {
  origin: Location | null;
  destination: Location | null;
  departureTime: Date | null;
  travelDuration: number; // in days
}

// Transit Route Types
export interface TransitRoute {
  id: string;
  type: 'bus' | 'train' | 'subway' | 'flight' | 'walk';
  line?: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distance?: string;
  price?: number;
  provider?: string;
  color?: string;
  icon?: string;
}

// User Preferences
export interface UserPreferences {
  cuisines: string[];
  activities: string[];
  budget: 'budget' | 'moderate' | 'luxury';
  pace: 'relaxed' | 'moderate' | 'fast';
  accommodationType?: 'hostel' | 'hotel' | 'resort';
}

// Recommendation Types
export interface Recommendation {
  id: string;
  name: string;
  type: 'restaurant' | 'attraction' | 'hotel' | 'activity';
  category?: string;
  rating: number;
  reviewCount?: number;
  description: string;
  location: Location;
  imageUrl?: string;
  priceLevel: number; // 1-4
  openNow?: boolean;
  tags?: string[];
  distance?: string;
}

// App State
export interface AppState {
  tripDetails: TripDetails;
  routes: TransitRoute[];
  recommendations: Recommendation[];
  preferences: UserPreferences;
  isLoading: boolean;
  error: string | null;
}
