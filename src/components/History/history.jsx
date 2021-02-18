import React, { useState, useContext, useEffect } from 'react';
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
import getToken from '../../Api/GetToken';
import { UserContext } from '../../Context/User';
import UseFetch from '../../Api/UseFetch';

import './history.css';
import { trimText } from '../../Utils';

function History() {
	const { setUser, user } = useContext(UserContext);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const [histories, setHistories] = useState([]);
	const [initialLoading, setinitialLoading] = useState(true);
	const videoHistoryUrl = `${REACT_APP_DEV_BASE_URL}/history?page=1&limit=8`;
	const tokenExpiry = JSON.parse(localStorage.getItem('tokenExpiry'));
	let token;

	useEffect(() => {
		
		const fetchData = async() => {
			if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
				await getNewToken();
			}
			const res = await fetch(videoHistoryUrl, 
				{
					headers: {
						Authorization: `Bearer ${token || user.token}`,
						'Content-Type': 'application/json',
					},
				});
			const result = await res.json();
			setHistories(result.payload.data);
			if(!result.payload.next){
				setHasMore(false)
			}
			setinitialLoading(false)
		}
		fetchData();
	}, [])

	const getNewToken = async () => {
		const response = await getToken();
		if (response.success) {
			const { payload } = response;
			token = payload.token;
			localStorage.setItem('tokenExpiry', payload.tokenExpiry);
			setUser(() => payload);
		}
	};

	const fetchNext = async () => {
		if (Date.now() >= +tokenExpiry * 1000 || !user.token) {
			await getNewToken();
		}
		setPage((page) => page + 1);
		const getMoreVideos = async () => {
			const response = await fetch(
				`${REACT_APP_DEV_BASE_URL}/history?page=${page + 1}&limit=8`,
				{
					headers: {
						Authorization: `Bearer ${token || user.token}`,
						'Content-Type': 'application/json',
					},
				}
			);
			const result = await response.json();
			if (result.success) {
				if(result.success){
					setHistories(histories.concat(...result.payload.data));
				}
			}
			if (!result.payload.next) {
				setHasMore(false);
			}
		};
		getMoreVideos();
	};
	return (
		<div className='history'>
			{initialLoading ? (
				<div style={{ padding: '1em' }}>
					{Array.from(Array(16)).map((item) => (
						<TrendingSkeleton key={item} />
					))}
				</div>
			) : histories?.length ? (
				<div className='watch-history'>
					<InfiniteScroll
						style={{ overflowY: 'hidden' }}
						dataLength={histories.length}
						next={fetchNext}
						hasMore={hasMore}
						loader={
							<div className='watch-history'>
								<CircularLoading />
							</div>
						}
					>
						<p className='history-header'>Watch history</p>
						{[...new Set(histories.map(d => d.createdAt.split('T')[0]))].map(header => histories.map(history => {
							// if(header === history.createdAt.split('T')[0]){
								const {_id,
									video: {
										_id: videoId,
										title,
										description,
										thumbnail,
										duration,
										viewsCount,
										createdAt,
										channel: { name: channelName },
									},
								} = history;
								return (
									<>
									<p>{header}</p>
									<HistoryVideo
										style={{ width: '100%' }}
										key={_id}
										id={videoId}
										description={trimText(description, 120)}
										title={title}
										duration={duration}
										views={viewsCount}
										date={createdAt}
										thumbnail={thumbnail}
										channelName={channelName}
									/>
									</>
								);
							// }
						}))}
					</InfiniteScroll>
				</div>
			) : (
				<div style={{ height: '85vh' }} className='watch-history'>
					<p className='history-header'>Watch history</p>
					<div className='no-history'>
						<p>This list has no histories.</p>
					</div>
				</div>
			)}

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
