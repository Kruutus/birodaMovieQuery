/* eslint-disable camelcase */

interface genreProps {
  id: string;
  name: string;
}

interface moviesProps {
  poster_path: string;
  title: string;
  vote_average: number;
  genre_ids?: string[];
}

export interface Props {
  open: boolean[];
  genres: genreProps[];
  movies: moviesProps[];
  dispatch: React.Dispatch<any>;
}
