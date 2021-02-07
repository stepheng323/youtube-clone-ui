import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import SidebarRow from '../SidebarRow/SidebarRow';
import TrendingIcon from '@material-ui/icons/Whatshot';


const useStyles = makeStyles({
	root: {
    width: 260,
    paddingTop: '.5em',
    paddingBottom: '.5em',
	},
	pos: {
		marginBottom: 12,
	},
});

export default function SimpleCard() {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
      <SidebarRow
					selected={false}
					Icon={TrendingIcon}
					title='Watch Later'
				/>
		</Card>
	);
}
