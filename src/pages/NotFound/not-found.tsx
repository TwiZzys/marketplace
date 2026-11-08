import React, { useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import styles from './not-found.module.scss';

interface LayoutContext {
  setShowBreadcrumbs: (show: boolean) => void;
}

export const NotFound: React.FC = () => {
  const { setShowBreadcrumbs } = useOutletContext<LayoutContext>();

  useEffect(() => {
    // Вимикаємо хлібні крихти, щойно відкрилася 404 сторінка
    setShowBreadcrumbs(false);

    // (Опціонально) Вмикаємо назад, якщо користувач піде далі з цієї сторінки
    return () => {
      setShowBreadcrumbs(true);
    };
  }, [setShowBreadcrumbs]);

  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__container}>
        <div className={styles.notFound__code}>4<span className={styles.notFound__wheel}>0</span>4</div>
        <h1 className={styles.notFound__title}>Сторінку не знайдено</h1>
        <p className={styles.notFound__text}>
          Схоже, цей маршрут завіз нас у глухий кут або запчастину було знято з виробництва.
          Повернемося на головну магістраль?
        </p>
        <Link to="/" className={styles.notFound__btn}>
          На головну сторінку
        </Link>
      </div>
    </div>
  );
};
