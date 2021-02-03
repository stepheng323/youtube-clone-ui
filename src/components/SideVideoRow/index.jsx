import React from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { getRelativeTime } from '../../Utils';

import './index.css';

function SideVideoRow({ id, thumbnail, channelImage, channel, title, views, date }) {
	return (
		<Link to={{ pathname: `/watch/${id}`, state: {videoName: title} }}><div className='side-video-row'>
			<div className='side-video-row-thumbnail-container'>
				<img src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`} alt='thumbnail' />
			</div>
			<div className=''>
				<div className='side-video-row-info'>
					<h4>{title}</h4>
					<Link to={`/channel/${channel}`}>
					<p>{channel}</p>
					</Link>
				</div>
				<div className="side-video-row-channel-info">
					<p>
						{views} Views• {getRelativeTime(date)} ago
					</p>
				</div>
			</div>
		</div>
		</Link>
	);
}

export default SideVideoRow;
