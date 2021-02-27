/* eslint-disable react/prop-types */
import React from 'react';
import Divider from '@material-ui/core/Divider';
import FlagIcon from '@material-ui/icons/Flag';

import './about-channel.css';

function AboutChannel({ joinDate, description, email }) {
  return (
    <div className="about-channel">
      <div className="about-channel-left">
        <div className="about-channel-left-box">
          <h1 className="about-channel-headings">Description</h1>
          <p className="about-channel-description">{description}</p>
        </div>
        <Divider />
        <div className="about-channel-left-box">
          <h1 className="about-channel-headings">Details</h1>
          <div className="detail-top">
            <p className="detail-top-property">For business inquiries:</p>
            <p className="detail-top-value">{email}</p>
          </div>
          <div className="detail-top">
            <p style={{ color: '#888888' }} className="detail-top-property">
              Location:
            </p>
            <p className="detail-top-value">Nigeria</p>
          </div>
        </div>
      </div>
      <div className="about-channel-right">
        <p style={{fontSize: '16px', lineHeight: '21px'}} className="about-channel-right-headings">Stats</p>
        <Divider />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className="about-channel-right-headings">
            Joined {new Date(joinDate).toDateString()}
          </p>
        </div>
        <Divider />
        <p className="about-channel-right-headings">Views</p>
        <Divider />
        <FlagIcon className="about-channel-right-headings icons" />
      </div>
    </div>
  );
}

export default AboutChannel;
