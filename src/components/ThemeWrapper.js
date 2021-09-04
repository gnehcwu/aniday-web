import React, { useMemo } from 'react';
import { useSetting } from '../states/useSetting';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import App from './App';

const ThemeWrapper = () => {
  const { isDarkMode } = useSetting();

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: `Overpass, -apple-system, BlinkMacSystemFont, sans-serif,
        "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol";`,
        },
        palette: {
          type: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default ThemeWrapper;
