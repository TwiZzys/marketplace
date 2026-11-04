import React from 'react';
import { Header } from '@components/';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          {children}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          {/* Заглушка футера */}
          <p>© 2026 Cars Marketplace</p>
        </div>
      </footer>
    </>
  );
};
