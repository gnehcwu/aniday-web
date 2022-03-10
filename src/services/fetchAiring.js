import fetchClient from './fetchClient';

const query = `query($weekStart: Int, $weekEnd: Int, $page: Int) {
  Page(page: $page) {
    pageInfo {
      hasNextPage
      total
    }
    airingSchedules(airingAt_greater: $weekStart, airingAt_lesser: $weekEnd) {
      episode
      airingAt
      media {
        title {
          romaji
          native
          english
        }
        status
        season
        genres
        popularity
        episodes
        countryOfOrigin
        averageScore
        siteUrl
        description
        isAdult
        coverImage {
          large
          medium
          color
        }
        trailer {
          site
          thumbnail
        }
        externalLinks {
          site
          url
        }
        studios(isMain: true) {
          nodes {
            name
            siteUrl
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
    page: page,
  };
};

const fetchAiring = async (start, end, pageIndex = 1) => {
  return await fetchClient(query, getVariables(start, end, pageIndex));
};

export default fetchAiring;
