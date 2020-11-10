import React from 'react';
import VideoRow from '../VideoRow/VideoRow';
import { Link } from 'react-router-dom';
import './search.css';

import { videos } from '../../data';

function Search() {
	return (
		<Link>
		<div className='search-page'>
			{videos.map((video) => (
				<VideoRow
					title={video.title}
					thumbnail={video.thumbnail}
					views={video.views}
          date={video.date}
          channel={video.channel}
          channelImage={video.channelImage}
          description={video.description}
				/>
			))}
		</div>
		</Link>
	);
}

export default Search;
