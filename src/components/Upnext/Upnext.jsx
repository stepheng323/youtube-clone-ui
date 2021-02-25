import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import SideVideoRow from '../SideVideoRow';
import { CircularLoading } from '../../Utils/Loading';

import './up-next.css';
import { UpNextSkeleton } from '../Skeleton/Skeleton';

function Upnext() {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setinitialLoading] = useState(true);

  const getUpNextVideosUrl = `${REACT_APP_DEV_BASE_URL}/video/upnext?page=${page}&limit=8`;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getUpNextVideosUrl);
        const result = await res.json();
        setVideos(result.payload.data);
        setinitialLoading(false);
        if (!result.payload.next) {
          setHasMore(false);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  const fetchNext = async () => {
    setPage((page) => page + 1);
    const getMoreVideos = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}/video/upnext?page=${page + 1}&limit=8`
      );
      const result = await response.json();
      if (result.success) {
        setVideos(videos.concat(...result.payload.data));
      }
      if (!result.payload.next) {
        setHasMore(false);
      }
    };
    getMoreVideos();
  };

  return (
    <div className="suggest">
      {initialLoading ? (
        <div style={{ padding: '1em' }}>
          {Array.from(Array(16)).map((item) => (
            <UpNextSkeleton key={item} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          style={{ overflowY: 'hidden' }}
          dataLength={videos.length}
          next={fetchNext}
          hasMore={hasMore}
          loader={
            <div className="">
              <CircularLoading />
            </div>
          }
        >
          {videos.length ? (
            videos.map((item) => {
              const {
                _id,
                viewsCount,
                thumbnail,
                title,
                createdAt,
                channel: { name, channelAvatar },
              } = item;
              return (
                <SideVideoRow
                  key={_id}
                  id={_id}
                  thumbnail={thumbnail}
                  channelImage={channelAvatar || name}
                  channel={name}
                  title={title}
                  views={viewsCount}
                  date={createdAt}
                />
              );
            })
          ) : (
            <p>No upcoming Videos</p>
          )}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Upnext;
