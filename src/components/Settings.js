import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SETTING_ACTIONS, useSetting, useSettingDispatch } from '../states/useSettings';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
    rowGap: `${theme.spacing(2)}px`,
    padding: theme.spacing(2, 4),
  },
  settingItem: {
    display: 'grid',
    justifyContent: 'start',
    alignItems: 'center',
    gridTemplateRows: 'max-content auto',
    rowGap: `${theme.spacing(1.5)}px`,
    padding: theme.spacing(3, 4),
  },
  settingLabel: {
    textTransform: 'capital',
  },
  settingContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, 0))',
  },
}));

const Settings = () => {
  const toggleTheme = mode => {
    dispatch({ type: SETTING_ACTIONS.UPDATE_THEME, payload: { isDarkMode: mode } });
  };

  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useSettingDispatch();
  const { isDarkMode } = useSetting();

  return (
    <Box className={styles.container}>
      <Paper elevation={3} className={styles.settingItem}>
        <Typography variant="h6" className={styles.settingLabel}>
          Theme:
        </Typography>
        <Box className={styles.settingContent}>
          <IconButton
            color={isDarkMode ? 'default' : 'secondary'}
            aria-label="toggle light theme"
            onClick={() => toggleTheme(false)}
          >
            <Brightness7Icon />
          </IconButton>
          <IconButton
            color={isDarkMode ? 'secondary' : 'default'}
            aria-label="toggle dark theme"
            onClick={() => toggleTheme(true)}
          >
            <Brightness4Icon />
          </IconButton>
        </Box>
      </Paper>
      <Paper elevation={3} className={styles.settingItem}>
        <Typography variant="h6" className={styles.settingLabel}>
          Title Language:
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings;
