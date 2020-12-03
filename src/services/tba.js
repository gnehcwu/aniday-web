import client from './client';
import { gql } from '@apollo/client';

const tbaQuery = gql`
  query($format: MediaFormat, $excludeFormat: MediaFormat, $page: Int) {
    Page(page: $page) {
      pageInfo {
        hasNextPage
        total
      }
      media(
        format: $format
        format_not: $excludeFormat
        season: null
        status: NOT_YET_RELEASED
        isAdult: false
        type: ANIME
        sort: TITLE_ROMAJI
      ) {
        id
        idMal
        title {
          romaji
          native
          english
        }
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        status
        season
        format
        genres
        synonyms
        duration
        popularity
        episodes
        source(version: 2)
        countryOfOrigin
        hashtag
        averageScore
        siteUrl
        description
        bannerImage
        isAdult
        coverImage {
          extraLarge
          color
        }
        trailer {
          id
          site
          thumbnail
        }
        externalLinks {
          site
          url
        }
        rankings {
          rank
          type
          season
          allTime
        }
        studios(isMain: true) {
          nodes {
            id
            name
            siteUrl
          }
        }
        relations {
          edges {
            relationType(version: 2)
            node {
              id
              title {
                romaji
                native
                english
              }
              siteUrl
            }
          }
        }
        airingSchedule(notYetAired: true, perPage: 2) {
          nodes {
            episode
            airingAt
          }
        }
      }
    }
  }
`;

const getVariables = () => {
  return {
    format: 'TV',
    page: 1,
  };
};

const getTba = (pageIndex = 1) =>
  client.query({
    query: tbaQuery,
    variables: { ...getVariables(), page: pageIndex },
  });

export default getTba;
