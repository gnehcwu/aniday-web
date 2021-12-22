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
  const modalSize = useBreakpointValue({ base: 'md', md: '2xl' });
  const tagSize = useBreakpointValue({ base: 'sm', md: 'md' });

  if (!anime) return null;

  const animeTitle = anime.title[lang] || anime.title['romaji'];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={modalSize} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={4} />
          <ModalCloseButton />
          <ModalBody display="grid" gridTemplateColumns={modalLayout} gap={gap} paddingTop={5}>
            <Image
              width="100%"
              maxH={{ base: '275px', md: 'none' }}
              src={anime.coverImage.large}
              objectFit="cover"
              objectPosition="center"
              borderRadius="lg"
            />
            <Flex direction="column" gap={{ base: 2, md: 3 }} alignItems="flex-start">
              <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="700">
                {animeTitle}
              </Text>
              <Flex gap={{ base: 1, md: 2 }}>
                {anime.genres.slice(0, 2).map(tag => (
                  <Tag key={tag} size={tagSize} label={tag} bgGradient="var(--chakra-colors-bg-gradient)">
                    {tag}
                  </Tag>
                ))}
              </Flex>
              <IconButton
                arial-label="Toggle theme"
                _hover={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
                _active={{ bgGradient: 'var(--chakra-colors-bg-gradient)' }}
                icon={<ExternalLinkIcon />}
                onClick={() =>
                  window.open(
                    (anime.externalLinks[0] && anime.externalLinks[0].url) || anime.siteUrl,
                    '_blank'
                  )
                }
              />
              <Text
                dangerouslySetInnerHTML={{ __html: anime.description || animeTitle }}
                noOfLines={{ base: 3, md: 6 }}
                overflowY="auto"
                sx={{ colorScheme: colorMode }}
              />
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
