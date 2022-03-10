import { useCallback, useState } from 'react';
import { Grid, Spinner, Box, useDisclosure } from '@chakra-ui/react';
import useAnimeList from '../hooks/useAnime';
import { useStore } from '../states/useStore';
import AnimeCard from './AnimeCard';
import AnieMeModal from './AnimeModal';

export default function AnimeList() {
  const { isLoading, startTimestamp, animeList } = useStore();

  useAnimeList();

  const getFilteredData = () => animeList.get(startTimestamp) || [];

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedAnime, setSelectedAnime] = useState(null);

  const openAnime = useCallback(
    anime => {
      setSelectedAnime(anime);
      onOpen();
    },
    [setSelectedAnime, onOpen]
  );

  return isLoading ? (
    <Box position="relative">
      <Spinner color="pink.400" position="absolute" left="50%" transform="translateX(-50%)" />
    </Box>
  ) : (
    <>
      <Grid
        templateColumns={{
          base: '1fr 1fr',
          md: 'repeat(auto-fit, minmax(min(195px, 100%), 1fr))',
        }}
        rowGap={{ base: 4, md: 9 }}
        columnGap={{ base: 4, md: 7 }}
      >
        {getFilteredData().map(({ id, airingAt, episode, media: anime }, index) => (
          <AnimeCard key={index} anime={anime} episode={episode} airingAt={airingAt} openAnime={openAnime} />
        ))}
      </Grid>
      <AnieMeModal isOpen={isOpen} onClose={onClose} anime={selectedAnime} />
    </>
  );
}
