import { Switch, Route, Redirect, Link } from 'react-router-dom';
import AiringList from '../components/AiringList';
import TbaList from '../components/TbaList';
import Settings from '../components/Settings';
import { useSearchParam, useLocation } from 'react-use';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import UpdateIcon from '@material-ui/icons/Update';

const navItems = [
  {
    icon: EventAvailableIcon,
    label: 'Airing',
    value: 'airing',
  },
  {
    icon: UpdateIcon,
    label: 'TBA',
    value: 'tba',
  },
  {
    icon: SettingsIcon,
    label: 'Settings',
    value: 'setting',
  },
];

const NavLink = ({ value, children }) => {
  const handleClick = () => {};
  return (
    <Link onClick={handleClick} to={`/${value}`} style={{ textDecoration: 'none' }}>
      {children}
    </Link>
  );
};

const useRoute = () => {
  const filterParam = useSearchParam('filter');
  const location = useLocation();
  const path = (location || { pathname: 'airing' })['pathname'].replace('/', '');

  const updateQueryParam = filter => {
    window.history.pushState({}, '', `${path}?filter=${filter}`);
  };

  const getRouterApp = () => {
    return (
      <Switch>
        <Route path="/airing">
          <AiringList />
        </Route>
        <Route path="/tba">
          <TbaList />
        </Route>
        <Route path="/setting">
          <Settings />
        </Route>
        <Redirect exact from="*" to="airing" />
      </Switch>
    );
  };

  return { filterParam, path, updateQueryParam, getRouterApp };
};

export default useRoute;
export { NavLink, navItems };
