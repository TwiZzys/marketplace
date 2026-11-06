export interface VinInfo {
  code: string | null;
  status: string;
  vinCheckedAt: string | null;
  carfaxUrl: string | null;
  accidents: number;
  theftRecord: boolean;
}

export interface Vehicle {
  id: string;
  category: string;
  subCategory: string;
  brand: string;
  model: string;
  trim: string;
  year: number;
  isNew: boolean;
  price: number;
  currency: string;
  city: string;
  region: string;
  plateNumber: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  viewsCount: number;
  vinInfo: VinInfo;
  mileage: number;
  engineVolume: number | null;
  batteryRange: number | null;
  fuelType: string | null;
  transmission: string | null;
  driveTrain: string;
  color: string;
  isImported: boolean;
  isCustomsCleared: boolean;
  description: string;
  features: string[];
  images: string[];
  sellerId: string;
}
