import React from 'react';
import { Avatar, capitalize } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { getRelativeTime, convertSecondsToHms } from '../../Utils/index';

import './video-card.css';

function VideoCard({id, title, thumbnail, channel, channelImage, channelId, views, date, duration }) {
	return (
		<div className='video-card'>
			<Link to={`/watch/${id}`}>
				<div className='video-image'>
					<img src={thumbnail} alt='thumbnail' />
					<p className='video-time'>{convertSecondsToHms(duration)}</p>
				</div>
			</Link>
			<div className='video-infos'>
				<Link to={`/channel/${channel}`}>
					<Avatar className='video-avatar' alt={capitalize(channel)} src={channelImage} />
				</Link>
				<div className='video-text'>
					<Link to={`/watch/${id}`}>
						<h4 className='video-title'>{title}</h4>
					</Link>
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
