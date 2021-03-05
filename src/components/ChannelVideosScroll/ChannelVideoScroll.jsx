/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import UseFetch from '../../Api/UseFetch';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useParams } from 'react-router-dom';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';

function ChannelVideosScroll({ title }) {
  const { channelName } = useParams();
  const channelVideoScrollUrl = `${REACT_APP_DEV_BASE_URL}/channel/videos/${channelName}?page=1&limit=15`;
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { result, isLoading, setResult } = UseFetch(channelVideoScrollUrl);

  if (isLoading)
    return (
      <div style={{ paddingTop: '2em' }} className="channel-uploads">
        {Array.from(Array(15)).map((item, index) => (
          <>
            <SmallCardSkeleton key={index} />
          </>
        ))}
      </div>
    );

  const fetchNext = async () => {
    setPage((page) => page + 1);
    const getMoreVideos = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}/channel/videos/${channelName}?page=${
          page + 1
        }&limit=15`
      );
      const result = await response.json();
      if (result.success) {
        setResult({
          ...result,
          payload: {
            ...result.payload,
            data: { ...result.payload.data.concat(...result.payload.data) },
          },
        });
      }
      if (result.payload.next === undefined) {
        setHasMore(false);
      }
    };
    getMoreVideos();
  };

  if (isLoading) return <p>Loading..</p>;
  return (
    <InfiniteScroll
      style={{ overflowY: 'hidden' }}
      dataLength={result.payload.data?.length || []}
      next={fetchNext}
      hasMore={hasMore}
      loader={
        <div className="">
          <CircularLoading />
        </div>
      }
    >
      <p className="channel-video-title">{title}</p>
      <div className="channel-uploads">
        {result &&
          result.payload.data?.length &&
          result.payload.data?.map((video) => {
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
    </InfiniteScroll>
  );
}

export default ChannelVideosScroll;
