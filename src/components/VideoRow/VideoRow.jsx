import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import {REACT_APP_DEV_UPLOAD_URL} from '../../constant'
import { convertSecondsToHms, getRelativeTime } from '../../Utils';

import './video-row.css';

function VideoRow({ thumbnail, channelImage, channel, duration, title, views, date, description, videoId }) {
	return (
		<Link to={`/watch/${videoId}`}><div className='video-row'>
			<div className='video-row-thumbnail-container video-image'>
				<img src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`} alt='thumbnail' />
				<p className="video-time">{convertSecondsToHms(duration)}</p>

			</div>
			<div className=''>
				<div className='video-row-info'>
					<h4>{title}</h4>
					<p>
						{views} {views > 1 ? 'views' : 'view'} • {getRelativeTime(date)} ago
					</p>
				</div>
				<div className="video-row-channel-info">
					<Link to="/channel">
					<Avatar className="video-row-avatar" alt={channel} src={channelImage} />
					</Link>
					<p>{channel}</p>
				</div>
					<p className="video-row-description">{description}</p>
			</div>
		</div>
		</Link>
	);
}

export default VideoRow;
