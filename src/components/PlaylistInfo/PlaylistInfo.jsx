import React from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';

import './playlist-info.css';

function PlaylistInfo({ user, lastThumnail, videosCount }) {
	return (
		<div className='playlist-info'>
			<div className='playlist-info-img-container'>
				<img alt='' src={`${REACT_APP_DEV_UPLOAD_URL}/${lastThumnail}`} />
				<div className='playlist-info-img-play-all'>
					<p>Play All</p>
				</div>
			</div>
			<h1 className='playlist-info-header'>Liked Videos</h1>
			<div className='playlist-info-details'>
				<p>{`${videosCount} videos`}</p>
				<p>No views</p>
				<p>updated 2 days ago</p>
			</div>
			<Divider />
			<div className='playlist-info-profile'>
				<Avatar
					style={{ marginRight: '1em' }}
					src={user?.channel?.channelAvatar || ' '}
					alt={user.channel.name}
				/>
				<p>{user?.channel?.name}</p>
			</div>
		</div>
	);
}

export default PlaylistInfo;
