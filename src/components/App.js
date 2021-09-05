import React, { useEffect } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Filter from './Filter';
import Nav from './Nav';
import DaySelector from './DaySelector';
import { useSetting } from '../states/useSetting';
import { ReactComponent as Logo } from '../logo.svg';
import useRoute from '../hooks/useRoute';
import { BrowserRouter as Router } from 'react-router-dom';

const useStyles = makeStyles(theme => {
  return {
    app: {
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      padding: 0,
      background: theme.palette.background.default,

      display: 'grid',
      gridTemplateAreas: `"nav filter"
      "nav content"`,
      gridTemplateColumns: 'min-content 1fr',
      gridTemplateRows: 'min-content 1fr',
      [theme.breakpoints.down('sm')]: {
        gridTemplateAreas: `"filter"
                            "content"`,
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'min-content 1fr',
        rowGap: 0,
        height: '100%',
        minHeight: '100vh',
      },
    },

    navArea: {
      gridArea: 'nav',
      opacity: 0.95,
      display: 'grid',
      gridTemplateAreas: `"logo"
      "nav"`,
      gridTemplateRows: '180px auto',
      background: theme.palette.background.default,
      [theme.breakpoints.down('sm')]: {
        gridTemplateAreas: '"logo nav"',
        gridTemplateColumns: 'min-content 1fr',
        gridTemplateRows: '1fr',
        gap: `${theme.spacing(3)}px`,

        position: 'fixed',
        zIndex: 1,
        padding: theme.spacing(1, 2),
        borderRadius: `1000px`,
        margin: '0 auto',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%) translateY(-25px)',
      },
      [theme.breakpoints.down('xs')]: {
        gap: `${theme.spacing(2)}px`,
      },
    },

    logo: {
      gridArea: 'logo',
      whiteSpace: 'nowrap',
      display: 'grid',
      placeContent: 'center',
      rowGap: `${theme.spacing(2)}px`,
    },

    logoIcon: {
      width: '57px',
      [theme.breakpoints.down('sm')]: {
        width: '28px',
      },
    },

    logoText: {
      textTransform: 'uppercase',
      fontWeight: '900',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },

    nav: {
      gridArea: 'nav',
      paddingTop: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      },
    },

    filterArea: {
      gridArea: 'filter',
      display: 'grid',
      padding: theme.spacing(1),
      rowGap: `${theme.spacing(1)}px`,
      top: '0',
      zIndex: '10',
      opacity: '0.97',
      background: theme.palette.background.default,

      [theme.breakpoints.down('sm')]: {
        position: 'fixed',
        left: 0,
        right: 0,
      },
    },

    content: {
      gridArea: 'content',
      position: 'relative',
      overflowY: 'overlay',
      scrollBehavior: 'smooth',
      background: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      padding: theme.spacing(2, 5),

      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2),
      },
    },
  };
});

function App() {
  const { isDarkMode } = useSetting();

  const theme = useTheme();
  const styles = useStyles(theme);

  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const { getRouterApp, path } = useRoute();

  // Enhance responsiveness
  useEffect(() => {
    const { style } = document.body;
    style.background = theme.palette.background.default;

    if (matches) {
      style.paddingTop = { airing: '100px', tba: '60px' }[path] || 0;
    } else {
      style.paddingTop = 0;
    }
  }, [isDarkMode, theme.palette.background.default, path, matches]);

  const renderFilterArea = () => {
    if (path === 'setting') return null;

    return (
      <Box className={styles.filterArea}>
        <Filter />
        {path === 'airing' ? <DaySelector /> : null}
      </Box>
    );
  };

  return (
    <Router>
      <Container
        maxWidth={false}
        className={styles.app}
        style={{ colorScheme: isDarkMode ? 'dark' : 'light' }}
      >
        <Box className={styles.navArea}>
          <Box className={styles.logo}>
            <Logo className={styles.logoIcon} alt="logo" />
            <Typography color="textPrimary" className={styles.logoText}>
              Anime Day
            </Typography>
          </Box>
          <Box className={styles.nav}>
            <Nav />
          </Box>
        </Box>
        {renderFilterArea()}
        <Box className={styles.content}>{getRouterApp()}</Box>
      </Container>
    </Router>
  );
}

export default App;
