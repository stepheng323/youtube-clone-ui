import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Buttons({children, variant, color, disabled, handleClick}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button onClick={handleClick} disableElevation variant={variant} disabled={disabled} color={color}>
        {children}
      </Button>
    </div>
  );
}

export default Buttons