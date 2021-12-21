import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Text,
  IconButton,
  Tag,
  ModalFooter,
  useColorMode,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useSetting } from '../states/useSetting';

export default function AnieMeModal({ isOpen, anime, onClose }) {
  const { lang } = useSetting();
  const { colorMode } = useColorMode();

  const modalLayout = useBreakpointValue({ base: '125px 1fr', md: '200px 1fr' });
  const gap = useBreakpointValue({ base: '4', md: '7' });

  if (!anime) return null;

  const animeTitle = anime.title[lang] || anime.title['native'];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{base: 'lg', md: '2xl'}} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={4} />
          <ModalCloseButton />
          <ModalBody display="grid" gridTemplateColumns={modalLayout} gap={gap} paddingTop={5}>
            <Image
              width="100%"
              maxH={{ base: '275px', md: 'none' }}
              src={anime.coverImage.extraLarge}
              objectFit="cover"
              objectPosition="center"
              borderRadius="lg"
            />
            <Flex direction="column" gap={3} alignItems="flex-start">
              <Text fontSize="2xl" fontWeight="700">
                {animeTitle}
              </Text>
              <Flex gap={2}>
                {anime.genres.slice(0, 3).map(tag => (
                  <Tag key={tag} size="md" label={tag} bgGradient="linear(to-r, yellow.500, pink.400)">
                    {tag}
                  </Tag>
                ))}
              </Flex>
              <IconButton
                arial-label="Toggle theme"
                _hover={{ bgGradient: 'linear(to-r, yellow.500, pink.400)' }}
                _active={{ bgGradient: 'linear(to-r, yellow.500, pink.400)' }}
                icon={<ExternalLinkIcon />}
                onClick={() => window.open(anime.siteUrl, '_blank')}
              />
              <Text
                dangerouslySetInnerHTML={{ __html: anime.description || animeTitle }}
                noOfLines={{ base: 4, md: 6 }}
                overflowY="auto"
                sx={{ colorScheme: colorMode === 'light' ? 'light' : 'dark' }}
              />
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}