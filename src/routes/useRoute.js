import { useMemo } from 'react';
import Settings from '../components/Settings';
import AnimeList from '../components/AnimeList';
import TBA from '../components/Tba';
import { useGlobal } from '../states/useStore';

const mappings = {
  airing: AnimeList,
  setting: Settings,
  tba: TBA,
};

const useRoute = () => {
  const { section } = useGlobal();

  const comp = useMemo(() => mappings[section], [section]);

  return comp;
};

export default useRoute;
