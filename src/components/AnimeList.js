import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box, Paper, Typography, CardMedia, Chip } from '@material-ui/core';
import cover from '../assets/example.png';
import MoodOutlined from '@material-ui/icons/MoodOutlined';
import { green, grey } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    placeContent: 'center',
    padding: theme.spacing(0, 2),
  },

  card: {
    height: '265px',
    width: '525px',
    display: 'grid',
    gridTemplateColumns: '195px auto',
    overflow: 'hidden',
  },

  header: {
    gridColumn: '1/2',
    position: 'relative',
  },

  details: {
    gridColumn: '2/3',
    padding: theme.spacing(2, 2, 0, 2),

    display: 'grid',
    gridTemplateRows: 'max-content max-content auto max-content',
    rowGap: `${theme.spacing(1)}px`,
    color: grey[700],
  },

  cover: {
    height: '265px',
  },

  overlay: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    background: 'rgba(0,0,0,.7)',
    wordBreak: 'break-word',
    padding: theme.spacing(1.5),
    boxSizing: 'border-box',
  },

  title: {
    color: 'white',
    fontWeight: '600',
  },

  studio: {
    color: '#ebb62d',
    fontWeight: '600',
  },

  conclusion: {
    gridRow: '1/2',
    display: 'grid',
    gridTemplateColumns: 'auto 20px',
  },

  resources: {
    gridRow: '2/3',

    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    columnGap: `${theme.spacing(0.85)}px`,
  },

  descr: {
    gridRow: '3/4',
    paddingTop: `${theme.spacing(1)}px`,
  },

  footer: {
    gridRow: '4/5',
    marginTop: 'auto',
    marginLeft: `-${theme.spacing(2)}px`,
    width: '100%',
    padding: theme.spacing(1, 2),
    background: 'rgb(222, 230, 253)',

    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, max-content))',
    columnGap: `${theme.spacing(1)}px`,
  },

  tag: {
    background: '#ebb62d',
    color: 'white',
    fontWeight: '600',
  },

  shcedule: {
    gridColumn: '1/2',
    display: 'grid',
    gridTemplateRows: 'repeat(2, max-content)',
    rowGap: `${theme.spacing(0.5)}px`,
  },

  popularity: {
    gridColumn: '2/3',
    justifySelf: 'end',

    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: theme.spacing(0.5),
    alignContent: 'center',
    alignSelf: 'start',
  },

  popIcon: {
    color: green[85],
  },
}));

const animeList = [{ chips: ['comedy', 'drama', 'sports'] }];

const AnimeList = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Box className={styles.root}>
      {animeList.map((anime, index) => (
        <Paper key={index} className={styles.card} elevation={5}>
          <Box className={styles.header}>
            <CardMedia className={styles.cover} image={cover} />
            <Box className={styles.overlay}>
              <Typography variant="subtitle2" className={styles.title}>
                Haikyuu!! TO THE TOP 2
              </Typography>
              <Typography variant="caption" className={styles.studio}>
                Production I.G
              </Typography>
            </Box>
          </Box>
          <Box className={styles.details}>
            <Box className={styles.conclusion}>
              <Box className={styles.shcedule}>
                <Typography variant="caption">Ep 3 of 24 airing in</Typography>
                <Typography variant="h6">5 days, 2 hours</Typography>
              </Box>
              <Box className={styles.popularity}>
                <MoodOutlined style={{ color: green[500] }} className={styles.popIcon} />
                <Typography variant="subtitle1">78%</Typography>
              </Box>
            </Box>
            <Box className={styles.resources}>
              <LinkIcon />
              <TwitterIcon />
            </Box>
            <Box className={styles.descr}>
              <Typography variant="caption">The second cour of Haikyuu!! TO THE TOP.</Typography>
            </Box>
            <Box className={styles.footer}>
              {anime.chips.map(tag => (
                <Chip key={tag} size="small" className={styles.tag} label={tag}></Chip>
              ))}
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default AnimeList;