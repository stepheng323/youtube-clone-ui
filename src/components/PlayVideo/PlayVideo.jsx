import React, { useEffect } from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ReplyIcon from '@material-ui/icons/Reply';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import axios from 'axios';

import './play-video.css';
import { Avatar, Button } from '@material-ui/core';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { useParams } from 'react-router-dom';

function PlayVideo() {
	const { id } = useParams();
	const url = `${REACT_APP_DEV_BASE_URL}/video/view/${id}`
		setTimeout(() => {
			axios.patch(url)
		}, 30000);
	return (
		<div className='play-video'>
			<video crossOrigin="anonymous" autoPlay height="400px" width="100%" controls>
				<source src={`${REACT_APP_DEV_BASE_URL}/video/watch/${id}`} type="video/mp4"></source>
			</video>
			<div className='details-section'>
				<p>The Name of the video title goes here</p>
				<div className="video-info-details">
					<p>5,060 views • Premiered on 10 Jun 2019</p>
					<div className="icons">
					<div className='icon-container'>
						<ThumbUpIcon className='icon' />
						<p>306</p>
					</div>
					<div className='icon-container'>
						<ThumbDownIcon className='icon' />
						<p>36</p>
					</div>
					<div className='icon-container'>
						<ReplyIcon className='icon' />
						<p>SHARE</p>
					</div>
					<div className='icon-container'>
						<PlaylistAddIcon className='icon' />
						<p>SAVE</p>
					</div>
					<div className='icon-container'>
						<MoreIcon className='icon' />
					</div>
					</div>
				</div>
			</div>
			<div className="description">
				<div className="user-channel-info">
					<div className="user-profile">
						<Avatar className="avatar" alt="profile" src="https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo" />
						<div>
							<p className="channel-name">Gift Egewnu</p>
							<p className="subscriber-count">57.3K Subcriber</p>
						</div>
					</div>
					<Button disableElevation variant="contained" color="secondary">Subscribe</Button>
				</div>
				<div className="description-main">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores quas repudiandae, illum saepe nemo est possimus voluptates sequi illo corrupti, repellat eius distinctio? Fugit quas ea sunt explicabo laboriosam obcaecati.
				</div>
			</div>
		</div>
	);
}

export default PlayVideo;
