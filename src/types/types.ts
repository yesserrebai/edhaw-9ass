export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface Report {
  timestamp: string;
  timeCategory: 'now' | 'recent' | 'earlier' | 'muchEarlier';
  location: Location;
}
