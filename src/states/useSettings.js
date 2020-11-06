import makeStore from './makeStore';

const SETTING_ACTIONS = {
  UPDATE_THEME: 'update-theme',
  UPDATE_LANGUAGE: 'update-language',
};

function reducer(state, action) {
  switch (action.type) {
    case SETTING_ACTIONS.UPDATE_THEME:
      return { ...state, isDarkMode: action.payload.isDarkMode };
    case SETTING_ACTIONS.UPDATE_LANGUAGE:
      return { ...state, lang: action.payload.lang };
    default:
      return state;
  }
}

const [SettingProvider, useSetting, useSettingDispatch] = makeStore(reducer, {
  isDarkMode: true,
  lang: 'en',
});

export { SETTING_ACTIONS, SettingProvider, useSetting, useSettingDispatch };
