import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import VideoIcon from '@material-ui/icons/VideoCall';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';

import './modal.css';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '73%',
		height: '85%',
		borderRadius: '5px',
		outline: 'none',
	},
}));

export default function VideoUploadModal({ handleClose, handleOpen, open }) {
	const classes = useStyles();

	return (
		<>
			<Tooltip title='Upload Video'>
				<VideoIcon className='header-icon' onClick={handleOpen} />
			</Tooltip>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div className='video-upload-modal-header'>
							<h3 id='transition-modal-title'>Upload Video</h3>
							<CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
						</div>
						<div className='uploader'>
							<div className='upload-image'>
								<PublishIcon className='publish-icon' />
							</div>
						</div>
						<div className='texts-button'>
							<p
								style={{
									fontWeight: '400',
									textAlign: 'center',
									marginTop: '2em',
									fontSize: '14px',
								}}
							>
								Drag and drop video files to upload
							</p>
							<p
								style={{
									textAlign: 'center',
									marginTop: '.5em',
									fontSize: '12px',
									color: '#606060',
									marginBottom: '4em',
								}}
							>
								Your videos will be private until you publish them.
							</p>
							<div className='upload-button'>
								<input type='file' id='actual-btn' hidden />
								<label className='label' for='actual-btn'>
									SELECT FILES
								</label>{' '}
							</div>
							<p
								style={{
									fontWeight: '400',
									textAlign: 'center',
									marginTop: '4em',
									color: '#606060',
									fontSize: '12px',
								}}
							>
								By submitting your videos to YouTube, you acknowledge that you
								agree to YouTube's Terms of Service and Community Guidelines.
							</p>
							<p
								style={{
									fontWeight: '400',
									textAlign: 'center',
									marginTop: '1em',
									fontSize: '12px',
									color: '#606060',
								}}
							>
								Please be sure not to violate others' copyright or privacy
								rights. Learn more
							</p>
						</div>
						{/* <p id='transition-modal-description'></p> */}
					</div>
				</Fade>
			</Modal>
		</>
	);
}
