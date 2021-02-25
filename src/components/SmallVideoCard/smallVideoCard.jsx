/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_UPLOAD_URL } from '../../constant';
import {
  getRelativeTime,
  convertSecondsToHms,
  trimText,
} from '../../Utils/index';

import './small-video-card.css';

function SmallVideoCard({
  id,
  title,
  thumbnail,
  channel,
  views,
  date,
  duration,
}) {
  return (
    <div className="small-video-card">
      <Link to={`/watch/${id}`}>
        <div className="small-video-image">
          <img
            src={`${REACT_APP_DEV_UPLOAD_URL}/${thumbnail}`}
            alt="thumbnail"
          />
          <p className="small-video-time">{convertSecondsToHms(duration)}</p>
        </div>
      </Link>
      <div className="small-video-infos">
        <div className="small-video-text">
          <Link className="small-video-title" to={`/watch/${id}`}>
            {trimText(title, 45)}
          </Link>
          <Link to={`/channel/${channel}`}>
            <p style={{ marginBottom: '.2em' }}>{channel}</p>
          </Link>
          <Link to={`/watch/${id}`}>
            <p>
              {views} views • {getRelativeTime(date)} ago
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SmallVideoCard;
