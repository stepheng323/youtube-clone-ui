/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { UserContext } from '../../Context/User';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CircularLoading } from '../../Utils/Loading';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Link } from 'react-router-dom';
import { REACT_APP_DEV_BASE_URL } from '../../constant';

import './channel-modal2.css';
import UseForm from '../../Api/UseForm';
import ImageAvatars from '../Avatar/Avatar';
import { capitalize } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		width: '47%',
		height: '85%',
		outline: 'none',
	},
}));

export default function CreateChannelModal2({ handleClose, open }) {
	const { user } = useContext(UserContext);
	const classes = useStyles();
	const createChannelWithUserAccountUrl = `${REACT_APP_DEV_BASE_URL}/channel/with-user-account`;
	const {result, isSubmitting, handleSubmit: createChannelWithUserAccount } = UseForm({}, createChannelWithUserAccountUrl, { method: 'POST'});

	if (result && result.success) {
		return <Redirect to='channel' />;
	}
	return (
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
				<div className={classes.paper}>
					<div className='channel-modal2-container'>
						{ isSubmitting && (
							<div className='channel-modal2-container-loading'>
								<CircularLoading />
							</div>
						)}
						<p className='channel-modal2-header'>
							Choose how to create your channel
						</p>
						<div className='channel-modal2-options'>
							<div className='channel-modal2-options-left'>
								<p className='channel-modal2-options-header'>Use your name</p>
								<p className='channel-modal2-options-sub-header'>
									Create a channel using the name and picture on your account.
								</p>
								<div className="account-avatar"><ImageAvatars
									alt={capitalize(user?.firstName || "")}
									size="large"
									src={user.firstName}
								/>
								</div>
								<p className='channel-modal2-options-username'>{`${user?.firstName} ${user?.lastName}`}</p>
								<p className='channel-modal2-options-terms'>
									By selecting this option, you agree to YouTube &rsquo;s Terms of
									Service.
								</p>
								<div className='channel-modal2-options-button'>
									<Button
										onClick={createChannelWithUserAccount}
										variant='contained'
										color='primary'
										disableElevation
									>
										SELECT
									</Button>
								</div>
							</div>
							<div className='channel-modal2-options-right'>
								<p className='channel-modal2-options-header'>
									Use a custom name
								</p>
								<p className='channel-modal2-options-sub-header mt'>
									Create a channel using a brand or other name and picture.
								</p>
								<div className='channel-modal2-img'>
									<img
										src='https://www.gstatic.com/youtube/img/channels/custom_identity_illustration.svg'
										alt='tut'
									/>
								</div>
								<div className='channel-modal2-options-button'>
									<Link to="/create/channel">
										<Button variant='contained' color='primary' disableElevation>
											SELECT
										</Button>
									</Link>
								</div>
							</div>
						</div>
						<p className='channel-modal2-text'>
							As a reminder, we may share non-personally identifiable
							information related to your channel and/or videos with our
							partners, including advertisers and rights holders.
						</p>
						<div className='channel-modal2-footer'>
							<Button onClick={handleClose}>CANCEL</Button>
						</div>
					</div>
				</div>
			</Fade>
		</Modal>
	);
}


