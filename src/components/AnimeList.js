import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useGlobal } from '../states/useStore';
import getAiring from '../services/airing';
import Loading from '../components/Loading';
import AnimeCard from '../components/AnimeCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(375px, 100%), 1fr))',
    padding: theme.spacing(1),
    rowGap: `${theme.spacing(5)}px`,
    columnGap: `${theme.spacing(4)}px`,
  },
}));

const AnimeList = () => {
  const styles = useStyles();
  const { filter, section, selectedDate } = useGlobal();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAiringSchedules = async () => {
      setIsLoading(true);
      try {
        const result = await getAiring();
        setData(result.data.Page.airingSchedules);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchAiringSchedules();
  }, [section]);

  const filtered = data.filter(item => item.media.genres.some(genere => genere.includes(filter)));

  console.log('rendering.....', isLoading, data);
  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {filtered.map(({ id, airingAt, episode, media: anime }) => (
        <AnimeCard key={id} anime={anime} episode={episode} airingAt={airingAt} />
      ))}
    </Box>
  );
};

export default AnimeList;
