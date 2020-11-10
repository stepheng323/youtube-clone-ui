import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';

import './video-row.css';

function VideoRow({ thumbnail, channelImage, channel, title, views, date, description }) {
	return (
		<Link to="/watch"><div className='video-row'>
			<div className='video-row-thumbnail-container'>
				<img src={thumbnail} alt='thumbnail' />
			</div>
			<div className=''>
				<div className='video-row-info'>
					<h4>{title}</h4>
					<p>
						{views} • {date}
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
