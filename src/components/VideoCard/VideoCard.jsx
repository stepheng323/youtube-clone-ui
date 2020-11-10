import React from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import './video-card.css';

function VideoCard({ title, thumbnail, channel, channelImage, views, date }) {
	return (
		<div className='video-card'>
			<Link to="/watch">
				<div className="video-image">
					<img src={thumbnail} alt='thumbnail' />
					<p className="video-time">32:18</p>
				</div>
			</Link>
				<div className='video-infos'>
					<Link to="/channel"><Avatar className='video-avatar' alt={channel} src={channelImage} /></Link>
						<div className='video-text'>
							<Link to="/watch"><h4 className="video-title">{title}</h4></Link>
							<Link to="/watch"><p style={{marginBottom: '.2em'}}>{channel}</p></Link>
							<Link to="/watch"><p>{views} . {date}</p></Link>
				</div>
			</div>
		</div>
	);
}

export default VideoCard;
