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

const getVariables = (start, end, page) => {
  return {
    weekStart: start,
    weekEnd: end,
    page: page
  };
};

const fetchAiring = async (start, end, pageIndex = 1) => {
  return await fetchClient(query, getVariables(start, end, pageIndex));
};

export default fetchAiring;
