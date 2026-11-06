import { AppImage } from "@shared/components/app-image";
import { createStyles } from "@utils/";
import { NAVIGATION_ITEMS, THEME, THEME_STORAGE_KEY, ThemeType } from "@/constants";
import {
  CircleUserRound,
  Heart,
  Menu,
  Monitor,
  Moon,
  Plus,
  Search,
  Sun,
  X,
} from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import style from "./scss/header.module.scss";
import { Vehicle, Part } from "@/types";

interface HeaderProps {
  vehicles?: Vehicle[];
  parts?: Part[];
}

const CATEGORY_NAMES: Record<string, string> = {
  buses: "Автобуси",
  cars: "Легкові",
  trucks: "Вантажні",
  motorcycles: "Мотоцикли",
  special: "Спецтехніка",
  trailers: "Причіпи",
};

// Українські назви для підкатегорій запчастин з урахуванням subCategory з parts.json
const PART_CATEGORY_NAMES: Record<string, string> = {
  engine: "Двигун",
  suspension: "Підвіска",
  brakes: "Гальмівна система",
  transmission: "Трансмісія",
  filters: "Фільтри",
  exhaust: "Вихлопна система",
};

const CATEGORY_ORDER = ["cars", "trucks", "buses", "motorcycles", "trailers", "special"];
const PART_CATEGORY_ORDER = ["engine", "suspension", "brakes", "transmission", "filters", "exhaust"];

export const Header: React.FC<HeaderProps> = ({ vehicles, parts }) => {
  const location = useLocation();

  // Стан для мобільного меню (бургера)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Десктопний стан: активний ключ дропдауна
  const [activeDesktopDropdown, setActiveDesktopDropdown] = useState<string | null>(null);

  // Мобільний стан: масив відкритих пунктів
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState<string[]>([]);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDesktopDropdown(null);
        setOpenMobileDropdowns([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Унікальні категорії для транспорту
  const uniqueCategories = Array.from(
    new Set((vehicles || []).map((v) => v.category))
  ).sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a);
    const indexB = CATEGORY_ORDER.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Унікальні підкатегорії для запчастин (беремо subCategory з parts.json)[cite: 2]
  const uniquePartCategories = Array.from(
    new Set((parts || []).map((p) => p.subCategory))
  ).sort((a, b) => {
    const indexA = PART_CATEGORY_ORDER.indexOf(a);
    const indexB = PART_CATEGORY_ORDER.indexOf(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const [theme, setTheme] = useState<ThemeType>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem(THEME_STORAGE_KEY) as ThemeType) || THEME.SYSTEM;
    }
    return THEME.SYSTEM;
  });

  useEffect(() => {
    const body = document.body;
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const applyTheme = () => {
      if (theme === THEME.DARK) {
        body.classList.add("dark");
      } else if (theme === THEME.LIGHT) {
        body.classList.remove("dark");
        if (body.classList.length === 0) {
          body.removeAttribute("class");
        }
      } else if (theme === THEME.SYSTEM) {
        const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isSystemDark) {
          body.classList.add("dark");
        } else {
          body.classList.remove("dark");
          if (body.classList.length === 0) {
            body.removeAttribute("class");
          }
        }
      }
    };

    applyTheme();

    if (theme === THEME.SYSTEM) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${style.menu__link} ${style["menu__link--active"]}` : style.menu__link;

  const getDropdownActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${style["dropdown-link"]} ${style["dropdown-link--active"]}` : style["dropdown-link"];

  const s = createStyles(style);

  return (
    <header className={s("header")} ref={headerRef}>
      <div className="container">
        <div className={s("header__inner")}>
          <a className={s("logo")} href="/">
            <AppImage
              className={s("logo__picture")}
              src={"assets/images/logo.svg"}
              alt={"logo"}
            />
          </a>
          <nav className={s("menu")}>
            <button
              className={s("menu__btn")}
              onClick={() => {
                const nextMenuState = !isMenuOpen;
                setIsMenuOpen(nextMenuState);

                if (nextMenuState) {
                  if (activeDesktopDropdown !== "theme") {
                    setActiveDesktopDropdown(null);
                  }

                  for (const item of NAVIGATION_ITEMS) {
                    if (item.key) {
                      let dropdownItems = item.children;
                      if (item.dynamicSource === "vehicles") {
                        dropdownItems = uniqueCategories.map((catKey) => ({
                          label: CATEGORY_NAMES[catKey] || catKey,
                          to: `/vehicles/${catKey}`,
                        }));
                      } else if (item.dynamicSource === "parts") {
                        dropdownItems = uniquePartCategories.map((catKey) => ({
                          label: PART_CATEGORY_NAMES[catKey] || catKey,
                          to: `/parts/${catKey}`,
                        }));
                      }

                      const hasActiveChild = dropdownItems?.some((child) =>
                        location.pathname.startsWith(child.to)
                      );

                      if (hasActiveChild) {
                        setOpenMobileDropdowns([item.key]);
                        break;
                      }
                    }
                  }
                } else {
                  setOpenMobileDropdowns([]);
                }
              }}
              type="button"
              aria-label="Меню"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <ul className={`${s("menu__list")} ${isMenuOpen ? s("menu__list--open") : ""}`}>
              {NAVIGATION_ITEMS.map((item, index) => {
                // Якщо це звичайна силка без children та без dynamicSource
                if (item.to && !item.children && !item.dynamicSource) {
                  return (
                    <li className={s("menu__item")} key={index}>
                      <NavLink
                        end={item.to === "/"}
                        className={getActiveClass}
                        to={item.to}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (activeDesktopDropdown !== "theme") {
                            setActiveDesktopDropdown(null);
                          }
                          setOpenMobileDropdowns([]);
                        }}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                }

                const dropdownKey = item.key || item.label;

                const isDropdownOpen = isMenuOpen
                  ? openMobileDropdowns.includes(dropdownKey)
                  : activeDesktopDropdown === dropdownKey;

                const isItemActive =
                  (item.basePath && location.pathname.startsWith(item.basePath)) ||
                  (item.to && location.pathname.startsWith(item.to));

                // Визначаємо пункти випадайки (статичні children або динамічні з vehicles / parts)
                let dropdownItems = item.children;
                if (item.dynamicSource === "vehicles") {
                  dropdownItems = uniqueCategories.map((catKey) => ({
                    label: CATEGORY_NAMES[catKey] || catKey,
                    to: `/vehicles/${catKey}`,
                  }));
                } else if (item.dynamicSource === "parts") {
                  dropdownItems = uniquePartCategories.map((catKey) => ({
                    label: PART_CATEGORY_NAMES[catKey] || catKey,
                    to: `/parts/${catKey}`,
                  }));
                }

                return (
                  <li
                    className={s("menu__item")}
                    key={index}
                    onMouseEnter={() => {
                      if (!isMenuOpen) {
                        setActiveDesktopDropdown(dropdownKey);
                      }
                    }}
                    onMouseLeave={() => {
                      if (!isMenuOpen && activeDesktopDropdown === dropdownKey) {
                        setActiveDesktopDropdown(null);
                      }
                    }}
                  >
                    <button
                      className={`${s("menu__dropdown-toggle")} ${
                        isItemActive || isDropdownOpen ? s("menu__link--active") : ""
                      }`}
                      onClick={() => {
                        if (isMenuOpen) {
                          setOpenMobileDropdowns((prev) =>
                            prev.includes(dropdownKey)
                              ? prev.filter((k) => k !== dropdownKey)
                              : [...prev, dropdownKey]
                          );
                        } else {
                          setActiveDesktopDropdown((prev) =>
                            prev === dropdownKey ? null : dropdownKey
                          );
                        }
                      }}
                      type="button"
                    >
                      {item.label}
                      <span className={`${s("arrow")} ${isDropdownOpen ? s("open") : ""}`} />
                    </button>
                    <div
                      className={`${s("menu__dropdown")} ${
                        isDropdownOpen ? s("menu__dropdown--open") : ""
                      }`}
                    >
                      {dropdownItems?.map((child, childIdx) => (
                        <NavLink
                          key={childIdx}
                          to={child.to}
                          className={getDropdownActiveClass}
                          onClick={() => {
                            if (activeDesktopDropdown !== "theme") {
                              setActiveDesktopDropdown(null);
                            }
                            setOpenMobileDropdowns([]);
                            setIsMenuOpen(false);
                          }}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Блок дій та теми залишено без змін */}
          <ul className={s("actions")}>
            <li className={s("actions__item")}>
              <a href="#" className={s("actions__link")} title="Логін">
                <CircleUserRound className={s("actions__icon")} size={24} />
              </a>
            </li>
            <li className={s("actions__item")}>
              <a href="#" className={s("actions__link")} title="Пошук">
                <Search className={s("actions__icon")} size={24} />
              </a>
            </li>
            <li className={s("actions__item")}>
              <a href="#" className={s("actions__link")} title="Обрані">
                <Heart className={s("actions__icon")} size={24} />
              </a>
            </li>
            <li className={`${s("actions__item")} ${activeDesktopDropdown === "theme" ? s("actions__item--open") : ""}`}>
              <button
                className={s("theme-toggle")}
                title="Змінити тему"
                onClick={() => {
                  if (activeDesktopDropdown !== "theme") {
                    setIsMenuOpen(false);
                    setOpenMobileDropdowns([]);
                  }
                  setActiveDesktopDropdown((prev) => (prev === "theme" ? null : "theme"));
                }}
                type="button"
              >
                {theme === THEME.LIGHT ? (
                  <Sun className={s("actions__icon")} size={24} />
                ) : theme === THEME.DARK ? (
                  <Moon className={s("actions__icon")} size={24} />
                ) : (
                  <Monitor className={s("actions__icon")} size={24} />
                )}
              </button>

              {activeDesktopDropdown === "theme" && (
                <div className={s("theme-toggle__popup")}>
                  <button
                    className={`${s("theme-toggle__option")} ${theme === THEME.LIGHT ? s("theme-toggle__option--active") : ""}`}
                    onClick={() => {
                      setTheme(THEME.LIGHT);
                      setActiveDesktopDropdown(null);
                    }}
                    type="button"
                    title="Світла тема"
                  >
                    <Sun size={24} />
                  </button>
                  <button
                    className={`${s("theme-toggle__option")} ${theme === THEME.DARK ? s("theme-toggle__option--active") : ""}`}
                    onClick={() => {
                      setTheme(THEME.DARK);
                      setActiveDesktopDropdown(null);
                    }}
                    type="button"
                    title="Темна тема"
                  >
                    <Moon size={24} />
                  </button>
                  <button
                    className={`${s("theme-toggle__option")} ${theme === THEME.SYSTEM ? s("theme-toggle__option--active") : ""}`}
                    onClick={() => {
                      setTheme(THEME.SYSTEM);
                      setActiveDesktopDropdown(null);
                    }}
                    type="button"
                    title="Системна тема"
                  >
                    <Monitor size={24} />
                  </button>
                </div>
              )}
            </li>
          </ul>

          <button className={s("header__add")} type="button">
            <Plus className={s("header__add-icon")} size={20} />
            <span>Додати оголошення</span>
          </button>
        </div>
      </div>
    </header>
  );
};
