import { Box, Image, Tag, Text, Flex, Tooltip, useBreakpointValue } from '@chakra-ui/react';
import { useSetting } from '../states/useSetting';
import { motion } from 'framer-motion';

const Card = motion(Box);

export default function AnimeCard({ anime, episode, openAnime }) {
  const { lang } = useSetting();
  const animeTitle = anime.title[lang] || anime.title['romaji'];
  const aspectRatio = useBreakpointValue({ base: '1 / 1.1', md: '1 / 1.1' });

  const handleClick = () => {
    openAnime(anime);
  };

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      whileHover={{ scale: 1.07 }}
      onClick={handleClick}
    >
      <Image
        width="100%"
        src={anime.coverImage.large}
        objectFit="cover"
        sx={{
          aspectRatio: aspectRatio,
        }}
      />
      <Flex
        px={{ base: 3, md: 3 }}
        paddingTop={{ base: 3, md: 4 }}
        paddingBottom={{ base: 3, md: 2 }}
        direction="column"
        gap={{base: 3, md: 2}}
        alignContent="flex-start"
        alignItems="flex-start"
      >
        <Tag size="sm" bgGradient="var(--chakra-colors-bg-gradient)" fontWeight="700">
          Ep {episode}
        </Tag>
        <Tooltip label={animeTitle}>
          <Text fontSize="md" noOfLines={1}>
            {animeTitle}
          </Text>
        </Tooltip>
      </Flex>
    </Card>
  );
}
