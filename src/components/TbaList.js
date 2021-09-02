import React, { useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import AnimeCard from './AnimeCard';
import useAnimeList from '../hooks/useAnilist';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(375px, 100%), 1fr))',
    padding: theme.spacing(1),
    rowGap: `${theme.spacing(5)}px`,
    columnGap: `${theme.spacing(4)}px`,
  },
}));

const TbaList = ({ section }) => {
  const styles = useStyles();
  const [isLoading, data, fetchAnimes] = useAnimeList();

  useEffect(() => {
    fetchAnimes(section);
  }, [section, fetchAnimes])

  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {data.map(anime => (
        <AnimeCard key={anime.id} anime={anime} />
      ))}
    </Box>
  );
};

export default TbaList;
