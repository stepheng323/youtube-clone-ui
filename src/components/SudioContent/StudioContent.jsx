import Divider from '@material-ui/core/Divider';
import FilterListIcon from '@material-ui/icons/FilterList';
import React from 'react';
import UseFetch from '../../Api/UseFetch';
import Table from '../../components/Table/Table';
import { REACT_APP_DEV_BASE_URL, REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import './studio-content.css';

function StudioContent() {
  const channelVideosUrl = `${REACT_APP_DEV_BASE_URL}/channel/video-content`;
  const { result: channelVideos, isLoading } = UseFetch(
    channelVideosUrl
  );

  if(isLoading) return <p>Loading...</p>


  const { payload } = channelVideos;
  const rows = payload?.data?.map(video => {
    const { title, thumbnail, status,  viewsCount, createdAt} = video;
    return {video: title, visibility: status, date: createdAt, views: viewsCount, comments: '', like: '', thumbnail }
  })

  return (
    <div className="studio-content">
      <div className="studio-content-container">
        <div className="channel-content">
          <h3>Channel content</h3>
          <p>Uploads</p>
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
        <Table rows={rows} />
      </div>
    </div>
  );
}

export default StudioContent;
