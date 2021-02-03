import React from 'react'
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { convertSecondsToHms, getRelativeTime } from '../../Utils';
import './trending-video.css';

function TrendingVideo({id, title, description, thumbnail, duration, views, date, channelName}) {
  return (
    <Link to={{ pathname: `/watch/${id}`, state: {videoName: title} }}><div className="trending-video">
      <div className='trending-container video-image'>
				<img src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`} alt='thumbnail' />
				<p className="video-time">{convertSecondsToHms(duration)}</p>
			</div>
      <div className="trending-video-info">
        <p className="trending-video-title">{title}</p>
        <div className="trending-video-stats">
          <Link to={`/channel/${channelName}`}>
            <p className="trending-video-channel">{channelName}</p>
          </Link>
          <p className="trending-video-numbers">
						{views} {views > 1 ? 'views' : 'view'} • {getRelativeTime(date)} ago
					</p>
        </div>
        <p className="trending-video-details">{description}</p>
      </div>
    </div>
    </Link>
  )
}

export default TrendingVideo
