import React from 'react';
import {Outlet} from 'react-router-dom';
import {Header} from '@/components/';
import {Vehicle} from '@/types';

interface MainLayoutProps {
  vehicles: Vehicle[];
}

export const MainLayout: React.FC<MainLayoutProps> = ({vehicles}) => {
  return (
    <>
      <Header vehicles={vehicles}/>

      <main className="main">
        <div className="container">
          <Outlet context={{vehicles}}/>
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
