import { useEffect, useCallback } from 'react';
import fetchAiring from '../services/fetchAiring';
import { STORE_ACTIONS, useStore, useStoreDispatch } from '../states/useStore';

function useAnimeList() {
  const { animeList, startTimestamp, endTimestamp } = useStore();
  const dispatch = useStoreDispatch();

  const fetchAnimeList = useCallback(
    async (startTimestamp, endTimestamp) => {
      dispatch({ type: STORE_ACTIONS.UPDATE_LOADING, payload: true });
      try {
        const result = await fetchAiring(startTimestamp, endTimestamp);
        const data = result.data.Page['airingSchedules'].filter(item => item.media.isAdult === false);
        dispatch({ type: STORE_ACTIONS.UPDATE_AIRING, payload: [startTimestamp, data] });
      } catch (err) {
        dispatch({ type: STORE_ACTIONS.UPDATE_LOADING, payload: false });
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (animeList.get(startTimestamp)?.length > 0) {
      return;
    }

    fetchAnimeList(startTimestamp, endTimestamp);
    //eslint-disable-next-line
  }, [startTimestamp, endTimestamp]);
}

export default useAnimeList;
