// src/constants/vehicles.ts

export const FUEL_TYPES = [
  { label: "Бензин", value: "бензин" },
  { label: "Дизель", value: "дизель" },
  { label: "Електро", value: "електро" },
  { label: "Гібрид", value: "гібрид" },
];

export const TRANSMISSIONS = [
  { label: "Механіка", value: "механіка" },
  { label: "Автомат", value: "автомат" },
  { label: "Варіатор", value: "варіатор" },
];

// Додаємо категорії транспортних засобів
export const VEHICLE_CATEGORY_NAMES: Record<string, string> = {
  buses: "Автобуси",
  cars: "Легкові",
  trucks: "Вантажні",
  motorcycles: "Мотоцикли",
  special: "Спецтехніка",
  trailers: "Причіпи",
};

export const VEHICLE_CATEGORY_ORDER = [
  "cars",
  "trucks",
  "buses",
  "motorcycles",
  "trailers",
  "special"
];
