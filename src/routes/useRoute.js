import { useMemo } from 'react';
import Settings from '../components/Settings';
import AnimeList from '../components/AnimeList';

const mappings = {
  airing: AnimeList,
  setting: Settings,
  tba: AnimeList,
};

const useRoute = section => {
  const comp = useMemo(() => mappings[section], [section]);

  return [comp, section === 'airing'];
};

export default useRoute;
