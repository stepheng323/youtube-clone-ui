import React from 'react';
import Header from '../header/header';
import PlayVideo from '../PlayVideo/PlayVideo';
import Upnext from '../Upnext/Upnext';

import './watch.css';

function Watch() {
	return (
		<>
			<Header />
			<div className='watch'>
				<PlayVideo />
				<Upnext />
			</div>
		</>
	);
}

export default Watch;
