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
  dynamicSource?: string; // <--- Додали поле для динамічних даних
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
    dynamicSource: "vehicles", // <--- Тепер транспорт динамічний
  },
  {
    to: "/parts",
    label: "Запчастини",
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
