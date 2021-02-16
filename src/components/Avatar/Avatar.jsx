import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  large: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
}));

export default function ImageAvatars({alt, size, src}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={alt} src={src} className={classes.[size]} />
    </div>
  );
}