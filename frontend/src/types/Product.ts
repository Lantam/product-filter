export interface ProductType {
    id: string;
    title: string;
    image: string;
    price: number;
    category: { name: string };
    description: string;
    averageRating: number;
    numberOfRatings: number;
  }