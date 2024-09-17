// components/Layout.js
import React from 'react';
import Header from '../Header/header'
import Footer from '../footer/footer'


const Layout = ({ children }) => {
  return (
    <>
      <div className="background"></div>
      <div className="page-container">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
