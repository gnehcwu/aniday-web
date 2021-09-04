import makeStore from './makeStore';

const SETTING_ACTIONS = {
  UPDATE_THEME: 'update-theme',
  UPDATE_LANG: 'update-lang',
};

function reducer(state, action) {
  switch (action.type) {
    case SETTING_ACTIONS.UPDATE_THEME:
      return { ...state, isDarkMode: action.payload };
    case SETTING_ACTIONS.UPDATE_LANG:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
}

const [SettingProvider, useSetting, useSettingDispatch] = makeStore(reducer, {
  isDarkMode: true,
  lang: 'english',
});

export { SETTING_ACTIONS, SettingProvider, useSetting, useSettingDispatch };
