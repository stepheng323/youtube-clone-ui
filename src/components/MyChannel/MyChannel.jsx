/* eslint-disable react/prop-types */
import React from 'react';
import Buttons from '../Button/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Avatar from '../Avatar/Avatar';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UseFetch from '../../Api/UseFetch';
import './my-channel.css';
import {
  REACT_APP_DEV_BASE_URL,
  REACT_APP_DEV_UPLOAD_URL,
} from '../../constant';
import { Link, useParams } from 'react-router-dom';
import ChannelVideos from '../ChannelVideos/ChannelVideos';
import { Divider } from '@material-ui/core';
import { SmallCardSkeleton } from '../Skeleton/Skeleton';
import AboutChannel from '../AboutChannel/AboutChannel';
import ChannelVideosScroll from '../ChannelVideosScroll/ChannelVideoScroll';

function MyChannel() {
  const [value, setValue] = React.useState(0);
  const { channelName } = useParams();
  const channelUrl = `${REACT_APP_DEV_BASE_URL}/channel/${channelName}`;
  const { result: channelInfo, isLoading: channelInfoLoading } = UseFetch(
    channelUrl
  );

  const channelVideosUrl = `${REACT_APP_DEV_BASE_URL}/channel/videos/${channelName}?page=1&limit=4`;
  const { result: channelVideos, isLoading: channelVideosLoading } = UseFetch(
    channelVideosUrl
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

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
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  if (channelInfoLoading) return <p>Loading...</p>;

  const {
    message,
    payload: {
      createdAt,
      channelDescription,
      _id: channelId,
      name,
      subscriberCount,
      channelAvatar,
      owner: { email },
    },
  } = channelInfo;

  return (
    <div className="my-channel">
      <div
        className="my-channel-banner"
        style={{ backgroundImage: `url()`, paddingTop: '1em' }}
      >
        <div className="my-channel-banner-inner-container">
          <div className="my-channel-banner-inner">
            <div className="my-channel-banner-inner-left">
              <Avatar
                alt={channelName}
                src={`${REACT_APP_DEV_UPLOAD_URL}/${channelAvatar}`}
                size="medium"
              />
              <div className="my-channel-banner-info">
                <p
                  style={{
                    fontSize: '24px',
                    lineHeight: '30px',
                    color: '#030303',
                  }}
                  className="my-channel-name"
                >
                  {name}
                </p>
                {subscriberCount > 0 ? (
                  <p>{subscriberCount} subscibers</p>
                ) : (
                  <p>No subscibers</p>
                )}
              </div>
            </div>
            <div className="my-channel-banner-inner-right">
              <Link to="/studio/customise">
                <Buttons color="primary" variant="contained">
                  Customize Channel
                </Buttons>
              </Link>
              <Link to="/studio/content">
                <Buttons color="primary" variant="contained">
                  Manage Videos
                </Buttons>
              </Link>
            </div>
          </div>
          <div className="my-channel-navigation">
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
        </div>
      </div>
      <div className="my-channel-pannel">
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
              <div className="my-channel-pannel-home">
                <img
                  alt=""
                  src="https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg"
                />
                <h1>Upload a video to get started</h1>
                <p className="my-channel-pannel-home">
                  Start sharing your story and connecting with viewers. Videos
                  you upload <br /> will show up here
                </p>
                <Buttons color="primary" variant="contained">
                  Upload video
                </Buttons>
                <p className="my-channel-pannel-home-footnote">
                  Learn more about how to get started
                </p>
              </div>
            ) : (
              <div>
                <ChannelVideos title="Uploads" videos={channelVideos} />
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

export default MyChannel;
