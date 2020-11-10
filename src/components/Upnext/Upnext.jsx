import React from 'react';
import { videos } from '../../data';
import SideVideoRow from '../SideVideoRow';

import './up-next.css';

function Upnext() {
	return (
		<div classname="suggest">
			{videos.map((item) => (
				<SideVideoRow
					thumbnail={item.thumbnail}
					channelImage={item.channelImage}
					channel={item.channel}
					title={item.title}
					views={item.views}
					date={item.date}
				/>
			))}
		</div>
	);
}

export default Upnext;
