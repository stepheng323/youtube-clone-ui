/* eslint-disable react/prop-types */
import React, { useEffect, useContext } from 'react';
import StudioSidebar from '../StudioSidebar/StudioSidebar';
import Header from '../header/header';
import Divider from '@material-ui/core/Divider';

const StudioLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Divider />
      <div className="app-page">
        <StudioSidebar />
        {children}
      </div>
    </div>
  );
};

export default StudioLayout;
