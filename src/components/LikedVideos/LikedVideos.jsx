import React, { useContext, useState } from 'react';
import useFetch from '../../Api/UseFetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import './liked-videos.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';
import LikedVideo from '../LikedVideo/likeVideo';
import PlaylistInfo from '../PlaylistInfo/PlaylistInfo';
import getToken from '../../Api/GetToken';
import { LikedVideoSkeleton, PlaylistInfoSkeleton } from '../Skeleton/Skeleton';

function LikedVideos() {
  const { user, setUser } = useContext(UserContext);
  const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like?page=1&limit=8`;
  const { result, isLoading, setResult } = useFetch(likedVideosUrl);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
  let token;

  const getNewToken = async () => {
    const response = await getToken();
    if (response.success) {
      const { payload } = response;
      token = payload.token;
      localStorage.setItem('tokenExpiry', payload.tokenExpiry);
      setUser(() => payload);
    }
  };

  const fetchNext = async () => {
    if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
      await getNewToken();
    }
    setPage((page) => page + 1);
    const getMoreVideos = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}/like?page=${page + 1}&limit=8`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token || user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setResult({
          ...result,
          payload: { data: result.payload.data.concat(...result.payload.data) },
        });
      }
      if (!result.payload.next) {
        setHasMore(false);
      }
    };
    getMoreVideos();
  };

  const InfiniteScrollStyle = {
    backgroundColor: '#f1f1f1',
    padding: '1em 2em 0 0.5em',
    overflowY: 'hidden',
    minHeight: '90vh',
  };

  return (
    <div className="liked-videos">
      {isLoading ? (
        <PlaylistInfoSkeleton />
      ) : (
        <PlaylistInfo
          playlistType={'Liked Videos'}
          user={user}
          videosCount={result.payload.data?.length || 0}
          lastThumbnail={
            result.payload.data?.length
              ? result.payload.data[0].video.thumbnail
              : ''
          }
        />
      )}
      <div className="liked-videos-right">
        {isLoading ? (
          Array.from(new Array(8)).map((i, index) => (
            <LikedVideoSkeleton key={index} />
          ))
        ) : (
          <>
            {result.payload.data?.length ? (
              <InfiniteScroll
                style={InfiniteScrollStyle}
                dataLength={result.payload.data.length}
                next={fetchNext}
                hasMore={hasMore}
                loader={
                  <div className="recommended-loading-container">
                    <CircularLoading />
                  </div>
                }
              >
                {result.payload.data.map((likedVideo, index) => {
                  const {
                    _id: id,
                    video: {
                      _id: videoId,
                      title,
                      duration,
                      thumbnail,
                      channel: { name: channelName },
                    },
                  } = likedVideo;
                  return (
                    <LikedVideo
                      key={id}
                      id={id}
                      videoId={videoId}
                      index={index}
                      thumbnail={thumbnail}
                      duration={duration}
                      title={title}
                      channelName={channelName}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <div className="no-liked-videos">
                <p>No videos in this playlist</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LikedVideos;
