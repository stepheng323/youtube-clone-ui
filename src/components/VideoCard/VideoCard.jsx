import React, { useState } from 'react';
import { Avatar, capitalize } from '@material-ui/core';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { getRelativeTime, convertSecondsToHms } from '../../Utils/index';

import Card from '../Card/Card';

import './video-card.css';

function VideoCard({ id, title, thumbnail, channel, channelImage, channelId, views, date, duration}) {
	const [show, setShow] = useState(false);
	const handleShow = () => {
		setShow(!show);
	};
	return (
		<div className='video-card'>
			<div className='video-image'>
				{/* <Link to={`/watch/${id}`}> */}
				<img src={thumbnail} alt='thumbnail' />
				{/* </Link> */}
				<p className='video-time'>{convertSecondsToHms(duration)}</p>
				<div className='hidden'>
					<WatchLaterIcon className='watch-later ' />
				</div>
			</div>
			<div className='video-infos'>
				<Link to={`/channel/${channel}`}>
					<Avatar
						className='video-avatar'
						alt={capitalize(channel)}
						src={channelImage}
					/>
				</Link>
				<div className='video-text'>
					<div className='video-title-container'>
						<Link to={`/watch/${id}`}>
							<h4 className='video-title'>{title}</h4>
						</Link>
						<div onClick={handleShow} className='video-more-icon hidden'>
							<MoreVertIcon />
						</div>
							{show && <div className='video-more-list'><Card /></div>}
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
