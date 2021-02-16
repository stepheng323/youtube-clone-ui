import React from 'react';
import './channel-avatar.css';
import Avatar from '../Avatar/Avatar';
import Buttons from '../Button/Button';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { Link } from 'react-router-dom';

function ChannelAvatar({
	ChannelAvatar,
	channelName,
	subscriberCount,
	handleSubscribe,
	handleUnsubscribe,
	subscriptions,
}) {
	const isSubscribed = subscriptions.filter(sub => sub.channel.name === channelName);

	return (
		<div className='channel-avatar'>
			<Link style={{display: 'block'}} to={`/channel/${channelName}`}>
			<div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
				<Avatar
				alt={channelName}
				src={`${REACT_APP_DEV_UPLOAD_URL}/${ChannelAvatar}`}
				size='large'
			/>
			<p className='channel-avatar-channel-name'>{channelName}</p>
			<p className='channel-avatar-subscriber-count'>
				{subscriberCount} subscribers`
			</p>
			</div>
			</Link>
			{!isSubscribed.length ? (
				<Buttons handleClick={handleSubscribe} variant=''>
					Subscribe
				</Buttons>
			) : (
				<Buttons handleClick={handleUnsubscribe} variant=''>
					Unsubscribe
				</Buttons>
			)}
		</div>
	);
}

export default ChannelAvatar;
