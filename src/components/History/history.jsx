import React, { useState, useEffect } from 'react';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import HistoryVideo from '../TrendingVideo/TrendingVideo';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CircularLoading } from '../../Utils/Loading';
import SearchIcon from '@material-ui/icons/Search';
import { TrendingSkeleton } from '../../components/Skeleton/Skeleton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import DeleteIcon from '@material-ui/icons/Delete';
import PauseIcon from '@material-ui/icons/Pause';

import './history.css';

function History() {
	const [hasMore, setHasMore] = useState(true);
	const [videos, setVideos] = useState([]);
	const [page, setPage] = useState(1);
	const [initialLoading, setinitialLoading] = useState(true);
	const videoHistoryUrl = `${REACT_APP_DEV_BASE_URL}/history?page=1&limit=8`;

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(videoHistoryUrl);
			const result = await res.json();
			setVideos(result.payload.data);
			setinitialLoading(false);
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		fetchData();
	}, []);

	const fetchNext = async () => {
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/history?page=${page + 1}&limit=8`
			);
			const result = await response.json();
			if (result.success) {
				setVideos(videos.concat(...result.payload.data));
			}
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		getMoreVideos();
	};

	if (initialLoading) {
		return (
			<div className='recommended-video'>
				{Array(16).map((item) => (
					<TrendingSkeleton key={item} />
				))}
			</div>
		);
	}
	return (
		<div className='history'>
			<InfiniteScroll
				style={{ overflowY: 'hidden' }}
				dataLength={videos.length}
				next={fetchNext}
				hasMore={hasMore}
				loader={
					<div className='recommended-loading-container'>
						<CircularLoading />
					</div>
				}
			>
				<div className='watch-history'>
					<p className='history-header'>Watch history</p>
					{videos.length &&
						videos.map((history) => {
							const {
								_id,
								video: {
									title,
									description,
									thumbnail,
									duration,
									viewsCount,
									channel: { name: channelName },
								},
								createdAt,
							} = history;
							return (
								<HistoryVideo style={{width: '100%'}}
									key={_id}
									id={history._id}
									description={description}
									title={title}
									duration={duration}
									views={viewsCount}
									date={createdAt}
									thumbnail={thumbnail}
									channelName={channelName}
								/>
							);
						})}
				</div>
			</InfiniteScroll>
			<div className='search-history'>
				<form className='search-history-text-field-container'>
					<TextField
						id='input-with-icon-textfield'
						fullWidth={true}
						placeholder='Search watch history'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</form>
				<div className='search-history-buttom'>
					<p className='search-history-property'>History type</p>
					<Divider />
					<div className='search-history-container'>
						<p className='search-history-property'>Watch history</p>
						<Radio
							checked={true}
							// onChange={handleChange}
							value='a'
							name='radio-button-demo'
							inputProps={{ 'aria-label': 'A' }}
						/>
					</div>
					<Divider />
					<div className='search-history-actions'>
						<div className='search-history-actions-container'>
							<DeleteIcon className='search-history-icons' />
							<p>clear all watch history</p>
						</div>
						<div className='search-history-actions-container'>
								<PauseIcon className='search-history-icons' />
								<p>pause watch history</p>
							</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default History;
