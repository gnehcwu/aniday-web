import { useEffect, useCallback } from 'react';
import fetchAiring from '../services/fetchAiring';
import fetchTba from '../services/fetchTba';
import { STORE_ACTIONS, useStore, useStoreDispatch } from '../states/useStore';

function useAnimeList() {
  const { section, animeList, tbaList, startTimestamp, endTimestamp } = useStore();
  const dispatch = useStoreDispatch();

  const fetchAnimeList = useCallback(async (section, startTimestamp, endTimestamp) => {
    dispatch({ type: STORE_ACTIONS.UPDATE_LOADING, payload: true });
    try {
      const fetchFn = 'airing' === section ? fetchAiring : fetchTba;
      const field = 'airing' === section ? 'airingSchedules' : 'media';
      const result = await fetchFn(startTimestamp, endTimestamp);
      const data = result.data.Page[field];
      const dispatchContent =
        'airing' === section
          ? { type: STORE_ACTIONS.UPDATE_AIRING, payload: [startTimestamp, data] }
          : { type: STORE_ACTIONS.UPDATE_TBA, payload: data };
      dispatch(dispatchContent);
    } catch (err) {
      dispatch({ type: STORE_ACTIONS.UPDATE_LOADING, payload: false });
    }
  }, [dispatch]);

  useEffect(() => {
    if (
      (section === 'tba' && tbaList.length > 0) ||
      (section === 'airing' && animeList.get(startTimestamp)?.length > 0)
    ) {
      return;
    }
    fetchAnimeList(section, startTimestamp, endTimestamp);
    //eslint-disable-next-line
  }, [startTimestamp, endTimestamp, section]);

  return fetchAnimeList;
}

export default useAnimeList;
