import React, { useContext, useState, useEffect } from 'react';
import SidebarRow from '../SidebarRow/SidebarRow';
import './sidebar.css';
import HomeIcon from '@material-ui/icons/Home';
import TrendingIcon from '@material-ui/icons/Whatshot';
import SubscriptionIcon from '@material-ui/icons/Subscriptions';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import OndemandIcon from '@material-ui/icons/OndemandVideo';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUp';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import HelpIcon from '@material-ui/icons/Help';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Link, useLocation } from 'react-router-dom';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import SubscribedChannel from '../SubscribedChannel/subscribedChannel';
import { UserContext } from '../../Context/User';
import { SubscriptionContext } from '../../Context/Subsription';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import getToken from '../../Api/GetToken';
import { SidebarSkeleton } from '../Skeleton/Skeleton';
const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));

function Sidebar() {
  const { user, setUser, userLoading } = useContext(UserContext);
  const { subscriptions, setSubscriptions } = useContext(SubscriptionContext);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const userExist = Object.keys(user).length > 0;
  const [open, setOpen] = React.useState(false);
  const subscriptionUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/subscription?page=1&limit=7`;

  useEffect(() => {
    const fetchdata = async () => {
      let token;
      if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
        const getNewToken = async () => {
          const response = await getToken();
          if (response && response.success) {
            const { payload } = response;
            token = payload.token;
            localStorage.setItem('tokenExpiry', payload.tokenExpiry);
            setUser(() => payload);
          }
        };
        await getNewToken();
      }
      try {
        const res = await fetch(subscriptionUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token || user.token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setSubscriptions(data.payload.data || []);
        // setLoading(false);
        return data;
      } catch (err) {
        if (err.name === 'AbortError') return;
        // setError(err);
        // setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const fetchNext = async () => {
    setPage((page) => page + 1);
    const getMoreSubscriptions = async () => {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}/subscriber/subscription?page=${
          page + 1
        }&limit=2`
      );
      const result = await response.json();
      if (result.success) {
        setSubscriptions(subscriptions.concat(...result.payload.data));
      }
      if (!result.payload.next) {
        setHasMore(false);
      }
    };
    getMoreSubscriptions();
  };

  const handleClick = () => {
    if (open === false) {
      fetchNext();
    }
    setOpen(!open);
  };

  const { pathname } = useLocation();
  const homeSelected = pathname === '/' ? true : false;
  const trendingSelected = pathname.startsWith('/trending') ? true : false;
  const subscriptionSelected = pathname.startsWith('/subscription')
    ? true
    : false;
  const librarySelected = pathname.startsWith('/library') ? true : false;
  const historySelected = pathname.startsWith('/history') ? true : false;
  const videosSelected = pathname.startsWith('/videos') ? true : false;
  const likedVideosSelected = pathname.startsWith('/liked-videos')
    ? true
    : false;
  const watchedVideosSelected = pathname.startsWith('/playlist/watched')
    ? true
    : false;

  if (userLoading) return <SidebarSkeleton />;

  return (
    <div className=" sidebar">
      <Link to="/">
        <SidebarRow selected={homeSelected} Icon={HomeIcon} title="Home" />
      </Link>
      <Link to="/trending">
        <SidebarRow
          selected={trendingSelected}
          Icon={TrendingIcon}
          title="Trending"
        />
      </Link>
      <Link to="/subscriptions">
        <SidebarRow
          selected={subscriptionSelected}
          Icon={SubscriptionIcon}
          title="Subscriptions"
        />
      </Link>
      <hr />
      <Link to="/library">
        <SidebarRow
          selected={librarySelected}
          Icon={VideoLibraryIcon}
          title="Library"
        />
      </Link>
      <Link to="/history">
        <SidebarRow
          selected={historySelected}
          Icon={HistoryIcon}
          title="History"
        />
      </Link>
      {userExist ? (
        <>
          <Link to="videos">
            <SidebarRow
              selected={videosSelected}
              Icon={OndemandIcon}
              title="Your Videos"
            />
          </Link>
          <Link to="/playlist/watched">
            <SidebarRow
              selected={watchedVideosSelected}
              Icon={WatchLaterIcon}
              title="Watch Later"
            />
          </Link>
          <Link to="/liked-videos">
            <SidebarRow
              selected={likedVideosSelected}
              Icon={ThumbUpAltOutlinedIcon}
              title="Liked Videos"
            />
          </Link>
        </>
      ) : (
        <>
          <Divider />
          <div className="sidebar-signin">
            <p>
              Sign in to like videos,
              <br /> comment, and subscribe.
            </p>
            <Link to="/login">
              <Button className="header-btn" variant="outlined" color="primary">
                <AccountIcon className="header-btn-icon" /> SIGN IN
              </Button>
            </Link>
          </div>
        </>
      )}
      <hr />
      {userExist && (
        <>
          <p className="sidebar-title">SUBSCRIPTIONS</p>
          {subscriptions?.length
            ? subscriptions.slice(0, 7).map((channel, index) => {
                const {
                  channel: { name, channelAvatar },
                } = channel;
                return (
                  <SubscribedChannel
                    key={name}
                    channelName={name}
                    channelAvatar={channelAvatar || name}
                  />
                );
              })
            : null}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <InfiniteScroll
              style={{ overflowY: 'hidden' }}
              dataLength={subscriptions.length}
              next={fetchNext}
              hasMore={hasMore}
              loader={
                <div className="recommended-loading-container">
                  <CircularLoading />
                </div>
              }
            >
              {subscriptions?.length
                ? subscriptions.slice(7, 0).map((channel, index) => {
                    const {
                      channel: { name, channelAvatar },
                    } = channel;
                    return (
                      <SubscribedChannel
                        key={name}
                        channelName={name}
                        channelAvatar={channelAvatar || name}
                      />
                    );
                  })
                : null}
            </InfiniteScroll>
          </Collapse>
          <SidebarRow
            handleClick={handleClick}
            Icon={!open ? ExpandMoreOutlinedIcon : ExpandLessOutlinedIcon}
            title={`${!open ? 'Show More' : 'Show Fewer'}`}
          />
          <hr />
        </>
      )}
      <SidebarRow Icon={HelpIcon} title="Help" />
      <SidebarRow Icon={FeedbackIcon} title="Send Feedback" />
      <hr />
      <div>
        <p className="trademark-text">
          This website is only for educational purpose.
        </p>
        <p style={{paddingTop: '.5em'}} className="trademark-text">
          All product names, logos, and brands are property of their respective
          owners in the United States and/or other countries.
        </p>
        <p style={{paddingTop: '.5em', fontWeight: 'normal'}} className="trademark-text">© 2021 Googlo LLC </p>
      </div>
    </div>
  );
}

export default Sidebar;
