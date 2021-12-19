import makeStore from './makeStore';

const SETTING_ACTIONS = {
  UPDATE_THEME: 'update-theme',
  UPDATE_LANG: 'update-lang',
};

const langs = ['Native', 'English'];

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
  lang: 'native',
});

export { langs, SETTING_ACTIONS, SettingProvider, useSetting, useSettingDispatch };
