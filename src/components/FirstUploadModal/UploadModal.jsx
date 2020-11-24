import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import VideoIcon from '@material-ui/icons/VideoCall';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import Tooltip from '@material-ui/core/Tooltip';
import SecondUploadModal from '../SecondUploadModal/SecondUploadModal';
import jetOut from '../../img/jet_out.gif';


import './modal.css';
const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '74%',
		height: '84%',
		borderRadius: '5px',
		outline: 'none',
	},
}));

export default function VideoUploadModal({ handleClose, handleOpen, open }) {
	const [file, setFile] = useState('');
	const [openSecondVideoUpload, setOpenSecondVideoUpload] = useState(false);
	const [showJet, setShowJet] = useState(false);
	const [info, setInfo] = useState("");
	const [presignedUrlAndKey, setPresignedUrlAndKey] = useState('')

	const handleVideoModal = () => {
		setOpenSecondVideoUpload(!openSecondVideoUpload);
	};
	
	const me = () => {
		handleClose();
		setOpenSecondVideoUpload(!openSecondVideoUpload)
		setShowJet(false);

	}
	const handleChange = async (e) => {
		e.preventDefault();
		if (e.target.files[0].type !== 'video/mp4' ) {
			setInfo("Invalid file format");
			return;
		}
		setFile(e.target.files[0]);
		setShowJet(true)
		setTimeout(me, 1000)
		const response = await fetch('http://localhost:4000/api/v1/video/presign')
		const data = await response.json();
		setPresignedUrlAndKey(data.payload)

	}

	const classes = useStyles();
	return (
		<>
			{openSecondVideoUpload && <SecondUploadModal
					handleClose={handleVideoModal}
					handleOpen={handleVideoModal}
					open={openSecondVideoUpload}
					file={file}
					presignedUrlAndKey={presignedUrlAndKey}
				/>}
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
				disableEscapeKeyDown	
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<div className={classes.paper}>
						<div className='video-upload-modal-header'>
							<h3 className="modal-header" id='transition-modal-title'>Upload Video</h3>
							<CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
						</div>
						<div className='uploader'>
							<div className='upload-image'>
							<input onChange={handleChange} type="file" hidden id="file"/>
								{!showJet && <label htmlFor="file"><PublishIcon className='publish-icon' /></label>}
							</div>
								{showJet ? <img className="jet" src={jetOut} alt="publish"/> : null}
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
									marginTop: '.8em',
									fontSize: '12px',
									color: '#606060',
								}}
							>
								Your videos will be private until you publish them.
							</p>
							{info && <p className="info"><WarningIcon className="info-icon"/> {info}</p>}
							<div className='upload-button'>
								<input onChange={handleChange} type='file' id='actual-btn' hidden />
								<label className='label' htmlFor='actual-btn'>
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
					</div>
				</Fade>
			</Modal>
		</>
	);
}
