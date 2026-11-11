import { useQuery } from '@tanstack/react-query';
import { Vehicle, Part } from '@/types';

const fetchVehicles = async (): Promise<Vehicle[]> => {
  const res = await fetch('/data/vehicles.json');
  if (!res.ok) throw new Error('Помилка завантаження машин');
  return res.json();
};

const fetchParts = async (): Promise<Part[]> => {
  const res = await fetch('/data/parts.json');
  if (!res.ok) throw new Error('Помилка завантаження запчастин');
  return res.json();
};

export function useVehicles() {
  return useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicles,
    staleTime: 1000 * 60 * 5, // Кешуємо на 5 хвилин
  });
}

export function useParts() {
  return useQuery({
    queryKey: ['parts'],
    queryFn: fetchParts,
    staleTime: 1000 * 60 * 5,
  });
}
