import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Loading from './Loading';
import AnimeCard from './AnimeCard';
import useAnimeList from '../hooks/useAnilist';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(375px, 100%), 1fr))',
    padding: theme.spacing(1),
    rowGap: `${theme.spacing(5)}px`,
    columnGap: `${theme.spacing(4)}px`,
  },
}));

const AiringList = ({ filter, section }) => {
  const styles = useStyles();
  // const { isLoading, data } = useQuery('airing', () => fetchAiring());
  const [isLoading, data, fetchAnimes] = useAnimeList();

  useEffect(() => {
    fetchAnimes(section);
  }, [section, fetchAnimes])

  const getFilteredData = () => {
    return data.filter(item =>
      item.media.genres.some(genre => filter === '' || genre.includes(filter))
    );
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {getFilteredData().map(({ id, airingAt, episode, media: anime }) => (
        <AnimeCard key={id} anime={anime} episode={episode} airingAt={airingAt} />
      ))}
    </Box>
  );
};

export default AiringList;
