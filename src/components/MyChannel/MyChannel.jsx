import React from 'react';
import banner from '../../img/banner.jpg';
import Buttons from '../Button/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UseFetch from '../../Api/UseFetch';

import './my-channel.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useParams } from 'react-router-dom';

function MyChannel() {
	const [value, setValue] = React.useState(0);
  const { channelName } = useParams();
  const channelUrl = `${REACT_APP_DEV_BASE_URL}/channel/${channelName}`
  const {result: channelInfo, isLoading: channelInfoLoading } = UseFetch(channelUrl);


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

	const classes = useStyles();

	function TabPanel(props) {
		const { children, value, index, ...other } = props;
		return (
			<div
				role='tabpanel'
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
  
  if(channelInfoLoading) return <p>Loading...</p>

  const { payload:{name, channelAvatar} } = channelInfo;

	return (
		<div className='my-channel'>
			<div
				className='my-channel-banner'
				style={{ height: '175px', backgroundImage: `url(${banner})` }}
			>
				<div className='my-channel-banner-inner-container'>
					<div className='my-channel-banner-inner'>
						<div className='my-channel-banner-inner-left'>
							<img
								className='my-channel-profile-image'
								alt='channel'
								src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
							/>
							<div className=''>
								<h2>{name}</h2>
								<p>No Subscribers</p>
							</div>
						</div>
						<div className='my-channel-banner-inner-right'>
							<Buttons color='primary' variant='contained'>
								Customize Channel
							</Buttons>
							<Buttons color='primary' variant='contained'>
								Manage Videos
							</Buttons>
						</div>
					</div>
					<div className='my-channel-navigation'>
						<Tabs
							value={value}
							onChange={handleChange}
							indicatorColor='primary'
							textColor='primary'
							disableFocusRipple
							variant='scrollable'
							aria-label='scrollable auto tabs example'
						>
							<Tab disableRipple label='Home' {...a11yProps(0)} />
							<Tab disableRipple label='Video' {...a11yProps(1)} />
							<Tab disableRipple label='Playlist' {...a11yProps(2)} />
							<Tab disableRipple label='Channels' {...a11yProps(3)} />
							<Tab disableRipple label='Discusion' {...a11yProps(4)} />
							<Tab disableRipple label='About' {...a11yProps(5)} />
							<Tab disableRipple icon={<SearchIcon />} {...a11yProps(6)} />
						</Tabs>
					</div>
				</div>
			</div>
			<div className='my-channel-pannel'>
				<TabPanel value={value} index={0}>
					<div className='my-channel-pannel-home'>
						<img
							alt=''
							src='https://www.gstatic.com/youtube/img/channels/empty_channel_illustration.svg'
						/>
						<h1>Upload a video to get started</h1>
						<p className='my-channel-pannel-home'>
							Start sharing your story and connecting with viewers. Videos you
							upload <br /> will show up here
						</p>
						<Buttons color='primary' variant='contained'>
							Upload video
						</Buttons>
						<p className='my-channel-pannel-home-footnote'>
							Learn more about how to get started
						</p>
					</div>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<div className='my-channel-pannel-video'>
						<p>This channel has no video</p>
					</div>
				</TabPanel>
				<TabPanel value={value} index={2}>
					Item Three
				</TabPanel>
				<TabPanel value={value} index={3}>
					Item Four
				</TabPanel>
				<TabPanel value={value} index={4}>
					Item Five
				</TabPanel>
				<TabPanel value={value} index={5}>
					Item Six
				</TabPanel>
				<TabPanel value={value} index={6}>
					Item Seven
				</TabPanel>
			</div>
		</div>
	);
}

export default MyChannel;
