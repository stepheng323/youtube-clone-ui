/* eslint-disable react/prop-types */
import React from 'react';
import './studio-sidebar-row.css';

function StudioSidebarRow({ selected, title, Icon, handleClick }) {
  return (
    <div
      onClick={handleClick}
      className={`studio-sidebar-row ${selected && 'selected'}`}
    >
      <Icon className="studio-sidebar-row-icon" />
      <p className="studio-sidebar-row-title">{title}</p>
    </div>
  );
}

export default StudioSidebarRow;
