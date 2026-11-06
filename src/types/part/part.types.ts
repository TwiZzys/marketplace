export interface Part {
  id: string;
  category: string;
  targetCategory: string;
  subCategory: string;
  brand: string;
  model: string;
  partNumber: string;
  compatibility: string;
  year: number;
  isNew: boolean;
  price: number;
  currency: string;
  city: string;
  region: string;
  createdAt: string;
  isActive: boolean;
  viewsCount: number;
  isImported: boolean;
  isCustomsCleared: boolean;
  description: string;
  features: string[];
  images: string[];
  sellerId: string;
}
