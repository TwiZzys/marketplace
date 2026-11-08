import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/';
import { Vehicle, Part } from '@/types';
import { Breadcrumbs } from "@components/";

interface MainLayoutProps {
  vehicles: Vehicle[];
  parts: Part[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({ vehicles, parts }) => {
  // Стан: чи показувати хлібні крихти (за замовчуванням true)
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);

  return (
    <>
      <Header vehicles={vehicles} parts={parts} />
      <main className="main">
        <div className="container">
          {showBreadcrumbs && <Breadcrumbs />}

          {/* Передаємо дівчатам/хлопцям дані + функцію вимкнення крихт */}
          <Outlet context={{ vehicles, parts, setShowBreadcrumbs }} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">FOOTER</div>
      </footer>
    </>
  );
};
