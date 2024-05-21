export interface Restaurant {
  id: number;
  name: string;
  location: {
    address: string;
    city: { name: string };
    latitude: number;
    longitude: number;
  };
  imagePath: string;
  longitude?: number;
  latitude?: number;
}
