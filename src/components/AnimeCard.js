import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Paper, Typography, Chip, IconButton } from '@material-ui/core';
import MoodOutlined from '@material-ui/icons/MoodOutlined';
import { green } from '@material-ui/core/colors';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(theme => ({
  card: {
    height: '210px',
    display: 'grid',
    gridTemplateColumns: '150px auto',
    overflow: 'hidden',
    borderRadius: `${theme.spacing(1)}px`,
    [theme.breakpoints.down('sm')]: {
      borderRadius: `${theme.spacing(2)}px`,
    },
  },

  header: {
    gridColumn: '1/2',
    position: 'relative',
    borderTopLeftRadius: `${theme.spacing(1)}px`,
    borderBottomLeftRadius: `${theme.spacing(1)}px`,
    [theme.breakpoints.down('sm')]: {
      borderTopLeftRadius: `${theme.spacing(2)}px`,
      borderBottomLeftRadius: `${theme.spacing(2)}px`,
    },
    overflow: 'hidden',
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

  description: {
    gridRow: '3/4',
    paddingTop: `${theme.spacing(1)}px`,
    maxHeight: '60px',
    overflow: 'auto',
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',

    '&::-webkit-scrollbar': {
      display: 'none',
    },
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

  schedule: {
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
    columnGap: `${theme.spacing(0.5)}px`,
    alignContent: 'center',
    alignSelf: 'start',
  },
}));

const AnimeCard = ({ anime, episode }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.card} elevation={5}>
      <Box className={styles.header}>
        <img alt="cover" className={styles.cover} src={anime.coverImage.extraLarge} />
        <Box className={styles.overlay}>
          <Typography variant="subtitle2" className={styles.title}>
            {anime.title.native}
          </Typography>
          <Typography variant="caption" className={styles.studio}>
            {anime.studios && anime.studios.nodes[0] && anime.studios.nodes[0].name}
          </Typography>
        </Box>
      </Box>
      <Box className={styles.details}>
        <Box className={styles.conclusion}>
          <Box className={styles.schedule}>
            <Typography variant="caption">Ep {episode}</Typography>
          </Box>
          <Box className={styles.popularity}>
            <MoodOutlined style={{ color: green[500] }} />
            {anime.averageScore ? (
              <Typography variant="subtitle1">{`${anime.averageScore}%`}</Typography>
            ) : null}
          </Box>
        </Box>
        <Box className={styles.resources}>
          <IconButton onClick={() => window.open(anime.siteUrl, '_blank')} size="small">
            <LinkIcon />
          </IconButton>
        </Box>
        <Box className={styles.description}>
          <Typography variant="caption" variantMapping={{ caption: 'p' }} title={anime.description}>
            <span dangerouslySetInnerHTML={{ __html: anime.description || anime.title.native }}></span>
          </Typography>
        </Box>
        <Box className={styles.footer}>
          {anime.genres.slice(0, 2).map(tag => (
            <Chip key={tag} size="small" className={styles.tag} label={tag}></Chip>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default AnimeCard;
