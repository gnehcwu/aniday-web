import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const TBA = () => {
  return (
    <Paper style={{ display: 'grid', placeContent: 'center', padding: '16px' }}>
      <AccountTreeIcon />
      <Paper>
        <Typography>Under construction</Typography>
      </Paper>
    </Paper>
  );
};

export default TBA;
