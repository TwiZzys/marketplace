import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.scss';

export const NotFound: React.FC = () => {
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
