import React, { useEffect, useState, useRef } from "react";
import style from "./scss/header.module.scss";
import {NavLink} from "react-router-dom";
import {AppImage} from "@shared/components/app-image";
import {createStyles} from "@utils/";
import {CircleUserRound, Heart, Menu, Monitor, Moon, Plus, Search, Sun, X} from "lucide-react";

export const Header: React.FC = () => {
  const [themePopup, setThemePopup] = useState<boolean>(false);

  // Реф для відстеження кліків за межами блоку теми
  const themeRef = useRef<HTMLLIElement>(null);

  // 1. Відновлюємо збережений стан ("light", "dark" або "system")
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });

  useEffect(() => {
    const body = document.body;

    // 2. Зберігаємо будь-яке з 3 значень у localStorage
    localStorage.setItem("theme", theme);

    const applyTheme = () => {
      if (theme === "dark") {
        body.classList.add("dark");
      } else if (theme === "light") {
        body.classList.remove("dark");
        if (body.classList.length === 0) {
          body.removeAttribute("class");
        }
      } else if (theme === "system") {
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

    // 3. Якщо вибрано "system", додаємо слухач змін системної теми
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme();

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Ефект для закриття попапу при кліку за межами блоку
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themePopup && themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themePopup]);

  const getActiveClass = ({isActive}: { isActive: boolean }) =>
    isActive ? `${style.menu__link} ${style['menu__link--active']}` : style.menu__link;
  const s = createStyles(style);
  // Стан для відкриття/закриття мобільного меню
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <header className={s('header')}>
      <div className="container">
        <div className={s('header__inner')}>
          <a className={s('logo')} href="/">
            <AppImage className={s('logo__picture')} src={"assets/images/logo.svg"} alt={"logo"}/>
          </a>
          <nav className={s('menu')}>
            <button className={s('menu__btn')} onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setThemePopup(false)
            }}
                    type="button"
                    aria-label="Меню">
              {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
            </button>
            <ul className={`${s('menu__list')} ${isMenuOpen ? s('menu__list--open') : ''}`}>
              <li className={s('menu__item')}>
                <NavLink end className={getActiveClass} to="/" onClick={() => setIsMenuOpen(false)}>Головна</NavLink>
              </li>
              <li className={s('menu__item')}>
                <NavLink className={getActiveClass} to="/new-cars" onClick={() => setIsMenuOpen(false)}>Нові
                  авто</NavLink>
              </li>
              <li className={s('menu__item')}>
                <NavLink className={getActiveClass} to="/used-cars" onClick={() => setIsMenuOpen(false)}>Вживані
                  авто</NavLink>
              </li>
              <li className={s('menu__item')}>
                <NavLink className={getActiveClass} to="/supports"
                         onClick={() => setIsMenuOpen(false)}>Підтримка</NavLink>
              </li>
            </ul>
          </nav>
          <ul className={s('actions')}>
            <li className={s('actions__item')}>
              <a href="#" className={s('actions__link')} title="Логін">
                <CircleUserRound className={s('actions__icon')} size={24}/>
              </a>
            </li>
            <li className={s('actions__item')}>
              <a href="#" className={s('actions__link')} title="Пошук">
                <Search className={s('actions__icon')} size={24}/>
              </a>
            </li>
            <li className={s('actions__item')}>
              <a href="#" className={s('actions__link')} title="Обрані">
                <Heart className={s('actions__icon')} size={24}/>
              </a>
            </li>
            <li className={`${s('actions__item')} ${themePopup ? s('actions__item--open') : ''}`} ref={themeRef}>
              <button
                className={s('theme-toggle')}
                title="Змінити тему"
                onClick={() => {
                  setThemePopup(!themePopup);
                  setIsMenuOpen(false);
                }}
                type="button"
              >
                {
                  theme === "light" ? <Sun className={s('actions__icon')} size={24}/> :
                    theme === 'dark' ? <Moon className={s('actions__icon')} size={24}/> :
                      <Monitor className={s('actions__icon')} size={24}/>
                }
              </button>

              {themePopup && (
                <div className={s('theme-toggle__popup')}>
                  <button
                    className={`${s('theme-toggle__option')} ${theme === 'light' ? s('theme-toggle__option--active') : ''}`}
                    onClick={() => {
                      if (theme !== 'light') {
                        setTheme('light');
                        setThemePopup(false);
                      }
                    }}
                    type="button"
                    title="Світла тема"
                  >
                    <Sun size={24} />
                  </button>

                  <button
                    className={`${s('theme-toggle__option')} ${theme === 'dark' ? s('theme-toggle__option--active') : ''}`}
                    onClick={() => {
                      if (theme !== 'dark') {
                        setTheme('dark');
                        setThemePopup(false);
                      }
                    }}
                    type="button"
                    title="Темна тема"
                  >
                    <Moon size={24} />
                  </button>

                  <button
                    className={`${s('theme-toggle__option')} ${theme === 'system' ? s('theme-toggle__option--active') : ''}`}
                    onClick={() => {
                      if (theme !== 'system') {
                        setTheme('system');
                        setThemePopup(false);
                      }
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
          <button className={s('header__add')} type="button">
            <Plus className={s('header__add-icon')} size={20}/>
            <span>Додати оголошення</span>
          </button>
        </div>
      </div>
    </header>
  );
};
