import React, { useState, useEffect } from 'react';
import UseFetch from '../../Api/UseFetch';
import './my-subscription.css';

import { REACT_APP_DEV_BASE_URL } from '../../constant';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';
import Divider from '@material-ui/core/Divider';


function MySubscription() {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const url = `${REACT_APP_DEV_BASE_URL}/subscriber/videos?page=1&limit=16`;

  const { result, isLoading, setResult } = UseFetch(url);
  if (isLoading)
    return (
      <div className="my-subscriptions">
        <div style={{paddingTop: '2em'}} className="my-subscription-content">
        {Array.from(Array(16)).map((item, index) => (
          <SmallCardSkeleton key={index} />
        ))}
      </div>
      </div>
    );

  const fetchNext = async () => {
    setPage((page) => page + 1);
    const getMoreVideos = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}?page=${page + 1}&limit=16`
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
      if (!result.payload.next) {
        setHasMore(false);
      }
    };
    getMoreVideos();
  };


  return (
    <div className="my-subscriptions">
      <InfiniteScroll
        style={{ overflowY: 'hidden' }}
        dataLength={result.payload.length}
        next={fetchNext}
        hasMore={hasMore}
        loader={
          <div className="">
            <CircularLoading />
          </div>
        }
      >
        {result.payload.length ? (
          result.payload.map((section) => {
              return (
                <div key={section.date}>
                  <p className="my-subscription-date">{section.date}</p>
                  <div className="my-subscription-content">
                    {section.videos.map((video) => {
                      const {
                        _id,
                        viewsCount,
                        duration,
                        title,
                        thumbnail,
                        createdAt,
                        channel: { name: channelName },
                      } = video;
                      return (
                        <SmallVideoCard
                          key={_id}
                          id={_id}
                          title={title}
                          thumbnail={thumbnail}
                          channel={channelName}
                          views={viewsCount}
                          date={Date.parse(createdAt)}
                          duration={duration}
                        />
                      );
                    })}
                  </div>
                  <Divider />
                </div>
              );
          })
        ) : (
          <p>No videos</p>
        )}
      </InfiniteScroll>
    </div>
  );
}

export default MySubscription;
