import { Grid, Spinner, Box } from '@chakra-ui/react';
import useAnimeList from '../hooks/useAnime';
import { useStore } from '../states/useStore';
import AnimeCard from './AnimeCard';

export default function AnimeList() {
  const { isLoading, startTimestamp, animeList } = useStore();

  useAnimeList();

  const getFilteredData = () => animeList.get(startTimestamp) || [];

  return isLoading ? (
    <Box position="relative">
      <Spinner color="pink.400" position="absolute" left="50%" transform="translateX(-50%)" />
    </Box>
  ) : (
    <Grid
      templateColumns={{
        base: 'repeat(auto-fit, minmax(min(90px, 100%), 1fr))',
        md: 'repeat(auto-fit, minmax(min(150px, 100%), 1fr))',
      }}
      rowGap={9}
      columnGap={7}
    >
      {getFilteredData().map(({ id, airingAt, episode, media: anime }) => (
        <AnimeCard key={id} anime={anime} episode={episode} airingAt={airingAt} />
      ))}
    </Grid>
  );
}
