import client from './client';
import { gql } from '@apollo/client';

const airingQuery = gql`
  query($weekStart: Int, $weekEnd: Int, $page: Int) {
    Page(page: $page, perPage: 1000) {
      pageInfo {
        hasNextPage
        total
      }
      airingSchedules(airingAt_greater: $weekStart, airingAt_lesser: $weekEnd) {
        id
        episode
        airingAt
        media {
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
        }
      }
    }
  }
`;

const getVariables = () => {
  const getSecondsOfMondayOrSunday = isMonday => {
    const date = new Date();
    const day = date.getDay();
    let diff = 0;
    if (isMonday) {
      diff = day * 24 * 60 * 60 * 1000;
    } else {
      diff = (day - 7) * 24 * 60 * 60 * 1000;
    }

    return (new Date(date.getFullYear(), date.getMonth() + 1, date.getDay()).getTime() - diff) / 1000;
  };
  return {
    weekStart: getSecondsOfMondayOrSunday(true),
    weekEnd: getSecondsOfMondayOrSunday(false),
  };
};

const getAiring = () =>
  client.query({
    query: airingQuery,
    variables: getVariables(),
  });

export default getAiring;
