import React, { useMemo, useState, useEffect } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container, Box, Typography } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import { useSetting } from './states/useSettings';
import { ReactComponent as Logo } from './logo.svg';
import useRoute from './hooks/useRoute';

const useStyles = makeStyles(theme => ({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    padding: 0,

    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    rowGap: '8px',
  },

  navArea: {
    gridColumn: '1/2',

    display: 'grid',
    gridTemplateRows: '180px auto',
  },

  logo: {
    gridRow: '1/2',
    whiteSpace: 'nowrap',
    display: 'grid',
    placeContent: 'center',
    rowGap: `${theme.spacing(2)}px`,
  },

  logoIcon: {
    width: '57px',
  },

  logoText: {
    textTransform: 'uppercase',
    fontWeight: '900',
  },

  nav: {
    gridRow: '2/3',
    paddingTop: theme.spacing(3),
  },

  filterArea: {
    gridRow: '1/2',
    display: 'grid',
    padding: theme.spacing(2, 3, 1, 3),

    position: 'sticky',
    top: '0',
    zIndex: '10',
    opacity: '0.98',
  },

  contentArea: {
    gridColumn: '2/3',
    position: 'relative',
    overflowY: 'auto',
    scrollBehavior: 'smooth',
  },

  content: {
    gridRow: '2/3',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    padding: theme.spacing(2, 5),
  },
}));

function App() {
  const { isDarkMode } = useSetting();
  const [contentBg, setContentBg] = useState();

  // Extracted from useStore
  const [section, setSection] = useState('airing');
  const [selectedDate, setSelectedDate] = useState('All');
  const [filter, setFilter] = useState('');
  const [titleLang, setTitleLang] = useState('english');

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
            <Nav section={section} nav={setSection} />
          </Box>
        </Box>
        <Box className={styles.contentArea} style={{ background: contentBg }}>
          <Box className={styles.filterArea} style={{ background: theme.palette.background.default }}>
            <SearchBar filter={filter} setFilter={setFilter} />
            {isAiring ? <DaySelector selectedDate={selectedDate} selectDate={setSelectedDate} /> : null}
          </Box>
          <Box className={styles.content}>
            <ContentComp
              section={section}
              filter={filter}
              titleLang={titleLang}
              setTitleLang={setTitleLang}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
