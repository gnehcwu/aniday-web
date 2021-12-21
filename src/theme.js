import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
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
