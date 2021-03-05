/* eslint-disable react/prop-types */
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import './channel-videos.css';

function ChannelVideos({ title, videos }) {
  return (
    <>
      <p className="channel-video-title">{title}</p>
      <div className="channel-uploads">
        {videos &&
          videos.payload.data?.length &&
          videos.payload.data.map((video) => {
            const {
              _id: id,
              title,
              thumbnail,
              duration,
              viewsCount,
              createdAt,
            } = video;
            return (
              <SmallVideoCard
                key={id}
                id={id}
                title={title}
                thumbnail={thumbnail}
                views={viewsCount}
                date={createdAt}
                duration={duration}
              />
            );
          })}
      </div>
    </>
  );
}

export default ChannelVideos;
