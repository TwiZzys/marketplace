export interface NavDropdownItem {
  to: string;
  label: string;
}

export interface NavItem {
  key?: string;
  to?: string;
  label: string;
  basePath?: string;
  children?: NavDropdownItem[];
  dynamicSource?: string; // Поле для динамічних даних (vehicles / parts)
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    to: "/",
    label: "Головна",
  },
  {
    key: "vehicles",
    label: "Транспорт",
    basePath: "/vehicles",
    dynamicSource: "vehicles",
  },
  {
    key: "parts",
    label: "Запчастини",
    basePath: "/parts",
    dynamicSource: "parts", // <--- Додали ключ та динамічне джерело для запчастин з parts.json
  },
  {
    key: "service",
    label: "Сервіс",
    basePath: "/service",
    children: [
      { to: "/service/diagnostics", label: "Діагностика" },
      { to: "/service/repair", label: "Ремонт" },
      { to: "/service/maintenance", label: "ТО та обслуговування" },
      { to: "/service/tire-fitting", label: "Шиномонтаж" },
    ],
  },
  {
    key: "dealers",
    to: "/dealers",
    label: "Дилери",
  },
  {
    key: "supports",
    to: "/supports",
    label: "Підтримка",
  },
];
