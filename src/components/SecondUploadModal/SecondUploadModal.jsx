import React, { useContext, useEffect, useState } from 'react';
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
import { UserContext } from '../../Context/User';
import { REACT_APP_DEV_BASE_URL } from '../../constant';

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


export default function SecondUploadModal({handleClose, handleOpen, open, file, presignedUrlAndKey }) {
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [uploadedThumbnailPreview, setUploadedThumbnailPreview ] = useState();
	const [thumbnailFile, setThumbnailFile ] = useState();


	useEffect(() => {
		const uploadData = async () => {
			const response = await axios.put(presignedUrlAndKey.url, file, {
				headers: {
					'Content-Type': file.type,
				},

				onUploadProgress: (progressEvent) => {
					const {loaded, total} = progressEvent;
					 setUploadPercentage(Math.round(loaded * 100) / total)
				}
			});
			console.log(response)
		};
		uploadData();
	}, [file, presignedUrlAndKey.url]);

	const classes = useStyles();
	const initialValues = {
		title: '',
		description: '',
		thumbnail: ''
	};
	const url = `${REACT_APP_DEV_BASE_URL}/video/`;
	const { values, handleChange, setValues, handleSubmit } = UseForm(initialValues, url, 'POST');

	const handleThumnail = async (e) => {
		e.preventDefault()
		setUploadedThumbnailPreview(URL.createObjectURL(e.target.files[0]))
		setThumbnailFile(e.target.files[0]);
	}

	const handleFinalSubmit = async () => {
		const getThumbnailPresignedUrl = await fetch('http://localhost:4000/api/v1/video/presign-thumbnail');
		const {payload} = await getThumbnailPresignedUrl.json();
		setValues({...values, thumbnail: payload.key})
		const uploadThumbnailToS3 = await axios.put(payload.url, thumbnailFile, {
			headers: {
				'Content-Type': thumbnailFile.type,
			},
		})
		handleSubmit();
		alert('kjhgffvbnm')
	}

	console.log(values);
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
								{removeSpecialCharacters(values.title) || removeSpecialCharacters(file.name)}
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
									<div className="indicator-button">
										<RadioButtonUncheckedIcon className="indicator-button-icon"/>
										<RadioButtonUncheckedIcon className="indicator-button-icon"/>
										<RadioButtonUncheckedIcon className="indicator-button-icon"/>
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
											value={values.title.replace(/[^\w\s]/gi, '')										}
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
									<div className="modal-video-thumbnail">
										<p className="modal-video-thumbnail-header">Thumbnail</p>
										<p className="modal-video-thumbnail-body">Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention</p>
										<div className="thummbnail-images">
											<div>
											<input onChange={handleThumnail} type="file" hidden id="file"/>
											<label className="upload-thumbnail" htmlFor="file">
												{!uploadedThumbnailPreview && <AddPhotoAlternateIcon style={{color: 'rgba(0, 0, 0, 0.55)'}}/>}
												{!uploadedThumbnailPreview && <p style={{fontSize: '12px', color: 'rgba(0, 0, 0, 0.55)'}}>upload thumbnail</p>}
												{uploadedThumbnailPreview && <img alt="thumbnail" src={uploadedThumbnailPreview}/>}
												</label>
												</div>
										</div>

									</div>
								</div>
								<div className='modal-body-right'>
									<div className='modal-body-right-card'>
										<img
											height='165px'
											src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfbAmx8sOfMD97o6d9EUkkfIUfR3OsMR9z9Q&usqp=CAU'
											alt='Avatar'
											style={{ width: '100%' }}
										/>
										<div className='details-container'>
											<p className='card-title'>Video Link</p>
											<p className='sub-title mb-1'>'http://localhost</p>
											<p className='card-title'>Filename</p>
											<p className='sub-title mb-1'>{file.name}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="video-upload-modal-footer">
								<div className={classes.root}><LinearProgressWithLabel value={uploadPercentage} /></div>
								<div onClick={handleFinalSubmit}><Buttons color="primary" variant="contained">Submit</Buttons></div>				
						</div>
					</div>
				</Fade>
			</Modal>
		</>
	);
}
