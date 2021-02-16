import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import './skeleton.css';

export const RecommendedSkeleton = () => {
	return (
		<div className='video-card'>
			<Skeleton variant='rect' width={248} height={150} />
			<div className='recommended-sekeleton-infos'>
				<Skeleton variant='circle' width={40} height={40} />
				<div className=''>
					<Skeleton variant='text' width={200} height={30} />
					<Skeleton variant='text' width={150} height={30} />
				</div>
			</div>
		</div>
	);
};

export const TrendingSkeleton = () => {
	return (
		<div className='trending-video'>
			<Skeleton
				style={{ marginRight: '1em' }}
				variant='rect'
				width={248}
				height={150}
			/>
			<div className='trending-video-info'>
				<Skeleton variant='text' width={500} height={20} />
				<Skeleton
					style={{ marginTop: '.5em' }}
					variant='text'
					width={200}
					height={10}
				/>
				<Skeleton
					style={{ marginTop: '1em' }}
					variant='text'
					width={550}
					height={30}
				/>
			</div>
		</div>
	);
};


const searchResultSkeleton = () => {
return (
	<div className='trending-video'>
		<Skeleton
			style={{ marginRight: '1em' }}
			variant='rect'
			width={248}
			height={150}
		/>
		<div className='trending-video-info'>
			<Skeleton variant='text' width={500} height={20} />
			<Skeleton
				style={{ marginTop: '.5em' }}
				variant='text'
				width={200}
				height={10}
			/>
			<Skeleton
				style={{ marginTop: '1em' }}
				variant='text'
				width={550}
				height={30}
			/>
		</div>
	</div>
);
};





export const SmallCardSkeleton = () => {
	return (
		<div className='small-video-card'>
			<Skeleton variant='rect' height={115} />
			<div classsName='small-video-infos'>
				<Skeleton variant='text' height={20} />
				<Skeleton variant='text' width={170} height={20} />
			</div>
		</div>
	);
};

export const LikedVideoSkeleton = () => {
	return (
		<div style={{display: 'flex', padding: '1em 1em 0 1em'}} className=''>
				<Skeleton variant='rect' width={150} height={70} />
			<div style={{ marginLeft: '1em' }}>
				<div style={{ marginBottom: '.5em' }}>
					<Skeleton variant='text' width={400} height={20} />
				</div>
				<Skeleton variant='text' width={80} height={20} />
			</div>
		</div>
	);
};
