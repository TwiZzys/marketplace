import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/';
import { Vehicle, Part } from '@/types';

interface MainLayoutProps {
  vehicles: Vehicle[];
  parts: Part[]; // Додаємо проп parts
}

export const MainLayout: React.FC<MainLayoutProps> = ({ vehicles, parts }) => {
  return (
    <>
      {/* Передаємо у Header як транспорт, так і запчастини */}
      <Header vehicles={vehicles} parts={parts} />

      <main className="main">
        <div className="container">
          {/* Передаємо обидва масиви в Outlet, щоб дочірні сторінки теж мали до них доступ через useOutletContext */}
          <Outlet context={{ vehicles, parts }} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          FOOTER
        </div>
      </footer>
    </>
  );
};
