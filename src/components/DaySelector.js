import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 4, 1, 4),
  },

  daysContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, 0))',
    columnGap: '12px',
    justifyContent: 'center',
  },
}));

const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaySelector = () => {
  const styles = useStyles();
  const [selected, setSelected] = useState('Monday');

  const switchSelectedDay = current => {
    setSelected(current);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.daysContainer}>
        {days.map(day => (
          <Chip
            key={day}
            className={styles.dayItem}
            color={day === selected ? 'primary' : 'default'}
            clickable
            label={day}
            avatar={<Avatar>{day[0]}</Avatar>}
            onClick={() => switchSelectedDay(day)}
          ></Chip>
        ))}
      </Box>
    </Box>
  );
};

export default DaySelector;
