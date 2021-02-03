import React from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { convertSecondsToHms } from '../../Utils';
import Divider from '@material-ui/core/Divider';

import './liked-video.css';

function likeVideo({
	id,
	videoId,
	index,
	thumbnail,
	duration,
	title,
	channelName,
}) {
	return (
		<Link key={id} to={`/watch/${videoId}`}>
			<div className='liked-video'>
				<div className='liked-video-img-container'>
					<p className='liked-video-number'>{index + 1}</p>
					<div className='liked-video-img'>
						<img
							src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`}
							alt='thumbnail'
						/>
						<div className='liked-video-time'>
							<p className='liked-video-time-watched'>watched</p>
							<p className='liked-video-time-duration'>
								{convertSecondsToHms(duration)}
							</p>
						</div>
					</div>
					<div>
						<p className='liked-video-title'>{title}</p>
						<p className='liked-video-channel'>{channelName}</p>
					</div>
				</div>
			</div>
			<Divider />
		</Link>
	);
}

export default likeVideo;
