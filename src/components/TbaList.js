import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import AnimeCard from './AnimeCard';
import useAnimeList from '../hooks/useAnime';
import { useStore } from '../states/useStore';
import useRoute from '../hooks/useRoute';
import useFilterAnime from '../hooks/useFilterAnime';

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

  const { filterParam } = useRoute();
  const filterAnime = useFilterAnime();

  useAnimeList();

  const getFilteredData = () => {
    if (isLoading) return tbaList;
    return filterAnime(tbaList, filterParam);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {getFilteredData().map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </Box>
  );
};

export default TbaList;
