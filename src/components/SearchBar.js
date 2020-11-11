import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { STORE_ACTIONS, useGlobal, useGlobalDispatch } from '../states/useStore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    paddingBottom: `${theme.spacing(1)}px`,
  },

  search: {
    width: '640px',
    display: 'flex',
    alignItems: 'center',

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

const SearchBar = () => {
  const styles = useStyles();
  const dispatch = useGlobalDispatch();

  const { filter } = useGlobal();

  const filterAnime = event => {
    dispatch({ type: STORE_ACTIONS.UPDATE_FILTER, payload: { filter: event.target.value } });
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
