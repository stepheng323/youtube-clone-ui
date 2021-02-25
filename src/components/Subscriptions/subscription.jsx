import React, { lazy, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './subscription.css';
import getToken from '../../Api/GetToken';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import UseFetch from '../../Api/UseFetch';
import { CircularLoading } from '../../Utils/Loading';
import { UserContext } from '../../Context/User';
import { SubscriptionContext } from '../../Context/Subsription';
import { useHistory } from 'react-router-dom';
import UnsubscribeModal from '../UnsubscribeModal/unsubscribeModal';
import Snackbar from '../Snackbar/snackbar';

const ChannelAvatar = lazy(() => import('../ChannelAvatar/ChannelAvatar'));

function Subscription() {
	const history = useHistory();
	const [unsubscribeModal, setUnsubscribeModal] = useState(false);
	const [subscriptionMessage, setSubscriptionMessage] = useState('');
	const [snackbarStatus, setSnackbarStatus] = useState(false);
	const { subscriptions, setSubscriptions } = useContext(SubscriptionContext);
	const { user, setUser } = useContext(UserContext);
	const [page, setPage] = useState(1);
	const [channelNameToUnsubscribe, setChannelNameToUnsubscribe] = useState('');
	const [channelIdToUnsubscribe, setChannelIdToUnsubscribe] = useState('');
	const url = `${REACT_APP_DEV_BASE_URL}/channel/all/channels?page1&limit=8`;
	const { result, isLoading, setResult } = UseFetch(url);
	const [hasMore, setHasMore] = useState(true);

	const userExist = Object.keys(user).length > 0;

	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
	let token;

	if (isLoading) return <div>loading..........</div>;
	const {
		payload: { data: channels = [] },
	} = result;

	const getNewToken = async () => {
		const response = await getToken();
		if (response.success) {
			const { payload } = response;
			token = payload.token;
			localStorage.setItem('tokenExpiry', payload.tokenExpiry);
			setUser(() => payload);
		}
	};

	const handleSubcribe = async (channelId) => {
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

			const filteredout = channels.filter(
				(channel) => channel._id !== channelId
			);

			const filtered = channels
				.filter((channel) => channel._id === channelId)
				.map((i) => ({
					...i,
					subscriberCount: i.subscriberCount + 1,
				}));
			const combined = [...filteredout, ...filtered];
			setResult({ ...result, payload: { data: combined } });
			setSubscriptions([...subscriptions, res.payload]);
			setSubscriptionMessage('Subscription Added');
			setSnackbarStatus(true);
		} catch (error) {
			throw error;
		}
	};

	const handleFinalUnsubscribe = async () => {
		if (Date.now() >= +tokenExpiry * 1000) {
			await getNewToken();
		}
		try {
			const res = await fetch(
				`${REACT_APP_DEV_BASE_URL}/subscriber/unsubscribe/${channelIdToUnsubscribe}`,
				{
					method: 'POST',
					headers: {
						Authorization: `Bearer ${token || user.token}`,
						'Content-Type': 'application/json',
					},
				}
			);

			const response = await res.json();
			const filtered = subscriptions.filter(
				(sub) => sub.channel.name !== response.payload.channel.name
			);
			setSubscriptions(filtered);
			setSubscriptionMessage('Subscription Removed');
			setSnackbarStatus(true);
			setUnsubscribeModal(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleInitialUnsubscribe = (channelId, name) => {
		setUnsubscribeModal(true);
		setChannelNameToUnsubscribe(name);
		setChannelIdToUnsubscribe(channelId);
	};

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbarStatus(false);
	};

	const fetchNext = async () => {
		if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
			await getNewToken();
		}
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/history?page=${page + 1}&limit=8`,
				{
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

	const infiniteScrollStyle = {
		backgroundColor: '#f9f9f9',
		padding: '1.5em 1em 0 1.6em',
		display: 'grid',
		minHeight: '83vh',
		overflowY: 'hidden',
		gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
	};


	console.log(channels);
	return (
		<div className='subscription'>
			<Snackbar
				handleClose={handleCloseSnackbar}
				snackbarStatus={snackbarStatus}
				message={subscriptionMessage}
			/>
			<UnsubscribeModal
				handleCloseUnsubscribeModal={() => setUnsubscribeModal(false)}
				handleOpenUnsubscribeModal={() => setUnsubscribeModal(true)}
				unsubscribeModal={unsubscribeModal}
				channelName={channelNameToUnsubscribe}
				handleUnsubscribe={handleFinalUnsubscribe}
			/>
			{channels.length ? (
				<InfiniteScroll
					style={infiniteScrollStyle}
					dataLength={channels.length}
					next={fetchNext}
					hasMore={hasMore}
					loader={
						<div className='watch-history'>
							<CircularLoading />
						</div>
					}
				>
					{channels.map((channel) => {
						const { _id: id, name, channelAvatar, subscriberCount } = channel;
						return (
							<ChannelAvatar
								key={_id}
								ChannelAvatar={channelAvatar}
								channelName={name}
								subscriptions={subscriptions}
								subscriberCount={subscriberCount}
								handleSubscribe={() => handleSubcribe(id)}
								handleUnsubscribe={() => handleInitialUnsubscribe(id, name)}
							/>
						);
					})}
				</InfiniteScroll>
			) : (
				<p>There are currently no channels in the system</p>
			)}
		</div>
	);
}

export default Subscription;
