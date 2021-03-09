import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../header/header';
import PlayVideo from '../PlayVideo/PlayVideo';
import Upnext from '../Upnext/Upnext';

import './watch.css';

function Watch() {
	const location = useLocation();

	return (
		<>
			<Header />
			<div key={location.pathname} className='watch'>
				<PlayVideo  />
				<Upnext />
			</div>
		</>
	);
}

export default Watch;
