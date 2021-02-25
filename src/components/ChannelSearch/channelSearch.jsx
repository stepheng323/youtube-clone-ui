/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import { trimText } from '../../Utils';
import ImageAvatars from '../Avatar/Avatar';
import Buttons from '../Button/Button';

import './channel-search.css';

function channelSearch({
  channelName,
  subcribersCount,
  videosCount,
  description,
  channelAvatar,
}) {
  return (
    <div className="channel-search">
      <div className="channel-search-profile-image-container">
        <Link to={`/channel/${channelName}`}>
          <ImageAvatars
            size="large"
            alt="channel"
            src={`${REACT_APP_DEV_UPLOAD_URL}/${channelAvatar}`}
          />
        </Link>
      </div>
      <div className="channel-search-Info">
        <p className="channel-search-name">{channelName}</p>
        <p className="channel-search-subcriber-info">
          {subcribersCount} {subcribersCount > 1 ? 'subcribers' : 'subcriber'} •{' '}
          {videosCount} videos
        </p>
        <p className="channel-search-description">
          {trimText(description, 120)}
        </p>
      </div>
      <div className="channel-search-button">
        <Buttons variant="contained" color="secondary">
          Subscribe
        </Buttons>
      </div>
    </div>
  );
}

export default channelSearch;
