import { useState, useEffect } from 'react';
import getAiring from '../services/airing';
import getTba from '../services/tba';

function useAnilist(section) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAiringSchedules = async () => {
      try {
        const fetchFn = 'airing' === section ? getAiring : getTba;
        const field = 'airing' === section ? 'airingSchedules' : 'media';
        const result = await fetchFn();
        setData(result.data.Page[field]);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    fetchAiringSchedules();
  }, [section]);

  return [isLoading, data];
}

export default useAnilist;
