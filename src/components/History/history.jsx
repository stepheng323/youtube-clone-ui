import React, { useState, useContext, useEffect } from 'react';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import HistoryVideo from '../TrendingVideo/TrendingVideo';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import { formatHistoryDate, groupByDate } from '../../Utils/index';
import SearchIcon from '@material-ui/icons/Search';
import { TrendingSkeleton } from '../../components/Skeleton/Skeleton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';
import getToken from '../../Api/GetToken';
import { UserContext } from '../../Context/User';
import UseFetch from '../../Api/UseFetch';

import './history.css';
import { trimText } from '../../Utils';

function History() {
  const { setUser, user } = useContext(UserContext);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const videoHistoryUrl = `${REACT_APP_DEV_BASE_URL}/history?page=1&limit=8`;
  const { result, isLoading, setResult } = UseFetch(videoHistoryUrl);
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
      const res = await fetch(
        `${REACT_APP_DEV_BASE_URL}/history?page=${page + 1}&limit=8`,
        {
          headers: {
            Authorization: `Bearer ${token || user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const response = await res.json();
      if (result.success) {
        setResult({
          ...result,
          payload: {
            ...result.payload,
            data: [
              ...result.payload.data.concat(...(response.payload.data || [])),
            ],
          },
        });
      }
      if (response.payload.next !== undefined) {
        setHasMore(false);
      }
    };
    getMoreVideos();
  };

  if (isLoading) return <p>Loading...</p>;
  const groupedData = groupByDate(result.payload?.data || []);

  return (
    <div className="history">
      {isLoading ? (
        <div style={{ padding: '1em' }}>
          {Array.from(Array(16)).map((item, index) => (
            <TrendingSkeleton key={index} />
          ))}
        </div>
      ) : groupedData.length ? (
        <div className="watch-history">
          <InfiniteScroll
            dataLength={groupedData.length}
            next={fetchNext}
            hasMore={hasMore}
            loader={
              <div className="watch-history">
                <CircularLoading />
              </div>
            }
          >
            <p className="history-header">Watch history</p>
            {groupedData.length
              ? groupedData.map((section) => {
                  return (
                    <div style={{ marginBottom: '1em' }} key={section.key}>
                      <p className="history-date">
                        {formatHistoryDate(section.date)}
                      </p>
                      <div>
                        {section.videos.map((video) => {
                          const {
                            _id,
                            video: {
                              _id: videoId,
                              title,
                              description,
                              thumbnail,
                              duration,
                              viewsCount,
                              createdAt,
                              channel: { name: channelName },
                            },
                          } = video;
                          return (
                            <>
                              <HistoryVideo
                                key={_id}
                                style={{ width: '100%' }}
                                id={videoId}
                                description={trimText(description, 120)}
                                title={trimText(title, 70)}
                                duration={duration}
                                views={viewsCount}
                                date={createdAt}
                                thumbnail={thumbnail}
                                channelName={channelName}
                              />
                            </>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              : 'kkkk'}
          </InfiniteScroll>
        </div>
      ) : (
        <div style={{ height: '85vh' }} className="watch-history">
          <p className="history-header">Watch history</p>
          <div className="no-history">
            <p>This list has no histories.</p>
          </div>
        </div>
      )}

      <div className="search-history">
        <form className="search-history-text-field-container">
          <TextField
            id="input-with-icon-textfield"
            fullWidth={true}
            placeholder="Search watch history"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        <div className="search-history-buttom">
          <p className="search-history-property">History type</p>
          <Divider />
          <div className="search-history-container">
            <p className="search-history-property">Watch history</p>
            <Radio
              checked={true}
              value="a"
              name="radio-button-demo"
              inputProps={{ 'aria-label': 'A' }}
            />
          </div>
          <Divider />
          <div className="search-history-actions">
            <div className="search-history-actions-container">
              <DeleteIcon className="search-history-icons" />
              <p>clear all watch history</p>
            </div>
            <div className="search-history-actions-container">
              <PauseIcon className="search-history-icons" />
              <p>pause watch history</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
