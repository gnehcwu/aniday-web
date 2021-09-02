import { useState, useCallback } from 'react';
import fetchAiring from '../services/fetchAiring';
import fetchTba from '../services/fetchTba';

function useAnimeList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnimes = useCallback(async (section) => {
    try {
      const fetchFn = 'airing' === section ? fetchAiring : fetchTba;
      const field = 'airing' === section ? 'airingSchedules' : 'media';
      const result = await fetchFn();
      setData(result.data.Page[field]);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  return [isLoading, data, fetchAnimes];
}

export default useAnimeList;

