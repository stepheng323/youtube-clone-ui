/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Buttons from '../Button/Button';
import './unsubscribe.css';


function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 1),
  },
}));

export default function UnsubscribeModal({unsubscribeModal, handleUnsubscribe, handleCloseUnsubscribeModal, channelName}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);


  const body = (
    <div style={modalStyle} className={classes.paper}>
      <p className="unsubscribe-info" id="simple-modal-description">
      Unsubscribe from {channelName} ?
      </p>
      <UnsubscribeModal />
      <div className="unsubcribe-controls">
        <Buttons handleClick={handleCloseUnsubscribeModal}>Cancel</Buttons>
        <Buttons handleClick={handleUnsubscribe} color="primary">Unsubscribe</Buttons>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={unsubscribeModal}
        onClose={handleCloseUnsubscribeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
