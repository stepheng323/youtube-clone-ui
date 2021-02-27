import React, { Profiler } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Divider from '@material-ui/core/Divider';

import './skeleton.css';

export const RecommendedSkeleton = () => {
  return (
    <div className="video-card">
      <Skeleton variant="rect" width={248} height={150} />
      <div className="recommended-sekeleton-infos">
        <Skeleton variant="circle" width={40} height={40} />
        <div className="recommended-sekeleton-infos-text">
          <Skeleton variant="text" width={180} height={30} />
          <Skeleton variant="text" width={150} height={30} />
        </div>
      </div>
    </div>
  );
};

export const TrendingSkeleton = () => {
  return (
    <div className="trending-video">
      <Skeleton
        style={{ marginRight: '1em' }}
        variant="rect"
        width={248}
        height={150}
      />
      <div className="trending-video-info">
        <Skeleton variant="text" width={500} height={20} />
        <Skeleton
          style={{ marginTop: '.5em' }}
          variant="text"
          width={200}
          height={30}
        />
        <Skeleton
          style={{ marginTop: '1em' }}
          variant="text"
          width={550}
          height={30}
        />
      </div>
    </div>
  );
};

export const SearchResultSkeleton = () => {
  return (
    <div className="video-row">
      <Skeleton
        style={{ marginRight: '1em' }}
        variant="rect"
        width={350}
        height={200}
      />
      <div className="trending-video-info">
        <Skeleton variant="text" width={500} height={20} />
        <Skeleton
          style={{ marginTop: '.5em' }}
          variant="text"
          width={200}
          height={20}
        />
        <div className="video-row-channel-info">
          <Skeleton
            style={{ marginRight: '1em' }}
            variant="circle"
            width={30}
            height={30}
          />
          <Skeleton variant="text" width={100} />
        </div>
        <Skeleton
          style={{ marginTop: '1em' }}
          variant="text"
          width={550}
          height={30}
        />
      </div>
    </div>
  );
};

export const SmallCardSkeleton = () => {
  return (
    <div className="small-video-card">
      <Skeleton variant="rect" height={115} />
      <Skeleton variant="text" width={200} height={20} />
      <Skeleton variant="text" width={150} height={20} />
    </div>
  );
};

export const LikedVideoSkeleton = () => {
  return (
    <div style={{ display: 'flex', padding: '1em 1em 0 1em' }} className="">
      <Skeleton variant="rect" width={150} height={70} />
      <div style={{ marginLeft: '1em' }}>
        <div style={{ marginBottom: '.5em' }}>
          <Skeleton variant="text" width={400} height={20} />
        </div>
        <Skeleton variant="text" width={80} height={20} />
      </div>
    </div>
  );
};

export const PlaylistInfoSkeleton = () => {
  return (
    <div className="playlist-info">
      <div className="playlist-info-img-container">
        <Skeleton variant="rect" width={350} height={210} />
      </div>
      <div className="playlist-info-header">
        <Skeleton variant="text" width={120} height={30} />
      </div>
      <div className="playlist-info-details">
        <Skeleton variant="text" width={180} height={20} />
      </div>
      <Divider />
      <div className="playlist-info-profile">
        <div style={{ marginRight: '1em' }}>
          <Skeleton variant="circle" width={40} height={40} />
        </div>
        <div>
          <Skeleton variant="text" width={80} />
        </div>
      </div>
    </div>
  );
};

export const UpNextSkeleton = () => {
  return (
    <div className="side-video-row">
      <div
        style={{ marginRight: '1em' }}
        className="side-video-row-thumbnail-container"
      >
        <Skeleton variant="rect" width={180} height={100} />
      </div>
      <div>
        <Skeleton variant="text" width={180} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={150} />
      </div>
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={150} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
      <Divider />
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={150} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
      <Divider />
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={150} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
      <div className="sidebar-row">
        <Skeleton variant="text" height={20} width={100} />
      </div>
    </div>
  );
};
