import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
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
    color: 'rgb(65, 107, 208)',
  },

  searchIcon: {
    color: 'rgb(65, 107, 208)',
  },

  iconButton: {
    padding: 10,
  },
}));

const SearchBar = () => {
  const styles = useStyles();

  return (
    <Box className={styles.root}>
      <Paper className={styles.search} elevation={0}>
        <IconButton type="submit" className={styles.iconButton} aria-label="search">
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
        <InputBase
          className={styles.input}
          placeholder="Filter anime..."
          inputProps={{ 'aria-label': 'Filter anime' }}
        />
      </Paper>
    </Box>
  );
};

export default SearchBar;
