import React, { useMemo } from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { Container, Box, Paper } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import AnimeList from './components/AnimeList';
import { useSetting } from './states/useSettings';

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
    background: 'rgb(245, 247, 253)',

    display: 'grid',
    gridTemplateRows: '180px auto',
  },

  logo: {
    gridRow: '1/2',
    whiteSpace: 'nowrap',
    display: 'grid',
    placeContent: 'center',
    textTransform: 'uppercase',
  },

  nav: {
    gridRow: '2/3',
  },

  contentArea: {
    gridColumn: '2/3',
    position: 'relative',
    overflowY: 'auto',
  },

  content: {
    gridRow: '2/3',
    paddingBottom: theme.spacing(3),
  },

  fitlerArea: {
    gridRow: '1/2',
    display: 'grid',
    justifyContent: 'center',
    rowGap: `${theme.spacing(3)}px`,
    padding: theme.spacing(3, 3, 2, 3),

    position: 'sticky',
    top: '0',
    background: 'rgba(255, 255,255, 0.89)',
    zIndex: '10',
  },
}));

function App() {
  const styles = useStyles();

  const { isDarkMode, lang } = useSetting();

  const theme = useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily:
            'Overpass, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
        },
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} className={styles.app}>
        <Box className={styles.navArea}>
          <Box className={styles.logo}>Anime Day</Box>
          <Box className={styles.nav}>
            <Nav />
          </Box>
        </Box>
        <Box className={styles.contentArea}>
          <Paper className={styles.fitlerArea}>
            <SearchBar className={styles.searchBar} />
            <DaySelector className={styles.daySelector} />
          </Paper>
          <Box className={styles.content}>
            <AnimeList />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
