import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar/AppBar';
import Loader from './Loader/Loader';
import './App.css';

export const Layout = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <div className="container">
          <Outlet />
        </div>
      </Suspense>
    </>
  );
};
