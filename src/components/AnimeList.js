import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Chip, IconButton } from '@material-ui/core';
import MoodOutlined from '@material-ui/icons/MoodOutlined';
import { green } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';
import { STORE_ACTIONS, useGlobal, useGlobalDispatch } from '../states/useStore';
import getAiring from '../services/airing';
import Loading from '../components/Loading';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(375px, 100%), 1fr))',
    padding: theme.spacing(1),
    rowGap: `${theme.spacing(5)}px`,
    columnGap: `${theme.spacing(4)}px`,
  },

  card: {
    height: '210px',
    display: 'grid',
    gridTemplateColumns: '150px auto',
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
    rowGap: `${theme.spacing(0.7)}px`,
  },

  cover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    objectFit: 'cover',
  },

  overlay: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    background: 'rgba(0,0,0,.6)',
    wordBreak: 'break-word',
    padding: theme.spacing(1),
    boxSizing: 'border-box',
  },

  title: {
    color: 'white',
    fontWeight: '600',
  },

  studio: {
    color: '#ebb62d',
    fontWeight: '700',
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
    maxHeight: '60px',
    overflow: 'auto',
  },

  footer: {
    gridRow: '4/5',
    marginTop: 'auto',
    marginLeft: `-${theme.spacing(2)}px`,
    width: '100%',
    padding: theme.spacing(0, 0, 1.5, 2),

    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(max-content, 0))',
    columnGap: `${theme.spacing(1)}px`,
  },

  tag: {
    background: 'rgb(65, 107, 208)',
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
}));

const AnimeList = () => {
  const styles = useStyles();
  const { filter, section, isLoading } = useGlobal();
  const [animes, setAnimes] = useState([]);
  const dispatch = useGlobalDispatch();

  useEffect(() => {
    dispatch({ type: STORE_ACTIONS.UPDATE_LOADING_STATUS, payload: { isLoading: true } });
    getAiring()
      .then(result => {
        console.log('executing effect');
        setAnimes(result.data.Page.airingSchedules);
        dispatch({ type: STORE_ACTIONS.UPDATE_LOADING_STATUS, payload: { isLoading: false } });
      })
      .catch(() => {
        dispatch({ type: STORE_ACTIONS.UPDATE_LOADING_STATUS, payload: { isLoading: false } });
      });
  }, [section]);

  const fitlered = animes.filter(item => item.media.genres.some(chip => chip.includes(filter)));

  return isLoading ? (
    <Loading />
  ) : (
    <Box className={styles.root}>
      {fitlered.map(({ airingAt, episode, media: anime }, index) => (
        <Paper key={index} className={styles.card} elevation={5}>
          <Box className={styles.header}>
            <img className={styles.cover} src={anime.coverImage.extraLarge} />
            <Box className={styles.overlay}>
              <Typography variant="subtitle2" className={styles.title}>
                {anime.title.romaji}
              </Typography>
              <Typography variant="caption" className={styles.studio}>
                {anime.studios && anime.studios.nodes[0] && anime.studios.nodes[0].name}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.details}>
            <Box className={styles.conclusion}>
              <Box className={styles.shcedule}>
                <Typography variant="caption">Ep {episode}</Typography>
                {/* <Typography variant="h6">5 days, 2 hours</Typography> */}
              </Box>
              <Box className={styles.popularity}>
                <MoodOutlined style={{ color: green[500] }} />
                <Typography variant="subtitle1">{anime.popularity}%</Typography>
              </Box>
            </Box>
            <Box className={styles.resources}>
              <IconButton onClick={() => window.open(anime.siteUrl, '_blank')} size="small">
                <LinkIcon />
              </IconButton>
            </Box>
            <Box className={styles.descr}>
              <Typography variant="caption" variantMapping={{ caption: 'p' }} title={anime.description}>
                <span dangerouslySetInnerHTML={{ __html: anime.description || anime.title.romaji }}></span>
              </Typography>
            </Box>
            <Box className={styles.footer}>
              {anime.genres.map(tag => (
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
