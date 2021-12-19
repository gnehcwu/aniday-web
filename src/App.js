import { Container, Grid, GridItem, Box, useBreakpointValue } from '@chakra-ui/react';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import AnimeList from './components/AnimeList';
import { useColorMode } from '@chakra-ui/react';

export default function App() {
  const { colorMode } = useColorMode();
  const contentGap = useBreakpointValue({ base: '2', md: '9' });

  return (
    <Container
      maxW="1048px"
      height="100vh"
      py={{ base: 4, md: 12 }}
      overflow="hidden"
      sx={{ display: 'grid', gridTemplateRows: 'min-content 1fr', gap: contentGap }}
    >
      <Box paddingLeft={{ base: 0, md: 1 }}>
        <Nav />
      </Box>
      <Grid
        templateColumns={{ base: '1fr', md: 'max-content 1fr' }}
        gap={{ base: 2, md: 7 }}
        overflow="hidden"
        paddingLeft={1}
      >
        <GridItem alignSelf="start" py={{ base: 0, md: 2 }} justifySelf="center">
          <DaySelector />
        </GridItem>
        <GridItem overflowY="auto" sx={{ colorScheme: colorMode }} px={5} py={2}>
          <AnimeList />
        </GridItem>
      </Grid>
    </Container>
  );
}
