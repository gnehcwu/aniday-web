import React from 'react';
import { SETTING_ACTIONS, useSetting, useSettingDispatch } from '../states/useSettings';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const ThemeToggle = () => {
  const { isDarkMode } = useSetting();
  const dispatch = useSettingDispatch();

  const toggleTheme = () => {
    dispatch({ type: SETTING_ACTIONS.UPDATE_THEME, payload: { isDarkMode: !isDarkMode } });
  };

  return (
    <IconButton aria-label="toggle light/dark theme" onClick={toggleTheme}>
      {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeToggle;
