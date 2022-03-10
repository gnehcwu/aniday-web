import { Container, Grid, GridItem, Box, useBreakpointValue, useColorMode, useTheme, useColorModeValue } from '@chakra-ui/react';
import Nav from './components/Nav';
import DaySelector from './components/DaySelector';
import AnimeList from './components/AnimeList';

export default function App() {
  const { colorMode } = useColorMode();
  const contentGap = useBreakpointValue({ base: '2', md: '9' });
  const theme = useTheme();
  console.log(theme);

  const selectorStyle = useBreakpointValue({
    base: {
      overflowX: 'auto',
      position: 'fixed',
      top: '50%',
      right: '10px',
      scrollBehavior: 'smooth',
      background: useColorModeValue(theme.colors.blackAlpha[400], theme.colors.blackAlpha[500]),
      padding: '16px',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderTopLeftRadius: '16px',
      borderTopRightRadius: '16px',
      borderBottomLeftRadius: '16px',
      borderBottomRightRadius: '16px',
      transform: 'translateY(-50%)',
      zIndex: '999',
    }, md: {}
  });

  const navStyle = useBreakpointValue({
    base: {
      position: 'fixed',
      background: useColorModeValue('white', 'var(--chakra-colors-gray-800)'),
      paddingBlock: '8px',
      zIndex: 1,
      width: 'calc(100vw - 32px)',
      top: 0,
    }, md: {}
  });

  return (
    <Container
      maxW="1280px"
      maxHeight={{base:'none', md: '100vh'}}
      py={{ base: 4, md: 12 }}
      overflow="hidden"
      sx={{
        display: 'grid',
        gridTemplateRows: 'min-content 1fr',
        gap: contentGap,
      }}
    >
      <Box paddingLeft={{ base: 0, md: 1 }} sx={navStyle}>
        <Nav />
      </Box>
      <Grid
        templateColumns={{ base: '1fr', md: 'max-content 1fr' }}
        templateRows={{ base: 'auto 1fr;', md: '1fr' }}
        gap={{ base: 3, md: 10 }}
        overflow="hidden"
        paddingLeft={{ base: 0, md: 1 }}
      >
        <GridItem alignSelf="start" py={{ base: 0, md: 2 }} justifySelf="center" sx={selectorStyle}>
          <DaySelector />
        </GridItem>
        <GridItem overflowY="auto" sx={{ colorScheme: colorMode }} px={{ base: 0, md: 4 }} py={{ base: 2, md: 2 }} pt={{ base: '72px', md: 2 }}>
          <AnimeList />
        </GridItem>
      </Grid>
    </Container>
  );
}
