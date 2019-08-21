import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }),
);

export default function OutlinedButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button variant="outlined" className={classes.button}>
        Default
      </Button>
    </div>  
    
    );
}
    