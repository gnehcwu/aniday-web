import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Typography, Paper, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import UpdateIcon from '@material-ui/icons/Update';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import clsx from 'clsx';
import { STORE_ACTIONS, useStore, useStoreDispatch } from '../states/useStore';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto max-content',
    background: theme.palette.background.default,
  },

  navHolder: {
    gridRow: '1/2',
    display: 'grid',
    alignItems: 'center',
    gridTemplateRows: 'repeat(5, max-content)',
    rowGap: `${theme.spacing(3)}px`,
    paddingLeft: `${theme.spacing(3.25)}px`,
    paddingRight: `${theme.spacing(7.85)}px`,

    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: 0,
    },
  },

  navItem: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    alignItems: 'center',
    columnGap: `${theme.spacing(1.5)}px`,
    padding: theme.spacing(1.2, 3.1, 1.2, 1.3),
    borderRadius: `${theme.spacing(1.5)}px`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)}px`,
      borderRadius: `${theme.spacing(1)}px`,
      columnGap: `${theme.spacing(0.5)}px`,
    },
    width: 'max-content',
    transition: 'background cubic-bezier(0.3, 0.55, 0.1, 1) 0.2s',
    outline: 'none',
    cursor: 'pointer',
    background: theme.palette.background.default,

    '&:hover': {
      background: theme.palette.action.hover,
    },
  },

  selected: {
    background: theme.palette.action.hover,
  },

  iconHolder: {
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    gridColumn: '1/2',
    width: 'max-content',
    borderRadius: theme.spacing(1.5),

    display: 'grid',
    placeContent: 'center',

    background: `${theme.palette.type === 'dark' ? theme.palette.action.hover : theme.palette.grey[100]}`,
  },

  navLabel: {
    gridColumn: '2/3',
    letterSpacing: '0.1em',
    fontWeight: 'bolder',
    fontSize: '1.2rem',
    userSelect: 'none',

    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
      fontWeight: 'normal',
    },
  },

  navIcon: {
    fontSize: 'large',
  },

  footer: {
    gridRow: '2/3',
    margin: theme.spacing(3),
    borderRadius: theme.spacing(1.75),
    letterSpacing: '0.1em',
    padding: theme.spacing(3.75, 0),
    background: theme.palette.action.hover,

    display: 'grid',
    gridTemplateRows: 'repeat(2, max-content)',
    rowGap: '8px',
    alignContent: 'center',

    '& a': {
      textDecoration: 'none',
      color: 'rgb(65, 107, 208)',
    },

    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  infoIcon: {
    marginRight: `${theme.spacing(0.7)}px`,
    marginTop: '-2px',
  },

  footerDesc: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, max-content)',
    padding: `${theme.spacing(1)}px`,
  },

  github: {
    display: 'grid',
    placeContent: 'center',
  },

  githubButton: {
    padding: 0,
  },
}));

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

const Nav = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const { section } = useStore();
  const dispatch = useStoreDispatch();

  const switchNavItem = navItem => {
    dispatch({ type: STORE_ACTIONS.UPDATE_SECTION, payload: navItem });
  };

  const checkSelected = value => section === value;

  return (
    <Box className={styles.root}>
      <Box className={styles.navHolder}>
        {navItems.map(({ icon: NavIcon, label, value }) => (
          <Paper
            key={label}
            className={clsx(styles.navItem, checkSelected(value) && styles.selected)}
            tabIndex="0"
            onClick={() => switchNavItem(value)}
            elevation={checkSelected(value) ? 4 : 0}
          >
            <Paper className={styles.iconHolder} elevation={checkSelected(value) ? 1 : 3}>
              <NavIcon className={styles.navIcon} />
            </Paper>
            <Typography variant="subtitle1" color="textPrimary" className={styles.navLabel}>
              {label}
            </Typography>
          </Paper>
        ))}
      </Box>
      <Paper className={styles.footer} elevation={0}>
        <Box className={styles.footerDesc}>
          <InfoIcon fontSize="small" className={styles.infoIcon} />
          Data by&nbsp;
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/AniList/ApiV2-GraphQL-Docs">
            AniList
          </a>
        </Box>
        <Box className={styles.github}>
          <IconButton
            aria-label="github"
            className={styles.githubButton}
            href="https://github.com/gnehcwu/aniday-web"
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default Nav;
