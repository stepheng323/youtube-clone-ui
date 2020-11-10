import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

function SideVideoRow({ thumbnail, channelImage, channel, title, views, date }) {
	return (
		<Link to="/watch"><div className='side-video-row'>
			<div className='side-video-row-thumbnail-container'>
				<img src={thumbnail} alt='thumbnail' />
			</div>
			<div className=''>
				<div className='side-video-row-info'>
					<h4>{title}</h4>
					<Link to="/channel">
					<p>{channel}</p>
					</Link>
				</div>
				<div className="side-video-row-channel-info">
					<p>
						{views} • {date}
					</p>
				</div>
			</div>
		</div>
		</Link>
	);
}

export default SideVideoRow;
