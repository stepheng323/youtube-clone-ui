/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getToken from '../../Api/GetToken';
import Avatar from '../Avatar/Avatar';
import './channel.css';
import Buttons from '../Button/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UseFetch from '../../Api/UseFetch';
import {
  REACT_APP_DEV_BASE_URL,
  REACT_APP_DEV_UPLOAD_URL,
} from '../../constant';
import { CircularLoading } from '../../Utils/Loading';
import AboutChannel from '../AboutChannel/AboutChannel';
import ChannelVideos from '../ChannelVideos/ChannelVideos';
import { UserContext } from '../../Context/User';
import { SubscriptionContext } from '../../Context/Subsription';
import UnsubscribeModal from '../UnsubscribeModal/unsubscribeModal';
import Snackbar from '../Snackbar/snackbar';
import Divider from '@material-ui/core/Divider';
import banner from '../../img/banner.jpg';
import ChannelVideosScroll from '../ChannelVideosScroll/ChannelVideoScroll';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';

function Channel() {
  const { setUser, user } = useContext(UserContext);
  const { subscriptions, setSubscriptions } = useContext(SubscriptionContext);
  const history = useHistory();
  const userExist = Object.keys(user).length > 0;
  const { channelName } = useParams();
  const channelUrl = `${REACT_APP_DEV_BASE_URL}/channel/${channelName}`;
  const channelVideosUrl = `${REACT_APP_DEV_BASE_URL}/channel/videos/${channelName}?page=1&limit=4`;
  const popularVideoUrl = `${REACT_APP_DEV_BASE_URL}/channel/popular-videos/${channelName}?page=1&limit=4`;

  const alreadySubscribed = subscriptions.filter(
    (sub) => sub.channel.name === channelName
  );

  const { result, isLoading, setResult } = UseFetch(channelUrl);

  const [value, setValue] = useState(0);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState('');
  const [snackbarStatus, setSnackbarStatus] = useState(false);

  const { result: channelVideos, isLoading: channelVideosLoading } = UseFetch(
    channelVideosUrl
  );
  const { result: popularVideos, isLoading: popularVideosLoading } = UseFetch(
    popularVideoUrl
  );

  const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
  let token;

  if (isLoading) return <CircularLoading />;

  const {
    message,
    payload: {
      createdAt,
      channelDescription,
      _id: channelId,
      channelAvatar,
      owner: { email },
    },
  } = result;

  if (message === 'No channel found for this user')
    return <p>Channel not found</p>;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={0}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const getNewToken = async () => {
    const response = await getToken();
    if (response.success) {
      const { payload } = response;
      token = payload.token;
      localStorage.setItem('tokenExpiry', payload.tokenExpiry);
      setUser(() => payload);
    }
  };

  const handleSusbcribe = async () => {
    if (!userExist) return history.push('/login');
    if (Date.now() >= +tokenExpiry * 1000) {
      await getNewToken();
    }
    try {
      const response = await fetch(
        `${REACT_APP_DEV_BASE_URL}/subscriber/subscribe/${channelId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token || user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await response.json();
      setResult({
        ...result,
        payload: {
          ...result.payload,
          subscriberCount: result.payload.subscriberCount + 1,
        },
      });
      setSubscriptions([...subscriptions, res.payload]);
      setSubscriptionMessage('Subscription Added');
      setSnackbarStatus(true);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUnsubscribe = async () => {
    setUnsubscribeModal(false);
    if (Date.now() >= +tokenExpiry * 1000) {
      await getNewToken();
    }
    try {
      const res = await fetch(
        `${REACT_APP_DEV_BASE_URL}/subscriber/unsubscribe/${channelId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token || user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const response = await res.json();
      setResult({
        ...result,
        payload: {
          ...result.payload,
          subscriberCount: result.payload.subscriberCount - 1,
        },
      });
      const filtered = subscriptions.filter(
        (sub) => sub.channel.name !== response.payload.channel.name
      );
      setSubscriptions(filtered);
      setSubscriptionMessage('Subscription Removed');
      setSnackbarStatus(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarStatus(false);
  };
  return (
    <div className="channel">
      <Snackbar
        handleClose={handleCloseSnackbar}
        snackbarStatus={snackbarStatus}
        message={subscriptionMessage}
      />
      <UnsubscribeModal
        handleCloseUnsubscribeModal={() => setUnsubscribeModal(false)}
        handleOpenUnsubscribeModal={() => setUnsubscribeModal(true)}
        unsubscribeModal={unsubscribeModal}
        channelName={channelName}
        handleUnsubscribe={handleUnsubscribe}
      />
      <div
        className="channel-banner"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      ></div>
      <div className="channel-dashboard">
        <div className="channel-subcriber">
          <Avatar
            alt={channelName}
            src={`${REACT_APP_DEV_UPLOAD_URL}/${channelAvatar}`}
            size="medium"
          />
          <div className="channel-profile-info">
            <p className="channel-name">{channelName}</p>
            <p className="channel-subcriber-count">
              <p className="channel-subcriber-count">
                {result.payload.subscriberCount} subscibers
              </p>
            </p>
          </div>
        </div>
        <div className="channel-action-button">
          {alreadySubscribed.length === 0 ? (
            <Buttons
              handleClick={handleSusbcribe}
              variant="contained"
              color="secondary"
            >
              Subscribe
            </Buttons>
          ) : (
            <Buttons
              handleClick={() => setUnsubscribeModal(true)}
              variant="contained"
            >
              Subscribed
            </Buttons>
          )}
          <NotificationsNoneIcon />
        </div>
      </div>
      <div className="channel-navigation">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          disableFocusRipple
          variant="scrollable"
          aria-label="scrollable auto tabs example"
        >
          <Tab disableRipple label="Home" {...a11yProps(0)} />
          <Tab disableRipple label="Video" {...a11yProps(1)} />
          <Tab disableRipple label="Playlist" {...a11yProps(2)} />
          <Tab disableRipple label="About" {...a11yProps(3)} />
          <Tab disableRipple icon={<SearchIcon />} {...a11yProps(4)} />
        </Tabs>
      </div>
      <div className="channel-uploads-container">
        {
          <TabPanel value={value} index={0}>
            {channelVideosLoading ? (
              <div style={{ paddingTop: '2em' }} className="channel-uploads">
                {Array.from(Array(5)).map((item, index) => (
                  <>
                    <SmallCardSkeleton key={index} />
                  </>
                ))}
              </div>
            ) : !channelVideos.payload.data?.length ? (
              <p>No videos ......</p>
            ) : (
              <div>
                <ChannelVideos title="Uploads" videos={channelVideos} />
                <Divider />
              </div>
            )}
            {popularVideosLoading ? (
              <div style={{ paddingTop: '2em' }} className="channel-uploads">
                {Array.from(Array(5)).map((item, index) => (
                  <>
                    <SmallCardSkeleton key={index} />
                  </>
                ))}
              </div>
            ) : !popularVideos.payload.data?.length ? (
              <p>No videos ......</p>
            ) : (
              <div>
                <ChannelVideos title="Popular Uploads" videos={popularVideos} />
                <Divider />
              </div>
            )}
          </TabPanel>
        }
        <TabPanel value={value} index={1}>
          <ChannelVideosScroll title="Uploads" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          <AboutChannel
            description={channelDescription}
            email={email}
            joinDate={createdAt}
          />
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Seven
        </TabPanel>
      </div>
    </div>
  );
}

export default Channel;
