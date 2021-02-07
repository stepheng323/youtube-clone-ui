import React, { useContext } from 'react';
import HistoryIcon from '@material-ui/icons/History';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import SmallVideoCard from '../SmallVideoCard/smallVideoCard';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import UseFetch from '../../Api/UseFetch';

import './library.css';
import { REACT_APP_DEV_BASE_URL } from '../../constant';
import { UserContext } from '../../Context/User';

function Library() {
	const {user} = useContext(UserContext);
	const {firstName, lastName, channel} = user;
	const historyUrl = `${REACT_APP_DEV_BASE_URL}/history?page=1&limit=8`;
	const likedVideosUrl = `${REACT_APP_DEV_BASE_URL}/like?page=1&limit=4`;
	const likeCountUrl = `${REACT_APP_DEV_BASE_URL}/like/count`;
	const subscriptionCountUrl = `${REACT_APP_DEV_BASE_URL}/subscriber/count`;
	const uploadCountUrl = `${REACT_APP_DEV_BASE_URL}/video/count`;

	const { result: historyResult, isLoading: isLoadingHistory } = UseFetch(historyUrl);
	const { result: likedVideoResult, isLoading: isLoadingVidoes } = UseFetch(likedVideosUrl);
	const { result: likeCountResult, isLoading: isLoadingLikeCount } = UseFetch(likeCountUrl);
	const { result: subCountResult, isLoading: isLoadingSubCount } = UseFetch(subscriptionCountUrl);
	const { result: uploadCountResult, isLoading: isLoadingUploadCount } = UseFetch(uploadCountUrl);


	if (isLoadingHistory || isLoadingVidoes) return <p>Loading</p>;

	console.log(user);
	const {
		payload: { data: histories = [] },
	} = historyResult;

	const {
		payload: { data: likedVideos = [] },
	} = likedVideoResult;


	return (
		<div className='library'>
			<div className='library-main'>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<HistoryIcon className='library-header-icon' />
							<p className='library-header'>History</p>
						</div>
						<Link to='/history'>
							<p className='see-all-btn'>See All</p>
						</Link>
					</div>
					{histories.length ? (
						<div className='library-history-body'>
							{histories.map((history) => {
								const {
									_id: id,
									video: {
										_id: videoId,
										title,
										thumbnail,
										viewsCount,
										createdAt,
										duration,
										channel: { name: channelName },
									},
								} = history;
								return (
									<SmallVideoCard
										key={id}
										id={videoId}
										title={title}
										channel={channelName}
										thumbnail={thumbnail}
										views={viewsCount}
										date={createdAt}
										duration={duration}
									/>
								);
							})}
						</div>
					) : (
						<div>
							<p className="library-no-content">Videos you watch will show up here. Browse videos</p>
						</div>
					)}
				</div>
				<div style={{ marginBottom: '1.5em' }}>
					<Divider />
				</div>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<WatchLaterIcon className='library-header-icon' />
							<p className='library-header'>Watch Later</p>
						</div>
						<Link to='/watched'>
							<p className='see-all-btn'>See All</p>
						</Link>{' '}
					</div>
					<div className='library-history-body'>
						<SmallVideoCard
							style={{ marginBottom: 0 }}
							key={1}
							id={1}
							title={'title'}
							thumbnail={'thumbnail'}
							views={67}
							date={new Date()}
							duration={455}
						/>
					</div>
				</div>
				<div style={{ marginBottom: '1.5em' }}>
					<Divider />
				</div>
				<div className='library-history'>
					<div className='library-history-header'>
						<div className='library-header-icon-container'>
							<ThumbUpIcon className='library-header-icon' />
							<p className='library-header'>Liked Videos</p>
						</div>
						<Link to='/liked-videos'>
							<p className='see-all-btn'>See All</p>
						</Link>{' '}
					</div>
					{likedVideos.length ? (
						<div className='library-history-body'>
							{likedVideos.map((video) => {
								const {
									_id: id,
									video: {
										title,
										thumbnail,
										viewsCount,
										createdAt,
										duration,
										channel: { name: channelName },
									},
								} = video;
								return (
									<SmallVideoCard
										style={{ marginBottom: 0 }}
										key={id}
										id={id}
										title={title}
										channel={channelName}
										thumbnail={thumbnail}
										views={viewsCount}
										date={createdAt}
										duration={duration}
									/>
								);
							})}
						</div>
					) : (
						<p className="library-no-content">
							Use the thumbs up icon to like videos. Your list shows up right
							here.
						</p>
					)}
				</div>
			</div>

			<div className='libray-profile'>
				<div className='libray-profile-display'>
					<img
						className='channel-profile-image'
						alt='channel'
						src='https://lh3.googleusercontent.com/a-/AOh14GjySH9J2YXSPskpwCZ_l5_LU_r6StEnduNarQ67mw=s88-c-k-c0x00ffffff-no-rj-mo'
					/>
					<p className='libray-profile-channelName'>{channel ? channel.name : `${firstName} ${lastName}`}</p>
				</div>
				<div className='channel-profile-info'>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Subscriptions</p>
						<p channel-profile-stats>{subCountResult?.payload}</p>
					</div>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Uploads</p>
						<p channel-profile-stats>{uploadCountResult?.payload}</p>
					</div>
					<Divider />
					<div className='channel-profile-stats'>
						<p channel-profile-stats>Likes</p>
						<p channel-profile-stats>{likeCountResult?.payload}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Library;
