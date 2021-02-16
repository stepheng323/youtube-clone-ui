import React, { useState, useContext } from 'react';
import { Avatar, capitalize } from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import {
	getRelativeTime,
	convertSecondsToHms,
	trimText,
} from '../../Utils/index';
import {
	REACT_APP_DEV_BASE_URL,
	REACT_APP_DEV_UPLOAD_URL,
} from '../../constant';
import './video-card.css';
import Card from '../Card/Card';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { UserContext } from '../../Context/User';
import getToken from '../../Api/GetToken';

const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
let token;

function VideoCard({
	id,
	title,
	thumbnail,
	channel,
	channelImage,
	channelId,
	views,
	date,
	duration,
}) {
	const { setUser, user } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [snackbar, setSnackbar] = useState('');
	const handleShow = () => {
		setShow(!show);
	};

	const handleClickAway = () => {
		setShow(false);
	};

	const getNewToken = async () => {
		const response = await getToken();
		if (response.success) {
			const { payload } = response;
			token = payload.token;
			localStorage.setItem('tokenExpiry', payload.tokenExpiry);
			setUser(() => payload);
		}
	};

	const handleWatchLater = async () => {
		if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
			await getNewToken();
		}
		const response = await fetch(
			`${REACT_APP_DEV_BASE_URL}/like/watch-later/${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token || user.token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		const result = await response.json();
		if (result.success) {
			setSnackbar('video added to watch');
			setShow(false);
		}
	};

	return (
		<div className='video-card'>
			<Link to={`/watch/${id}`}>
				<div className='video-image'>
					<img style={{ display: 'block' }} src={thumbnail} alt='thumbnail' />
					<p className='video-time'>{convertSecondsToHms(duration)}</p>
					<div className='hidden'>
						<WatchLaterIcon className='watch-later ' />
					</div>
				</div>
			</Link>
			<div className='video-infos'>
				<Link to={`/channel/${channel}`}>
					<Avatar
						className='video-avatar'
						alt={capitalize(channel)}
						src={`${REACT_APP_DEV_UPLOAD_URL}/${channelImage}`}
					/>
				</Link>
				<div className='video-text'>
					<div className='video-title-container'>
						<Link to={`/watch/${id}`}>
							<h4 className='video-title'>{trimText(title, 46)}</h4>
						</Link>
						<div onClick={handleShow} className='video-more-icon hidden'>
							<MoreVertIcon />
						</div>

						<ClickAwayListener
							mouseEvent='onMouseDown'
							touchEvent='onTouchStart'
							onClickAway={handleClickAway}
						>
							<div>
								{show && (
									<div onClick={handleWatchLater} className='video-more-list'>
										<Card />
									</div>
								)}
							</div>
						</ClickAwayListener>
					</div>

					<Link to={`/channel/${channel}`}>
						<p style={{ marginBottom: '.2em' }}>{channel}</p>
					</Link>
					<Link to={`/watch/${id}`}>
						<p>
							{views} {views > 1 ? 'views' : 'view'} • {getRelativeTime(date)}{' '}
							ago
						</p>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default VideoCard;
