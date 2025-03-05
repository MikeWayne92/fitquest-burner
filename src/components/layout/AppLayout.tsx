
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';

const AppLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      <Navbar />
      <main className="flex-1 pt-16 pb-20 overflow-y-auto px-4 md:px-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;
