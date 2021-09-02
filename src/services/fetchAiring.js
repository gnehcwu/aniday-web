import { startOfWeek, endOfWeek, getUnixTime } from 'date-fns';
import fetchClient from './fetchClient';

const query = `query($weekStart: Int, $weekEnd: Int, $page: Int) {
    Page(page: $page) {
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

const getVariables = (page) => {
  const today = new Date();
  return {
    weekStart: getUnixTime(startOfWeek(today)),
    weekEnd: getUnixTime(endOfWeek(today)),
    'page': page
  };
};

const fetchAiring = async (pageIndex = 1) => {
  return await fetchClient(query, getVariables(pageIndex));
};

export default fetchAiring;
