import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    bg: {
      gradient: 'linear-gradient(to right, #D69E2E, #ED64A6)',
    },
  },
  config: {
    initialColorMode: 'white',
  },
  styles: {
    global: {
      button: {
        _focus: {
          '--chakra-shadows-outline': '0 0 0 3px hotpink',
        },
        p: {
          fontWeight: 'bold',
        },
      },
    },
  },
  fonts: {
    body: 'Short Stack, sans-serif',
  },
});

export default theme;
