import React from 'react';
import { Divider } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import Table from '../../components/Table/Table';

function StudioPlaylist() {
  return (
    <div className="studio-content">
      <div className="studio-content-container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          className="channel-content"
        >
          <h3>Channel PlayList</h3>
          <h3>Create Playlist</h3>
        </div>
      </div>
      <Divider />
      <div className="studio-content-container channel-filter">
        <div style={{ display: 'flex' }}>
          <FilterListIcon />
          <p style={{ marginLeft: '1.5em' }}>Filter</p>
        </div>
      </div>
      <Divider />
      <div className="studio-content-container">
        <Table />
      </div>
    </div>
  );
}

export default StudioPlaylist;
