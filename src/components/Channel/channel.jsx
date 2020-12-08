import React from 'react';
import { useParams } from 'react-router-dom';
import './channel.css';
import Buttons from '../Button/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import SearchIcon from '@material-ui/icons/Search';
import UseFetch from '../../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL, REACT_APP_AWS_BASE_URL } from '../../constant';
import banner from '../../img/banner.jpg';
import { CircularLoading } from '../../Utils/Loading';
import { videos } from '../../data';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';



function Channel() {
	const { channelName } = useParams();
	const channelUrl = `${REACT_APP_DEV_BASE_URL}/channel/${channelName}`;
  const { result, isLoading } = UseFetch(channelUrl);

  if (isLoading) return <CircularLoading />
  const {payload: channel} = result;

	return (
		<div className='channel'>
			<div className='channel-banner' style={{ height: '175px', backgroundImage: `url(${banner})` }}></div>
			<div className='channel-dashboard'>
				<div className='channel-subcriber'>
					<img
						className='channel-profile-image'
						alt='channel'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
					<div className='channel-profile-info'>
						<p className='channel-name'>{channel.name}</p>
						<p className='channel-subcriber-count'>18k Subcribers</p>
					</div>
				</div>
				<div className='channel-action-button'>
					<Buttons variant='contained'>Subcribe</Buttons>
					<NotificationsNoneIcon />
				</div>
			</div>
				<div className='channel-navigation'>
          <div className="channel-navigation-tab">
            <p className="channel-navigation-tab-item">Home</p>
            <p className="channel-navigation-tab-item">Videos</p>
            <p className="channel-navigation-tab-item">Channels</p>
            <p className="channel-navigation-tab-item">About</p>
            <p className="channel-navigation-tab-item"><SearchIcon /></p>
          </div>
        </div>
        <div className="channel-uploads-container">
          <p>Uploads</p>
          <div className='channel-uploads'>
			    {videos.map((video) => {
          const {_id: id, title, thumbnail, duration, channel: {name: channel, _id: channelId, channelAvatar: channelImage}, viewsCount, createdAt} = video;
          return (
            <SmallVideoCard
            id={id}
            title={title}
            thumbnail={thumbnail}
            views={3333}
            date={Date.now()}
            duration={20000}
            />
            )})}
          </div>
          </div>
		</div>
	);
}

export default Channel;
