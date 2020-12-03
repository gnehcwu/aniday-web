import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 3, 1, 3),
  },

  search: {
    display: 'flex',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: '640px',
    width: '75%',
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },
}));

const SearchBar = ({ filter, setFilter }) => {
  const styles = useStyles();

  const filterAnime = event => {
    setFilter(event.target.value);
  };

  return (
    <Box className={styles.root}>
      <Paper className={styles.search} elevation={0}>
        <IconButton type="submit" className={styles.iconButton} aria-label="search">
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
        <InputBase
          className={styles.input}
          value={filter}
          placeholder="Filter anime..."
          inputProps={{ 'aria-label': 'Filter anime' }}
          onChange={filterAnime}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
