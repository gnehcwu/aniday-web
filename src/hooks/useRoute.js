import Settings from '../components/Settings';
import AiringList from '../components/AiringList';
import TbaList from '../components/TbaList';

const mappings = {
  airing: AiringList,
  tba: TbaList,
  setting: Settings,
};

const useRoute = section => {
  return mappings[section];
};

export default useRoute;
