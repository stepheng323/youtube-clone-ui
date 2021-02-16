import React from 'react';
import { Link } from 'react-router-dom';
import { trimText } from '../../Utils';
import Buttons from '../Button/Button';

import './channel-search.css';

function channelSearch({channelName, subcribersCount, videosCount, description }) {
	return (
		<div className='channel-search'>
			<div className='channel-search-profile-image-container'>
				<Link to={`/channel/${channelName}`}><img
					className='channel-search-profile-image'
					alt='channel'
					src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
				/></Link>
			</div>
			<div className='channel-search-Info'>
				<p className='channel-search-name'>{channelName}</p>
				<p className='channel-search-subcriber-info'>
					{subcribersCount} {subcribersCount > 1 ? 'subcribers' : 'subcriber'} •{' '}
					{videosCount} videos
				</p>
				<p className='channel-search-description'>{trimText(description, 120)}</p>
			</div>
			<Buttons variant="contained" color='secondary'>Subscribe</Buttons>
		</div>
	);
}

export default channelSearch;
