export interface IVinInfo {
  code: string;
  status: 'verified' | 'unverified' | string;
  vinCheckedAt: string;
  carfaxUrl: string;
  accidents: number;
  theftRecord: boolean;
}

export interface ISeller {
  id: number;
  type: string;
  name: string;
  phone: string;
  rating: number;
  isVerified: boolean;
}

export interface ICar {
  id: number;
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
  vinInfo: IVinInfo;
  mileage: number;
  engineVolume: number;
  fuelType: string;
  transmission: string;
  driveTrain: string;
  color: string;
  isImported: boolean;
  isCustomsCleared: boolean;
  description: string;
  features: string[];
  seller: ISeller;
  images: string[]; // Масив із трьох фотографій (спереду, збоку, ззаду)
}
