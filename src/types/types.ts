export interface Location {
  city: string;
  region: string;
  postCode: string;
}

export interface Report {
  timestamp: string;
  timeCategory: "now" | "<1h" | ">1h";
  location: Location;
}
