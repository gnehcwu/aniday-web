import React, { useMemo, useState, useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import { useSetting } from './states/useSettings';
import { ReactComponent as Logo } from './logo.svg';
import useRoute from './hooks/useRoute';
import { useStore } from './states/useStore';

const useStyles = makeStyles(theme => ({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    padding: 0,

    display: 'grid',
    gridTemplateAreas: '"nav content"',
    gridTemplateColumns: 'min-content 1fr',
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: `"content"
                          "nav"`,
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 0px',
      rowGap: 0,
    },
    rowGap: '8px',
  },

  navArea: {
    gridArea: 'nav',
    display: 'grid',
    gridTemplateAreas: `"logo"
    "nav"`,
    gridTemplateRows: '180px auto',
    [theme.breakpoints.down('sm')]: {
      gridTemplateAreas: '"logo nav"',
      gridTemplateColumns: 'min-content 1fr',
      gridTemplateRows: '1fr',

      position: 'relative',
      zIndex: 1,
      transform: `translateY(-125px)`,
      background: 'rgb(48, 48, 48)',
      padding: `${theme.spacing(1)}px`,
      borderRadius: `1000px`,
      height: 'min-content',
      width: '85%',
      margin: '0 auto',
    },
  },

  logo: {
    gridArea: 'logo',
    whiteSpace: 'nowrap',
    display: 'grid',
    placeContent: 'center',
    rowGap: `${theme.spacing(2)}px`,
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 2),
    },
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
    gridRow: '1/2',
    display: 'grid',
    padding: theme.spacing(2, 3, 1, 3),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 2, 0)
    },

    position: 'sticky',
    top: '0',
    zIndex: '10',
    opacity: '0.98',
  },

  contentArea: {
    // gridColumn: '2/3',
    gridArea: 'content',

    position: 'relative',
    overflowY: 'overlay',
    scrollBehavior: 'smooth',
  },

  content: {
    gridRow: '2/3',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2, 5),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1, 1)
    }
  },
}));

function App() {
  const { isDarkMode } = useSetting();
  const [contentBg, setContentBg] = useState();
  const { section } = useStore();

  const theme = useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily: `Overpass, -apple-system, BlinkMacSystemFont, sans-serif,
            "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol";`,
        },
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  useEffect(() => {
    setContentBg(isDarkMode ? theme.palette.grey[900] : theme.palette.grey[100]);
  }, [theme.palette.grey, isDarkMode]);

  const styles = useStyles(theme);

  const [ContentComp, isAiring] = useRoute(section);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        className={styles.app}
        style={{ background: theme.palette.background.default, colorScheme: isDarkMode ? 'dark' : 'light' }}
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
        <Box className={styles.contentArea} style={{ background: contentBg }}>
          <Box className={styles.filterArea} style={{ background: theme.palette.background.default }}>
            <SearchBar />
            {isAiring ? <DaySelector /> : null}
          </Box>
          <Box className={styles.content}>
            <ContentComp />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
