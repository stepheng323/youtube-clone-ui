/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { convertSecondsToHms, getRelativeTime, trimText } from '../../Utils';

import './video-row.css';

function VideoRow({
	thumbnail,
	channelImage,
	channel,
	duration,
	title,
	views,
	date,
	description,
	videoId,
}) {
	return (
		<Link to={{ pathname: `/watch/${videoId}` }}>
			<div className='video-row'>
				<div className='video-row-thumbnail-container'>
					<img
						src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`}
						alt='thumbnail'
					/>
					<p className='video-time'>{convertSecondsToHms(duration)}</p>
				</div>
				<div className='video-row-info-container'>
					<div className='video-row-info'>
						<h4>{title}</h4>
						<p>
							{views} {views > 1 ? 'views' : 'view'} • {getRelativeTime(date)}{' '}
							ago
						</p>
					</div>
					<div className='video-row-channel-info'>
						<Link to={`/channel/${channel}`}>
							<Avatar
								className='video-row-avatar'
								alt={channel}
								src={`${REACT_APP_DEV_UPLOAD_URL}/${channelImage}`}
							/>
						</Link>
						<Link to={`/channel/${channel}`}>
							<p>{channel}</p>
						</Link>
					</div>
					<p className='video-row-description'>{trimText(description, 120)}</p>
				</div>
			</div>
		</Link>
	);
}

export default VideoRow;
