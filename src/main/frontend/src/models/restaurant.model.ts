export interface Restaurant {
  id: number;
  name: string;
  location: {
    address: string;
    city: { name: string };
  };
  imagePath: string;
  longitude?: number;
  latitude?: number;
}
