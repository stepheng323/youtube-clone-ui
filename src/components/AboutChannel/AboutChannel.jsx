import React from 'react';
import Divider from '@material-ui/core/Divider';
import FlagIcon from '@material-ui/icons/Flag';

import './about-channel.css';

function AboutChannel({joinDate, description}) {
	return (
		<div className='about-channel'>
			<div className='about-channel-left'>
				<div className='about-channel-left-box'>
					<h1 className='about-channel-headings'>Description</h1>
					<p className='about-channel-description'>
						{description}
					</p>
				</div>
				<Divider />
				<div className='about-channel-left-box'>
					<h1 className='about-channel-headings'>Details</h1>
					<div className='detail-top'>
						<p className="detail-top-property">For business inquiries:</p>
						<p className="detail-top-value">stepheng323@gmail.com</p>
					</div>
					<div className='detail-top'>
						<p style={{color: '#888888'}} className="detail-top-property">Location:</p>
						<p  className="detail-top-value">Nigeria</p>
					</div>
				</div>
			</div>
			<div className='about-channel-right'>
					<h1 className='about-channel-right-headings'>Stats</h1>
				<Divider />
				<div>
					<h1 className='about-channel-right-headings'>Joined</h1>
					<p>{new Date(joinDate).toDateString()}</p>
				</div>
				<Divider />
				<h1 className='about-channel-right-headings'>Views</h1>
				<Divider />
				<FlagIcon className='about-channel-right-headings' />
			</div>
		</div>
	);
}

export default AboutChannel;
