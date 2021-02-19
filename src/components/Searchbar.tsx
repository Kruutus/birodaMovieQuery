import React from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import axios from 'axios';

interface Props {
  page: number;
  keyword: string;
  dispatch: React.Dispatch<any>;
}

const Searchbar: React.FC<Props> = ({ page, keyword, dispatch }) => {
  const handleClick = async () => {
    const resp = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: '3997f87ed0640bfe07069b30ae87d509',
        language: 'en-US',
        query: keyword,
        page,
        include_adult: false,
      },
    });

    dispatch({
      movies: resp.data.results,
      open: Array(resp.data.results.length).fill(false),
    });
  };

  return (
    <Grid container spacing={1} justify="center">
      <Grid item xs={6} md={6} lg={6}>
        <TextField
          style={{ width: '75%' }}
          value={keyword}
          variant="outlined"
          onChange={(e) => dispatch({ keyword: e.target.value })}
        />
        <Button
          style={{ width: '25%', height: '100%' }}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Keresés
        </Button>
      </Grid>
    </Grid>
  );
};

export default Searchbar;
