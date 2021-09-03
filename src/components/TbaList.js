import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import AnimeCard from './AnimeCard';
import useAnimeList from '../hooks/useAnime';
import { useStore } from '../states/useStore';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
    padding: theme.spacing(1),
    rowGap: `${theme.spacing(5)}px`,
    columnGap: `${theme.spacing(4)}px`,
  },
}));

const TbaList = () => {
  const styles = useStyles();

  const { isLoading, tbaList } = useStore();

  useAnimeList();

  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {tbaList.map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </Box>
  );
};

export default TbaList;
