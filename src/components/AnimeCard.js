import { Box, Image, Tag, Text, Flex, Tooltip } from '@chakra-ui/react';
import { useSetting } from '../states/useSetting';
import { motion } from 'framer-motion';

const Card = motion(Box);

export default function AnimeCard({ anime, episode, openAnime }) {
  const { lang } = useSetting();
  const animeTitle = anime.title[lang] || anime.title['native'];

  const handleClick = () => {
    openAnime(anime);
  };

  return (
    <Card
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      <Image
        width="100%"
        height={{ base: '125px', md: '175px' }}
        src={anime.coverImage.extraLarge}
        objectFit="cover"
        objectPosition="center"
      />
      <Flex px={{base: 1, md: 3}} py={{base: 2, md: 5}} direction="column" gap={2} alignContent="flex-start" alignItems="flex-start">
        <Tag size="sm" bgGradient="linear(to-r, yellow.500, pink.400)" fontWeight="700">
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
