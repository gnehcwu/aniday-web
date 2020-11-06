import React, { createContext, useContext, useReducer } from 'react';

export default function makeStore(reducer, initialState = {}) {
  const storeContext = createContext();
  const dispatchContenxt = createContext();

  const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContenxt.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContenxt.Provider>
    );
  };

  function useStore() {
    return useContext(storeContext);
  }

  function useDispatch() {
    return useContext(dispatchContenxt);
  }

  return [StoreProvider, useStore, useDispatch];
}
