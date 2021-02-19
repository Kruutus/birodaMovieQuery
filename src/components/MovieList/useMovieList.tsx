/* eslint-disable no-console */
import axios from 'axios';
import { useCallback, useEffect, Dispatch } from 'react';
import { TMDB_URL, TMDB_API_KEY, WIKI_URL } from '@/utils/constants';
import { makeStyles } from '@material-ui/core/styles';

import styles from './MovieList.styles';

const useStyles = makeStyles(styles);

interface Props {
  open: boolean[];
  dispatch: Dispatch<any>;
}

interface returnProps {
  handleOpen: ({ title, index }: any) => void;
  listContainer: string;
  chip: string;
}

export default function useMovieList({ open, dispatch }: Props): returnProps {
  const { listContainer, chip } = useStyles();
  const GetGenres = useCallback(async () => {
    const fetchedGenres = await axios.get(TMDB_URL, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US',
      },
    });
    dispatch({ genres: fetchedGenres.data.genres });
  }, [axios]);

  useEffect(() => {
    GetGenres();
  }, [GetGenres]);

  const SearchWiki = useCallback(
    async ({ title }) => {
      const url = WIKI_URL;
      const resp = await axios.get(url, {
        params: {
          action: 'opensearch',
          search: title,
          limit: 1,
          namespace: 0,
          format: 'json',
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      console.log(resp);
    },
    [axios],
  );

  const handleOpen = useCallback(
    ({ title, index }) => {
      const newArr = [...open];
      const value = newArr[index];
      newArr.splice(index, 1, !value);
      dispatch({ open: newArr });
      if (newArr[index]) SearchWiki({ title });
    },
    [open, dispatch, SearchWiki],
  );

  return { handleOpen, listContainer, chip };
}
