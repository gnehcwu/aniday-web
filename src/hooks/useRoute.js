import Settings from '../components/Settings';
import AiringList from '../components/AiringList';
import TbaList from '../components/TbaList';

const mappings = {
  airing: AiringList,
  setting: Settings,
  tba: TbaList,
};

const useRoute = section => {
  return [mappings[section], section === 'airing'];
};

export default useRoute;
