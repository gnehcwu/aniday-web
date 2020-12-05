import { useMemo } from 'react';
import Settings from '../components/Settings';
import AiringList from '../components/AiringList';
import TbaList from '../components/TbaList';

const mappings = {
  airing: AiringList,
  setting: Settings,
  tba: TbaList,
};

const useRoute = section => {
  const comp = useMemo(() => mappings[section], [section]);

  return [comp, section === 'airing'];
};

export default useRoute;
