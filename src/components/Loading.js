import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'grid',
    placeContent: 'center',
  },
}));

const Loading = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default Loading;
