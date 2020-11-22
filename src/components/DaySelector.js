import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Avatar, IconButton } from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
  },

  scrollContainer: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    width: '100%',
    display: 'grid',
    justifyContent: 'center',
  },

  daysContainer: {
    // display: 'grid',
    // justifyContent: 'center',
    // alignItems: 'center',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, 0))',
    // columnGap: '12px',
    display: 'inline-block',
    transitionDuration: '0.15s',
    transitionTimingFunction: 'cubic-bezier(0.05, 0, 0, 1)',
    willChange: 'transform',
    whiteSpace: 'nowrap',
  },

  dayItem: {
    margin: theme.spacing(0, 1),

    '&:first-child': {
      marginLeft: theme.spacing(2),
    },

    '&:last-child': {
      marginRight: theme.spacing(2),
    },
  },

  navIconHolderLeft: {
    background: theme.palette.background.default,
    display: 'flex',
    position: 'absolute',
    left: 0,
    zIndex: '10',

    '&::after': {
      height: '32px',
      width: '20px',
      content: '""',
      pointerEvents: 'none',
      background: `linear-gradient(to right, ${theme.palette.background.default} 20%, ${theme.palette.background.paper} 80%)`,
    },
  },

  navIconHolderRight: {
    background: theme.palette.background.default,
    display: 'flex',
    position: 'absolute',
    right: 0,
    zIndex: '10',

    '&::before': {
      height: '32px',
      width: '20px',
      content: '""',
      pointerEvents: 'none',
      background: `linear-gradient(to left, ${theme.palette.background.default} 20%, ${theme.palette.background.paper} 80%)`,
    },
  },
}));

const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DaySelector = () => {
  const styles = useStyles();
  const [selected, setSelected] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [transX, setTransX] = useState(0);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  const switchSelectedDay = current => {
    setSelected(current);
  };

  useEffect(() => {
    const handleResizing = () => {
      console.log(containerRef.current.clientWidth, contentRef.current.clientWidth);
      const mobileMode = containerRef.current.clientWidth < contentRef.current.clientWidth;
      setIsMobile(mobileMode);
      console.log(11111, isMobile);
    };
    window.addEventListener('resize', handleResizing);
    handleResizing();

    const handleScrolling = event => {
      console.log(2222, event);
    };
    containerRef.current.addEventListener('scroll', handleScrolling);

    return () => {
      window.removeEventListener('resize', handleResizing);
      containerRef.current.removeEventListener('scroll', handleScrolling);
    };
  });

  const getNavIconStatus = () => {
    return { display: `${isMobile ? 'flex' : 'none'}` };
  };

  return (
    <Box className={styles.root} ref={containerRef}>
      <Box className={styles.navIconHolderLeft} style={getNavIconStatus()}>
        <IconButton size="small" className={styles.navIcon}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      <Box className={styles.scrollContainer}>
        <Box className={styles.daysContainer} ref={contentRef}>
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
      <Box className={styles.navIconHolderRight} style={getNavIconStatus()}>
        <IconButton size="small" className={styles.navIcon}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DaySelector;
