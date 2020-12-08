import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import './second-modal.css';
import UseForm from '../../Api/UseForm';
import { LinearProgressWithLabel } from '../Progress/Progress';
import Buttons from '../Button/Button';
import { removeSpecialCharacters } from '../../Utils';
import { REACT_APP_DEV_BASE_URL, REACT_APP_FRONT_END_URL } from '../../constant';
import { Redirect } from 'react-router-dom';
import UseUpload from '../../Api/UseUpload';


const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '70%',
		height: '85%',
		borderRadius: '5px',
		outline: 'none',
	},
	root: {
		width: '25%',
		display: 'inline-block',
	},
}));

export default function SecondUploadModal({handleClose, handleOpen, open, file}) {
	const formData = new FormData();
	formData.append("video", file);
	const videoUploadUrl = `${REACT_APP_DEV_BASE_URL}/video`;

	const {uploadPercentage, isVideoUploaded, result} = UseUpload(videoUploadUrl, formData)
	const [uploadedThumbnailPreview, setUploadedThumbnailPreview] = useState();
	const [videoDuration, setVideoDuration] = useState(0);

	const classes = useStyles();
	const initialValues = {
		title: '',
		description: '',
		thumbnail: '',
	};
	const url = `${REACT_APP_DEV_BASE_URL}/video/`;
	const { values, handleChange, handleFile, handleMultipart, multipartResult } = UseForm(initialValues, url,'POST');

	const handleFinalSubmit = async (e) => {
		const videoData = new FormData();
		videoData.append('title', values.title);
		videoData.append('description', values.description);
		videoData.append('thumbnail', values.thumbnail);
		videoData.append('duration', videoDuration);
		const videoDetailsUrl = `${REACT_APP_DEV_BASE_URL}/video/${result._id}`;
		handleMultipart(videoDetailsUrl, videoData)
	};

	if(multipartResult && multipartResult._id){
		alert('uploaded')
	}
	return (
		<>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				className={classes.modal}
				open={open}
				disableEscapeKeyDown
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={`${classes.paper} 'second-modal-container'`}>
						<div className='video-upload-modal-header'>
							<h3 className='modal-header' id='transition-modal-title'>
								{removeSpecialCharacters(values.title) ||
									removeSpecialCharacters(file.name)}
							</h3>
							<CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
						</div>
						<div className='indicator-container'>
							<div className='indicator'>
								<div className='indicator-title'>
									<p>Details</p>
									<p>Video Elements</p>
									<p>Visibility</p>
								</div>
								<div className='indicator-bar'>
									<div className='indicator-button'>
										<RadioButtonUncheckedIcon className='indicator-button-icon' />
										<RadioButtonUncheckedIcon className='indicator-button-icon' />
										<RadioButtonUncheckedIcon className='indicator-button-icon' />
									</div>
									<hr />
								</div>
							</div>
						</div>
						<div className='modal-body-container'>
							<p className='modal-subheader'>Details</p>
							<div className='modal-body'>
								<div className='modal-body-left'>
									<div className='modal-video-title'>
										<label
											className='modal-label'
											style={{
												display: 'block',
												fontSize: '12px',
												lineHeight: '16px',
												color: 'rgba(0, 0, 0, 0.55)',
												marginBottom: '5px',
											}}
										>
											Title (required)
										</label>
										<TextareaAutosize
											name='title'
											value={values.title.replace(/[^\w\s]/gi, '')}
											onChange={handleChange}
											aria-label='empty textarea'
											placeholder='Add a title that describe your video'
										/>
									</div>

									<div className='modal-video-title'>
										<label
											className='modal-label'
											style={{
												display: 'block',
												fontSize: '12px',
												lineHeight: '16px',
												color: 'rgba(0, 0, 0, 0.55)',
												marginBottom: '5px',
											}}
										>
											Description
										</label>
										<TextareaAutosize
											name='description'
											value={values.description}
											onChange={handleChange}
											aria-label='empty textarea'
											rowsMin='7'
											placeholder='Tell viewers about your video'
										/>
									</div>
									<div className='modal-video-thumbnail'>
										<p className='modal-video-thumbnail-header'>Thumbnail</p>
										<p className='modal-video-thumbnail-body'>
											Select or upload a picture that shows what's in your
											video. A good thumbnail stands out and draws viewers'
											attention
										</p>
										<div className='thummbnail-images'>
											<div>
												<input
													onChange={handleFile}
													type='file'
													hidden
													id='file'
													name="thumbnail"
												/>
												<label className='upload-thumbnail' htmlFor='file'>
													{!uploadedThumbnailPreview && (
														<AddPhotoAlternateIcon
															style={{ color: 'rgba(0, 0, 0, 0.55)' }}
														/>
													)}
													{!uploadedThumbnailPreview && (
														<p
															style={{
																fontSize: '12px',
																color: 'rgba(0, 0, 0, 0.55)',
															}}
														>
															upload thumbnail
														</p>
													)}
													{uploadedThumbnailPreview && (
														<img
															alt='thumbnail'
															src={uploadedThumbnailPreview}
														/>
													)}
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className='modal-body-right'>
									<div className='modal-body-right-card'>
										{isVideoUploaded ? <video onLoadedMetadata={(e) => setVideoDuration(e.target.duration)} crossOrigin="anonymous" autoPlay height="160px" width="100%" controls>
											<source src={`${REACT_APP_DEV_BASE_URL}/video/watch/${result._id}`} type="video/mp4"/>
										</video> : <div className="modal-body-right-card-pending-video">
											<p>Processing...</p>
											</div>}
										<div className='details-container'>
											<p className='card-title'>Video Link</p>
											{/* <a href={`${REACT_APP_FRONT_END_URL}/watch/${presignedUrlAndKey.key}`} className='sub-title mb-1'>{`${REACT_APP_FRONT_END_URL}/watch/${presignedUrlAndKey.key}`}</a> */}
											<p className='card-title'>Filename</p>
											<p className='sub-title mb-1'>{file.name}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='video-upload-modal-footer'>
							<div className={classes.root}>
								<LinearProgressWithLabel value={uploadPercentage} />
							</div>
							<div onClick={handleFinalSubmit}>
								<Buttons color='primary' disabled={!values.title || !values.description} variant='contained'>
									Submit
								</Buttons>
							</div>
						</div>
					</div>
				</Fade>
			</Modal>
		</>
	);
}
