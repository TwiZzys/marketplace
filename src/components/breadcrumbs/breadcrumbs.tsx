import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./scss/breadcrumbs.module.scss";

interface Crumb {
  url: string;
  text: string;
}

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const pathSegments = pathname.split('/').filter(Boolean);
  const isHome = pathSegments.length === 0 || pathname === '/';

  const [crumbs, setCrumbs] = useState<Crumb[]>([]);

  useEffect(() => {
    const loadRoutes = async () => {
      let routesMap: Record<string, string> = {};

      try {
        const response = await fetch('/config/routes.json');
        if (response.ok) {
          routesMap = await response.json();
        } else {
          console.warn('routes.json не знайдено');
        }
      } catch (e) {
        console.error('Не вдалося завантажити routes.json:', e);
      }

      const homeUrl = '/';
      const tempCrumbs: Crumb[] = [{
        url: homeUrl,
        text: "Головна"
      }];

      const effectiveSegments = pathSegments
        .filter(segment => segment !== 'index.html')
        .map(segment => segment.replace(/\.html$/, ''))
        .filter(Boolean);

      let accumulatedPath = '';
      const currentH1 = document.querySelector('h1');

      effectiveSegments.forEach((segment, index) => {
        accumulatedPath += `/${segment}`;
        const isLast = index === effectiveSegments.length - 1;

        const fullPathKey = accumulatedPath + '/';
        const cleanPathKey = accumulatedPath;
        const noSlashPathKey = accumulatedPath.slice(1);

        let title: string | null = null;

        title = routesMap[fullPathKey] || routesMap[cleanPathKey] || routesMap[noSlashPathKey];

        if (!title) {
          title = routesMap[segment];
        }

        if (!title) {
          title = sessionStorage.getItem(`breadcrumb_title_${fullPathKey}`);
        }

        if (!title && isLast && currentH1) {
          title = currentH1.textContent ? currentH1.textContent.trim() : null;
          if (title) {
            sessionStorage.setItem(`breadcrumb_title_${fullPathKey}`, title);
          }
        }

        if (!title) {
          title = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
        }

        tempCrumbs.push({ url: fullPathKey, text: title });
      });

      setCrumbs(tempCrumbs);
    };

    loadRoutes();
  }, [pathname]);

  if (isHome) return null;

  return (
    <div className={styles.breadcrumbs}>
      <div className="container">
        <nav className={styles.breadcrumbs__nav} aria-label="breadcrumb">
          <ul className={styles.breadcrumbs__list}>
            {
              crumbs.map((crumb, i) => {
                const isCurrent = i === crumbs.length - 1;

                return (
                  <li className={styles.breadcrumbs__item} key={crumb.url}>
                    {
                      isCurrent ? (
                        <span className={styles.breadcrumbs__current}>{crumb.text}</span>
                      ) : (
                        <Link className={styles.breadcrumbs__link} to={crumb.url}>{crumb.text}</Link>
                      )
                    }
                  </li>
                )
              })
            }
          </ul>
        </nav>
      </div>
    </div>
  );
};
