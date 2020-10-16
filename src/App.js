import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Paper } from '@material-ui/core';
import SearchBar from './components/SearchBar';

const useStyles = makeStyles(theme => ({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    padding: 0,

    display: 'grid',
    gridTemplateColumns: '300px auto',
    rowGap: '8px',
  },

  navArea: {
    gridColumn: '1/2',
    background: 'rgb(245, 247, 253)',
  },

  logo: {
    gridColumn: '1/2',
    whiteSpace: 'nowrap',
    // 245 247 253; 65 107 208; 222 230 253
  },

  contentArea: {
    gridColumn: '2/3',

    display: 'grid',
    gridTemplateRows: 'min-content auto',
  },

  content: {
    gridRow: '2/3',
  },

  searchArea: {
    gridRow: '1/2',
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'min-content auto',
    columnGap: '8px',
    padding: theme.spacing(4),
  },

  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgb(245, 247, 253)',

    gridColumn: '2/3',
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },
}));

function App() {
  const styles = useStyles();

  return (
    <Container maxWidth={false} className={styles.app}>
      <Box className={styles.navArea}>
        <Box className={styles.logo}>Anime Day</Box>
        <Box className={styles.nav}>Nav Content</Box>
      </Box>
      <Box className={styles.contentArea}>
        <SearchBar />
        <Box className={styles.content}>Content</Box>
      </Box>
    </Container>
  );
}

export default App;
