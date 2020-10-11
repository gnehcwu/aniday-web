import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  app: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    padding: 0,

    display: 'grid',
    gridTemplateRows: '60px auto',
    rowGap: '8px',
  },

  headerArea: {
    gridRow: '1/2',
    background: '#333',
  },

  contentArea: {
    gridRow: '2/3',
    background: '#FDAACC',

    display: 'grid',
    gridTemplateColumns: '240px auto',
  },

  nav: {
    gridColumn: '1/2',
  },

  content: {
    gridColumn: '2/3',
  },
});

function App() {
  const styles = useStyles();

  return (
    <Container className={styles.app}>
      <Box className={styles.headerArea} p={1}>
        <Box>Logo</Box>
        <Box>Search</Box>
      </Box>
      <Box className={styles.contentArea}>
        <Box className={styles.nav}>Nav</Box>
        <Box className={styles.content}>Content</Box>
      </Box>
    </Container>
  );
}

export default App;
