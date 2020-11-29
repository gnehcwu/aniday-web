import React, { useState, useRef, useEffect } from 'react';
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

  const getWidthDiff = () => {
    if (contentRef.current && containerRef.current) {
      return contentRef.current.clientWidth - containerRef.current.clientWidth;
    }
    return 0;
  };

  const scroll = (event, direction) => {
    event.preventDefault();

    if (!isMobile) return;

    let sign = direction === undefined ? Math.sign(event.deltaX) : direction === 'left' ? -1 : 1;
    let cur = transX + sign * 200; // Magic number for scrolling unit size: 200px
    const widthDiff = getWidthDiff();
    if (cur < 0) {
      cur = 0;
    } else if (cur > widthDiff) {
      cur = widthDiff;
    }

    setTransX(cur);
  };

  useEffect(() => {
    const handleResizing = () => {
      const mobileMode = getWidthDiff() > 0;
      setIsMobile(mobileMode);

      // Reset translateX when switching "mobile" mode
      if (!isMobile) setTransX(0);
    };

    window.addEventListener('resize', handleResizing);
    handleResizing();

    const contentEle = contentRef.current;
    contentEle.addEventListener('wheel', scroll);

    return () => {
      window.removeEventListener('resize', handleResizing);
      contentEle.removeEventListener('wheel', scroll);
    };
  });

  const getNavIconStatus = direction => {
    const widthDiff = getWidthDiff();
    let display = 'none';
    if (
      isMobile &&
      ((direction === 'left' && transX > 0) || (direction === 'right' && transX < widthDiff))
    ) {
      display = 'flex';
    }
    return { display };
  };

  return (
    <Box className={styles.root} ref={containerRef}>
      <Box className={styles.navIconHolderLeft} style={getNavIconStatus('left')}>
        <IconButton size="small" className={styles.navIcon} onClick={event => scroll(event, 'left')}>
          <KeyboardArrowLeftIcon />
        </IconButton>
      </Box>
      <Box
        className={styles.scrollContainer}
        style={{ justifyContent: `${isMobile ? 'start' : 'center'}` }}
      >
        <Box
          className={styles.daysContainer}
          ref={contentRef}
          style={{ transform: `translateX(${-1 * transX}px)` }}
        >
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
      <Box className={styles.navIconHolderRight} style={getNavIconStatus('right')}>
        <IconButton size="small" className={styles.navIcon} onClick={event => scroll(event, 'right')}>
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DaySelector;
