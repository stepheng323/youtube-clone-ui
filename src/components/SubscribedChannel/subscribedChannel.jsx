import React from 'react';
import './subscribedChannel.css';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import Avatar from '../Avatar/Avatar'
import { trimText } from '../../Utils';

function subscribedChannel({ channelName, channelAvatar }) {
	return (
		<Link to={`/channel/${channelName}`}>
			<div className='subscribedChannel'>
				<Avatar
					size="small"
					alt={channelName}
					src={`${REACT_APP_DEV_UPLOAD_URL}/${channelAvatar}`}
				/>
				<p>{trimText(channelName, 15)}</p>
			</div>
		</Link>
	);
}

export default subscribedChannel;
