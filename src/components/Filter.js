import React, { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, IconButton, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useRoute from '../hooks/useRoute';

const useStyles = makeStyles(theme => ({
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
  const { updateQueryParam, filterParam, path } = useRoute();

  const filterAnime = _ => {
    updateQueryParam(inputRef.current.value.toLowerCase());
  };

  useEffect(() => {
    inputRef.current.value = filterParam;
  }, [path, filterParam]);

  return (
    <Box className={styles.root}>
      <Paper className={styles.search} elevation={0}>
        <IconButton type="submit" className={styles.iconButton} aria-label="search">
          <SearchIcon className={styles.searchIcon} />
        </IconButton>
        <InputBase
          className={styles.input}
          defaultValue={filterParam}
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
