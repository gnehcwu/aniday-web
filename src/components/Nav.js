import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Paper, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import UpdateIcon from '@material-ui/icons/Update';
import InfoIcon from '@material-ui/icons/Info';
import GitHubIcon from '@material-ui/icons/GitHub';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto max-content',
  },

  navHolder: {
    gridRow: '1/2',
    display: 'grid',
    alignItems: 'center',
    gridTemplateRows: 'repeat(4, max-content)',
    rowGap: '16px',
    paddingLeft: theme.spacing(3.75),
    paddingRight: theme.spacing(12.5),
  },

  navItem: {
    display: 'grid',
    gridTemplateColumns: 'max-content auto',
    alignItems: 'center',
    columnGap: theme.spacing(1.5),
    padding: theme.spacing(1.2, 3.1, 1.2, 1.3),
    width: 'max-content',
    borderRadius: theme.spacing(1.5),
    transition: 'all cubic-bezier(0.3, 0.55, 0.1, 1) 0.2s',
    outline: 'none',
    cursor: 'pointer',

    '&:hover': {
      // background: 'rgb(222, 230, 253)',

      '& $icon': {
        color: 'rgb(65, 107, 208)',
      },
    },

    '&:hover $navLabel': {
      color: 'rgb(65, 107, 208)',
    },

    '&:hover $navIcon': {
      color: 'rgb(65, 107, 208)',
    },
  },

  selected: {
    background: 'rgb(222, 230, 253)',

    '& $navLabel': {
      color: 'rgb(65, 107, 208)',
    },

    '& $navIcon': {
      color: 'rgb(65, 107, 208)',
    },
  },

  iconHolder: {
    padding: theme.spacing(1.1),
    gridColumn: '1/2',
    width: 'max-content',
    borderRadius: theme.spacing(1.5),

    display: 'grid',
    placeContent: 'center',
  },

  navLabel: {
    gridColumn: '2/3',
    letterSpacing: '0.1em',
  },

  navIcon: {
    fontSize: 'large',
  },

  footer: {
    gridRow: '2/3',
    margin: theme.spacing(3),
    borderRadius: theme.spacing(1.75),
    letterSpacing: '0.1em',
    background: 'rgb(222, 230, 253)',
    padding: theme.spacing(3.75, 0),

    display: 'grid',
    gridTemplateRows: 'repeat(2, max-content)',
    rowGap: '8px',
    alignContent: 'center',

    '& a': {
      textDecoration: 'none',
      color: 'rgb(65, 107, 208)',
    },
  },

  infoIcon: {
    marginRight: theme.spacing(0.7),
    marginTop: '-2px',
  },

  footerDesc: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(3, max-content)',
    padding: theme.spacing(1),
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
  },
  {
    icon: AllInboxIcon,
    label: 'Archive',
  },
  {
    icon: UpdateIcon,
    label: 'TBA',
  },
  {
    icon: SettingsIcon,
    label: 'Settings',
  },
];

const Nav = () => {
  const styles = useStyles();
  const [selected, setSelected] = useState('Airing');

  const switchNavItem = current => {
    setSelected(current);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.navHolder}>
        {navItems.map(({ icon: NavIcon, label }) => (
          <Box
            key={label}
            className={clsx(styles.navItem, selected === label && styles.selected)}
            tabIndex="0"
            onClick={() => switchNavItem(label)}
          >
            <Paper className={styles.iconHolder}>
              <NavIcon className={styles.navIcon} />
            </Paper>
            <Typography variant="subtitle1" className={styles.navLabel}>
              {label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box className={styles.footer}>
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
      </Box>
    </Box>
  );
};

export default Nav;
