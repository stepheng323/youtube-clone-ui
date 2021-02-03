import React, { useState, useContext }  from 'react';
import { useParams, useHistory } from 'react-router-dom';
import getToken from '../../Api/GetToken';
import './channel.css';
import Buttons from '../Button/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UseFetch from '../../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import banner from '../../img/banner.jpg';
import { CircularLoading } from '../../Utils/Loading';
import AboutChannel from '../AboutChannel/AboutChannel';
import ChannelVideos from '../ChannelVideos/ChannelVideos';
import { UserContext } from '../../Context/User';
import UnsubscribeModal from '../UnsubscribeModal/unsubscribeModal';
import Snackbar from '../Snackbar/snackbar';


function Channel() {
	const { setUser, user } = useContext(UserContext);
	const history = useHistory();
	const userExist = Object.keys(user).length > 0;
	const { channelName } = useParams();
	const channelUrl = `${REACT_APP_DEV_BASE_URL}/channel/${channelName}`;
	const videosUrl = `${REACT_APP_DEV_BASE_URL}/video/channel/${channelName}`;
	const subcriptionStatusUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/status/${channelName}`;
	const subscriberCountUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/channel/count/${channelName}`;


	const { result, isLoading } = UseFetch(channelUrl);
	const { result: videos, isLoading: videosLoading } = UseFetch(videosUrl);
	const { result: subscriptionStatus, isLoading: subscriptionLoading, setResult: setSubscriptionStatus } = UseFetch(subcriptionStatusUrl);
	const { result: subscriptionCount, subscriberCountLoading, setResult: setSubscriptionCount } = UseFetch(subscriberCountUrl);

	const [value, setValue] = useState(0);
	const [unsubscribeModal, setUnsubscribeModal] = useState(false);
	const [subscriptionMessage, setSubscriptionMessage] = useState('');
	const [snackbarStatus, setSnackbarStatus] = useState(false);

	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
	let token;

	if (
		isLoading ||
		videosLoading ||
		subscriptionLoading ||
		subscriberCountLoading
	)
		return <CircularLoading />;

	const { message, payload: {createdAt, channelDescription, _id: channelId} } = result;
	if (message === 'No channel found for this user')
		return (
			<p>
				Not
				Foundkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
			</p>
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
				role='tabpanel'
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


	const handleSusbcribe = async() => {
		if(!userExist) return history.push('/login');
		setSubscriptionStatus({success: true})
		setSubscriptionCount({payload: subscriptionCount.payload + 1})
		if (Date.now() >= +tokenExpiry * 1000) {
			await getNewToken();
		}
	try {
	const response = await fetch(`${REACT_APP_DEV_BASE_URL}/subscriber/subscribe/${channelId}`, {
		method:'POST',
		headers: {
			Authorization: `Bearer ${token ||user.token}`,
			'Content-Type': 'application/json',
		},
	})
	await response.json();
	setSubscriptionMessage('Subscription Added');
	setSnackbarStatus(true);
} catch (error) {
	console.log(error);
}
	}

	const handleUnsubscribe = async() => {
		setSubscriptionStatus({success: false})
		setSubscriptionCount({payload: subscriptionCount.payload - 1})
		setUnsubscribeModal(false);
		if (Date.now() >= +tokenExpiry * 1000) {
			await getNewToken();
		}
		try {
	const response = await fetch(`${REACT_APP_DEV_BASE_URL}/subscriber/unsubscribe/${channelId}`, {
		method:'POST',
		headers: {
			Authorization: `Bearer ${token ||user.token}`,
			'Content-Type': 'application/json',
		},
	})
	setSubscriptionMessage('Subscription Removed');
	setSnackbarStatus(true)
} catch (error) {
	console.log(error);
}
}

const handleCloseSnackbar = (event, reason) => {
	if (reason === 'clickaway') {
		return;
	}
	setSnackbarStatus(false);
};
	return (
		<div className='channel'>
		<Snackbar handleClose={handleCloseSnackbar} snackbarStatus={snackbarStatus} message={subscriptionMessage}/>
		<UnsubscribeModal
					handleCloseUnsubscribeModal={() => setUnsubscribeModal(false)}
					handleOpenUnsubscribeModal={() => setUnsubscribeModal(true)}
					unsubscribeModal={unsubscribeModal}
					channelName={channelName}
					handleUnsubscribe={handleUnsubscribe}
				/>
			<div
				className='channel-banner'
				style={{ height: '175px', backgroundImage: `url(${banner})` }}
			></div>
			<div className='channel-dashboard'>
				<div className='channel-subcriber'>
					<img
						className='channel-profile-image'
						alt='channel'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
					<div className='channel-profile-info'>
						<p className='channel-name'>{channelName}</p>
						<p className='channel-subcriber-count'>
							{subscriptionCount?.payload} subscibers
						</p>
					</div>
				</div>
				<div className='channel-action-button'>
					{!subscriptionStatus.success ? (
						<Buttons handleClick={handleSusbcribe} variant='contained' color='secondary'>
							Subscribe
						</Buttons>
					) : (
						<Buttons handleClick={() => setUnsubscribeModal(true)} variant='contained'>
							Subscribed
						</Buttons>
					)}
					<NotificationsNoneIcon />
				</div>
			</div>
			<div className='channel-navigation'>
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
			<div className='channel-uploads-container'>
				<TabPanel value={value} index={0}></TabPanel>
				<TabPanel value={value} index={1}>
					<ChannelVideos videos={videos} />
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
					<AboutChannel description={channelDescription} joinDate={createdAt} />
				</TabPanel>
				<TabPanel value={value} index={6}>
					Item Seven
				</TabPanel>
			</div>
		</div>
	);
}

export default Channel;
