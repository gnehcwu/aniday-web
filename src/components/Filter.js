import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { STORE_ACTIONS, useStore, useStoreDispatch } from '../states/useStore';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0, 3, 1, 3),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
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

const Filter = () => {
  const styles = useStyles();
  const inputRef = useRef(null);
  const { filter } = useStore();
  const dispatch = useStoreDispatch();

  const filterAnime = _ => {
    dispatch({ type: STORE_ACTIONS.UPDATE_FILTER, payload: inputRef.current.value.toLowerCase() });
  };

  return (
    <Box className={styles.root}>
      <Paper className={styles.search} elevation={0}>
        <IconButton type="submit" className={styles.iconButton} aria-label="search">
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
        <InputBase
          className={styles.input}
          defaultValue={filter}
          placeholder="Filter anime..."
          inputProps={{ 'aria-label': 'Filter anime' }}
          inputRef={inputRef}
          onChange={filterAnime}
        />
      </Paper>
    </Box>
  );
};

export default Filter;
