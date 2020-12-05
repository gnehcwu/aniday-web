import React from 'react';
import { Box, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { SETTING_ACTIONS, useSetting, useSettingDispatch } from '../states/useSettings';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
    rowGap: `${theme.spacing(5)}px`,
    padding: theme.spacing(1),
  },
  settingItem: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateRows: 'max-content auto',
    rowGap: `${theme.spacing(2)}px`,
    padding: theme.spacing(4),
  },
  settingLabel: {
    textTransform: 'capital',
  },
  settingContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, 0))',
  },
  settingRecords: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(140px, 100%), 1fr))',
    columnGap: `${theme.spacing(3)}px`,
    rowGap: `${theme.spacing(2)}px`,
  },
  settingRecord: {
    background: theme.palette.action.hover,
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },
}));

const langs = [
  { title: 'Romaji', value: 'romaji' },
  { title: 'English', value: 'english' },
  { title: 'Native', value: 'native' },
];

const themeModes = [{ title: 'Light' }, { title: 'Dark' }];

const Settings = ({ titleLang, setTitleLang }) => {
  const toggleTheme = mode => {
    dispatch({ type: SETTING_ACTIONS.UPDATE_THEME, payload: { isDarkMode: mode } });
  };

  const theme = useTheme();
  const styles = useStyles(theme);
  const dispatch = useSettingDispatch();
  const { isDarkMode } = useSetting();

  return (
    <Box className={styles.container}>
      <Paper elevation={4} className={styles.settingItem}>
        <Typography variant="h6" className={styles.settingLabel}>
          Theme:
        </Typography>
        <Box className={styles.settingRecords}>
          {themeModes.map(({ title }) => (
            <Paper
              key={title}
              className={styles.settingRecord}
              onClick={() => toggleTheme(title === 'Dark')}
            >
              <Typography variant="h6" className={styles.recordTitle}>
                {title}
              </Typography>
              {isDarkMode ^ (title === 'Light') ? (
                <CheckCircleIcon style={{ color: green[500] }} fontSize="small" />
              ) : null}
            </Paper>
          ))}
        </Box>
      </Paper>
      <Paper elevation={4} className={styles.settingItem}>
        <Typography variant="h6" className={styles.settingLabel}>
          Title Language:
        </Typography>
        <Box className={styles.settingRecords}>
          {langs.map(({ title, value }) => (
            <Paper key={title} className={styles.settingRecord} onClick={() => setTitleLang(value)}>
              <Typography variant="h6" className={styles.recordTitle}>
                {title}
              </Typography>
              {titleLang === value && <CheckCircleIcon style={{ color: green[500] }} fontSize="small" />}
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
