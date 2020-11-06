import makeStore from './makeStore';

export const SETTING_ACTIONS = {
  UPDATE_THEME: 'update-theme',
  UPDATE_LANGUAGE: 'update-language',
};

function reducer(state, action) {
  switch (action.type) {
    case SETTING_ACTIONS.UPDATE_THEME:
      return { ...state, theme: action.payload.theme };
    case SETTING_ACTIONS.UPDATE_LANGUAGE:
      return { ...state, lang: action.payload.lang };
    default:
      return state;
  }
}

const [SettingProvider, useSettings, useSettingDispatch] = makeStore(reducer, {
  theme: 'dark',
  lang: 'en',
});

export { SETTING_ACTIONS, SettingProvider, useSettings, useSettingDispatch };
