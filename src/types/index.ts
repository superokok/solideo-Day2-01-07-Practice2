export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface TripDetails {
  origin: Location | null;
  destination: Location | null;
  departureTime: string;
  travelDuration: number; // in days
}

export interface TransitRoute {
  id: string;
  type: 'bus' | 'train' | 'flight' | 'walk';
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price?: number;
  provider?: string;
}

export interface Preference {
  cuisine: string[];
  activities: string[];
  budget: 'low' | 'medium' | 'high';
  pace: 'relaxed' | 'moderate' | 'busy';
}

export interface Recommendation {
  id: string;
  name: string;
  type: 'restaurant' | 'attraction' | 'hotel';
  rating: number;
  description: string;
  location: Location;
  imageUrl?: string;
  priceLevel?: number;
}
