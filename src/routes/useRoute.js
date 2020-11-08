import { useMemo } from 'react';
import Settings from '../components/Settings';
import AnimeList from '../components/AnimeList';
import { useGlobal } from '../states/useStore';

const mappings = {
  airing: AnimeList,
  setting: Settings,
};

const useRoute = () => {
  const { section } = useGlobal();

  const comp = useMemo(() => mappings[section], [section]);

  return comp;
};

export default useRoute;
