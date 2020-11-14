import { useMemo } from 'react';
import Settings from '../components/Settings';
import AnimeList from '../components/AnimeList';
import Loading from '../components/Loading';
import { useGlobal } from '../states/useStore';

const mappings = {
  airing: AnimeList,
  setting: Settings,
  tba: AnimeList,
};

const useRoute = () => {
  const { section, isLoading } = useGlobal();

  const comp = useMemo(() => (isLoading ? Loading : mappings[section]), [isLoading, section]);

  return [comp, section === 'airing'];
};

export default useRoute;
