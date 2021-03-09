/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import noThumnail from '../../img/noThumbnail.jpg';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';

import './playlist-info.css';
import { Link } from 'react-router-dom';

function PlaylistInfo({ user, lastThumbnail, videosCount, playlistType }) {
	return (
		<div className='playlist-info'>
			<div className='playlist-info-img-container'>
				<img alt='' src={lastThumbnail ? `${REACT_APP_DEV_UPLOAD_URL}/${lastThumbnail}` : noThumnail } />
				<div className='playlist-info-img-play-all'>
					<p>Play All</p>
				</div>
			</div>
			<h1 className='playlist-info-header'>{playlistType}</h1>
			<div className='playlist-info-details'>
				<p>{`${videosCount} videos`}</p>
				<p>No views</p>
				<p>updated 2 days ago</p>
			</div>
			<Divider />
			<Link to={`/channel/${user.channel?.name}`}><div className='playlist-info-profile'>
				<Avatar
					style={{ marginRight: '1em' }}
					src={`${REACT_APP_DEV_UPLOAD_URL}/${user?.channel?.channelAvatar}`}
					alt={user?.channel?.name}
				/>
				<p>{user?.channel?.name}</p>
			</div>
			</Link>
		</div>
	);
}

export default PlaylistInfo;
