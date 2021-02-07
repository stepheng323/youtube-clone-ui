import React, { useEffect, useState, useContext } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import './play-video.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useHistory, useParams } from 'react-router-dom';
import UseForm from '../../Api/UseForm';
import UseFetch from '../../Api/UseFetch';
import { getRelativeTime } from '../../Utils';
import Buttons from '../Button/Button';
import Comments from '../Comments/Comments';
import SingleComment from '../SingleComment/SingleComment';
import { UserContext } from '../../Context/User';
import getToken from '../../Api/GetToken';
import UnsubscribeModal from '../UnsubscribeModal/unsubscribeModal';
import Snackbar from '../Snackbar/snackbar';

function PlayVideo() {
	const { setUser, user } = useContext(UserContext);
	const history = useHistory();
	const userExist = Object.keys(user).length > 0;
	const { id } = useParams();

	const url = `${REACT_APP_DEV_BASE_URL}/video/view/${id}`;
	const videoCountUrl = `${REACT_APP_DEV_BASE_URL}/video/metric-count/${id}`;
	const likeVideoUrl = `${REACT_APP_DEV_BASE_URL}/video/like/${id}`;
	const dislikeVideoUrl = `${REACT_APP_DEV_BASE_URL}/video/dislike/${id}`;
	const videoDetailsUrl = `${REACT_APP_DEV_BASE_URL}/video/details/${id}`;
	const subscribersStatusUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/${id}`
	const subscriptionCountUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/count/${id}`
	const likeCountUrl = `${REACT_APP_DEV_BASE_URL}/video/like/${id}`;
	const dislikeCountUrl = `${REACT_APP_DEV_BASE_URL}/video/dislike/${id}`;
	const feelingUrl = `${REACT_APP_DEV_BASE_URL}/video/status/feeling/${id}`

	
	const { handleFetch } = UseForm('', url, { method: 'PATCH' });

	const { result: videoDetails, isLoading: detailsLoading } = UseFetch(videoDetailsUrl);
	const { result: videoCount, isLoading: countLoading } = UseFetch(videoCountUrl);
	const { result: subscriptionStatus, isLoading: subscriptionStatusLoading, setResult: setSubscriptionStatus } = UseFetch(subscribersStatusUrl);
	const { result: channelSubscriptionCount, isLoading: subscriptionCountLoading, setResult: setSubscriptionCount  } = UseFetch(subscriptionCountUrl);
	const { result: likeCount, isLoading: likeCountLoading, setResult: setLikeCount } = UseFetch(likeCountUrl);
	const { result: dislikeCount, isLoading: dislikeCountLoading, setResult: setDislikeCount } = UseFetch(dislikeCountUrl);
	const { result: feeling, isLoading: feelingLoading, setResult: setFeeling } = UseFetch(feelingUrl);




	const { handleFetch: likeVideo, result: likeVideoResult, isSubmitting: likeLoading } = UseForm({}, likeVideoUrl, { method: 'POST' });
	const { handleFetch: dislikeVideo, result: dislikeVideoResult, isSubmitting: dislikeLoading } = UseForm({}, dislikeVideoUrl, { method: 'POST' });

	const [showReply, setShowReply] = useState('');
	const [commentList, setCommentList] = useState([]);
	const [commentLoadng, setCommentLoading] = useState(true);
	const [unsubscribeModal, setUnsubscribeModal] = useState(false);
	const [subscriptionMessage, setSubscriptionMessage] = useState('');
	const [snackbarStatus, setSnackbarStatus] = useState(false);

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

	const getComments = async() => {
		try {
			const response = await fetch(`${REACT_APP_DEV_BASE_URL}/comment/${id}?page=1&limit=8`)
			const data = await response.json();
				setCommentList(data.payload.data)
				setCommentLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getComments();
		setTimeout(() => {
			handleFetch();
		}, 30000);
	}, []);

	if (detailsLoading || countLoading || commentLoadng || subscriptionStatusLoading ||subscriptionCountLoading || likeCountLoading || feelingLoading || dislikeCountLoading) return <div className="play-video-loading">Loading...</div>;

	const { title, viewsCount, description, createdAt,
		 channel: { name: channelName, _id: channelId }} = videoDetails.payload;

	const handleLike = () => {
		if (feeling.payload.like){
			setLikeCount({...likeCount, payload: likeCount.payload - 1})
			return setFeeling({...feeling, payload: {like: false, dislike: false, hasFeeling: false}})
		} 
		if (feeling.payload.dislike) {
			setDislikeCount({...dislikeCount, payload: dislikeCount.payload - 1});
		}
		likeVideo();
		setLikeCount({...likeCount, payload: likeCount.payload + 1})
		setFeeling({...feeling, payload: {like: true, dislike: false, hasFeeling: true}})
	};

	const handleDislike = () => {
		if (feeling.payload.dislike){
			setDislikeCount({...dislikeCount, payload: dislikeCount.payload - 1})
			return setFeeling({...feeling, payload: {like: false, dislike: false, hasFeeling: false}})
		};
		if (feeling.payload.like) {
			setLikeCount({...likeCount, payload: likeCount.payload - 1})	
		}
		dislikeVideo();
		setDislikeCount({...dislikeCount, payload: dislikeCount.payload + 1})
		setFeeling({...feeling, payload: {like: false, dislike: true, hasFeeling: true}})

	};

	const handleToggleReply = (id) => {
    setShowReply(showReply !== id ? id: '');
	}

	const handleSusbcribe = async() => {
		if(!userExist) return history.push('/login');
		setSubscriptionStatus({success: true})
		setSubscriptionCount({payload: channelSubscriptionCount.payload + 1})
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
		setSubscriptionCount({payload: channelSubscriptionCount.payload - 1})
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
		<div className='play-video'>
			<Snackbar handleClose={handleCloseSnackbar} snackbarStatus={snackbarStatus} message={subscriptionMessage}/>
			<UnsubscribeModal
					handleCloseUnsubscribeModal={() => setUnsubscribeModal(false)}
					handleOpenUnsubscribeModal={() => setUnsubscribeModal(true)}
					unsubscribeModal={unsubscribeModal}
					channelName={channelName}
					handleUnsubscribe={handleUnsubscribe}
				/>
			<video crossOrigin='anonymous' autoPlay height='auto' width='100%' controls>
				<source
					src={`${REACT_APP_DEV_BASE_URL}/video/watch/${id}`}
					type='video/mp4'>
					</source>
			</video>
			<div className='details-section'>
				<p className='details-section-title'>{title}</p>
				<div className='video-info-details'>
					<p>
						{viewsCount} views • {getRelativeTime(createdAt)} ago
					</p>
					<div className='icons'>
						<div onClick={() => handleLike()} className='icon-container'>
							<ThumbUpIcon className={`icon ${feeling.payload.like && 'highlight-icon'}`} />
							<p>{likeCount.payload}</p>
						</div>
						<div onClick={() => handleDislike()} className='icon-container'>
							<ThumbDownIcon className={`icon ${feeling.payload.dislike && 'highlight-icon'}`} />
							<p>{dislikeCount.payload}</p>
						</div>
						<div className='icon-container'>
							<ReplyIcon className='icon' />
							<p>SHARE</p>
						</div>
						<div className='icon-container'>
							<PlaylistAddIcon className='icon' />
							<p>SAVE</p>
						</div>
						<div className='icon-container'>
							<MoreIcon className='icon' />
						</div>
					</div>
				</div>
			</div>
			<div className='description'>
				<div className='user-channel-info'>
					<div className='user-profile'>
						<img
							style={{ width: '40px', borderRadius: '50%', marginRight: '1em' }}
							alt='channel'
							src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
						/>
						<div>
							<p className='description-channel-name'>{channelName}</p>
							<p className='subscriber-count'>
								{channelSubscriptionCount.payload} Subscribers
							</p>
						</div>
					</div>
					{!subscriptionStatus.success ? <Buttons handleClick={handleSusbcribe} variant='contained' color='secondary'>
						Subscribe</Buttons>
					: <Buttons  handleClick={() => setUnsubscribeModal(true)} variant='contained'>
						Subscribed
					</Buttons>}
				</div>
				<div className='description-main'>{description}</div>
			</div>
			<Comments parentId={""} setCommentList={setCommentList} commentList={commentList} actionButtonText='Comment' avatarSize='40px' />
			<div className='comments'>
				{commentList &&
					commentList.map((item) => (
						<SingleComment
						key={item._id}
						id={item._id}
						setCommentList={setCommentList}
						commentList={commentList}
						commenter={`${item.commenter.firstName} ${item.commenter.lastName}`}
						date={item.createdAt}
						content={item.content}
						toggleReply={handleToggleReply}
						showReply={showReply}
						/>
					))}
			</div>
		</div>
	);
}

export default PlayVideo;
