import React, { useMemo } from 'react';
import { createMuiTheme, makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, Box, Paper, Typography } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import AnimeList from './components/AnimeList';
import { useSetting } from './states/useSettings';

const useStyles = makeStyles(theme => {
  return {
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

    filterArea: {
      gridRow: '1/2',
      display: 'grid',
      justifyContent: 'center',
      rowGap: `${theme.spacing(2)}px`,
      padding: theme.spacing(2, 3, 1, 3),

      position: 'sticky',
      top: '0',
      zIndex: '10',
    },
  };
});

function App() {
  const styles = useStyles();

  const { isDarkMode, lang } = useSetting();

  const theme = useMemo(
    () =>
      createMuiTheme({
        typography: {
          fontFamily:
            'Overpass, -apple-system, BlinkMacSystemFont, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
        },
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        className={styles.app}
        style={{ background: theme.palette.background.default }}
      >
        <Box className={styles.navArea}>
          <Box className={styles.logo}>
            <Typography color="textPrimary">Anime Day</Typography>
          </Box>
          <Box className={styles.nav}>
            <Nav />
          </Box>
        </Box>
        <Box className={styles.contentArea}>
          <Box className={styles.filterArea}>
            <SearchBar className={styles.searchBar} />
            <DaySelector className={styles.daySelector} />
          </Box>
          <Box className={styles.content}>
            <AnimeList />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
