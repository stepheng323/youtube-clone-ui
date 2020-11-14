import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { UserContext } from '../../Context/User';


import './channel-modal.css';


const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '49%',
		height: '78%',
		outline: 'none',
	},
}));

export default function CreateChannelModal({ handleClose, handleOpen, open }) {
	const {user} = useContext(UserContext)

	const classes = useStyles();
	return (
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
						<div className="channel-modal-container">
              <div className="channel-modal-image">
                <img src="https://www.gstatic.com/youtube/img/channels/warm_welcome_illustration.svg" alt="banner"/>
              </div>
              <div className="channel-modal-text">
                <p className="channel-modal-text-header">Your creator journey begins</p>
                <p className="channel-modal-text-body">Pursuing your creative passions, connecting with your audience, and sharing your stories begin with creating your channel. Learn more</p>
              </div>
              <div className="channel-modal-button">
              <div className="channel-modal-button-get-started"><Button variant="contained" color="primary" disableElevation>
                GET STARTED
                </Button>
                </div>
                <div onClick={handleClose} className="channel-modal-button-no-thanks"><Button color="primary">
                NO THANKS
                </Button>
                </div>
                </div>
            </div>
					</div>
				</Fade>
			</Modal>
	);
}
