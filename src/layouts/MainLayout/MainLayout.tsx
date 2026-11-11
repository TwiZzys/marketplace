import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/';
import { Breadcrumbs } from "@components/";

export const MainLayout: React.FC = () => {
  // Стан: чи показувати хлібні крихти (за замовчуванням true)
  const [showBreadcrumbs, setShowBreadcrumbs] = useState(true);

  return (
    <>
      {/* Header більше не потребує пропсів, бо сам візьме дані через React Query */}
      <Header />

      <main className="main">
        <div className="container">
          {showBreadcrumbs && <Breadcrumbs />}

          {/* Передаємо через Outlet контекст керування крихтами */}
          <Outlet context={{ setShowBreadcrumbs }} />
        </div>
      </main>

      <footer className="footer">
        <div className="container">FOOTER</div>
      </footer>
    </>
  );
};
