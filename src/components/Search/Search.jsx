import React from 'react';
import VideoRow from '../VideoRow/VideoRow';
import { useParams } from 'react-router-dom';
import './search.css';
import nodata from '../../img/nodata.png';
import UseFetch from '../../Api/UseFetch';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import ChannelSearch from '../ChannelSearch/channelSearch';

function Search() {
	const { query } = useParams();
	const url = `${REACT_APP_DEV_BASE_URL}/video/search/${query}`;
	const { result, isLoading } = UseFetch(url);

	if (isLoading) return <p>Loading</p>;

	const { payload: searchResult } = result;
	return (
		<div className='search-page'>
			{result.success ? (
				searchResult.map((item) =>
					item.title ? (
						<VideoRow
							key={item._id}
							title={item.title}
							thumbnail={item.thumbnail}
							views={item.viewsCount}
							date={item.createdAt}
							channel={item.channel.name}
							channelImage={item.channelAvatar}
							description={item.description}
							duration={item.duration}
							videoId={item._id}
						/>
					) : (
						<ChannelSearch
							key={item._id}
							channelName={item.name}
							subcribersCount={item.videos.length}
							videosCount={item.videos.length}
							description={item.description}
						/>
					)
				)
			) : (
				<div className='search-page-no-result'>
					<div
						style={{
							backgroundImage: `url(${nodata})`,
							backgroundPosition: 'center',
							backgroundSize: 'contain',
							backgroundRepeat: 'no-repeat'
						}}
						className='search-page-no-result-image'
					></div>
					<p className='search-page-no-result-header'>No Result Found</p>
					<p className='search-page-no-result-body'>
						Try different keywords or remove search filters
					</p>
				</div>
			)}
		</div>
	);
}

export default Search;
