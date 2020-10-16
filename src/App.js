import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box } from '@material-ui/core';
import SearchBar from './components/SearchBar';
import Nav from './components/Nav';

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

    display: 'grid',
    gridTemplateRows: 'min-content auto',
  },

  content: {
    gridRow: '2/3',
  },

  searchBar: {
    gridRow: '1/2',
  },
}));

function App() {
  const styles = useStyles();

  return (
    <Container maxWidth={false} className={styles.app}>
      <Box className={styles.navArea}>
        <Box className={styles.logo}>Anime Day</Box>
        <Box className={styles.nav}>
          <Nav />
        </Box>
      </Box>
      <Box className={styles.contentArea}>
        <SearchBar className={styles.searchBar} />
        <Box className={styles.content}>Content</Box>
      </Box>
    </Container>
  );
}

export default App;
