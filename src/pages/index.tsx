/* eslint-disable object-curly-newline */
import React from 'react';
import { PageProps } from 'gatsby';
import { Box } from '@material-ui/core';

import Title from '@/components/Title';
import { Searchbar, MovieList } from '@/components';

const initialState = {
  keyword: '',
  movies: [],
  page: 1,
  genres: [],
  open: [],
};

type StateType = typeof initialState;

const reducer = (s: StateType, a: Partial<StateType>) => ({ ...s, ...a });

const Home: React.FC<PageProps> = () => {
  const [{ keyword, movies, page, genres, open }, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  return (
    <Box padding="3em">
      <Title />
      <Searchbar page={page} keyword={keyword} dispatch={dispatch} />
      <MovieList
        genres={genres}
        open={open}
        movies={movies}
        dispatch={dispatch}
      />
    </Box>
  );
};

export default Home;
