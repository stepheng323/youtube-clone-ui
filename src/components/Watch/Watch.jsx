import React from 'react';
import Layout from '../Layout/Layout';
import PlayVideo from '../PlayVideo/PlayVideo';
import Upnext from '../Upnext/Upnext';

import './watch.css';

function Watch() {
	return (
			<Layout>
				<div className='watch'>
					<PlayVideo />
					<Upnext />
				</div>
			</Layout>
	);
}

export default Watch;

