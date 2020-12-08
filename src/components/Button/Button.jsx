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

function Buttons({children, variant, color, disabled}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button disableElevation variant={variant} disabled={disabled} color={color}>
        {children}
      </Button>
    </div>
  );
}

export default Buttons