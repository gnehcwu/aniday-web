import { useCallback } from 'react';

const useFilterAnime = () => {
  const filterAnime = useCallback((data, filterParam) => {
    if (!filterParam || filterParam === '') return data;
    return data.filter(item => {
      const transform = item.media ? item.media : item;
      let { genres, title, description } = transform;
      return (
        genres.some(genre => genre.includes(filterParam)) ||
        description?.toLowerCase().includes(filterParam) ||
        title.romaji?.toLowerCase().includes(filterParam) ||
        title.native?.toLowerCase().includes(filterParam)
      );
    });
  }, []);

  return filterAnime;
};

export default useFilterAnime;
