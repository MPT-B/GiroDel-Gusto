export interface CuisineType {
  id: number;
  type: string;
  icon: string;
}

export interface CuisineFilterProps {
  cuisineTypes: CuisineType[];
  onCuisineClick?: (cuisineId: number) => void;
  selectedCuisineId: number | null;
}
