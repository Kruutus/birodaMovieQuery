/* eslint-disable object-curly-newline */
import React from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Props } from './MovieList.types';
import useMovieList from './useMovieList';

const MovieList: React.FC<Props> = ({ open, genres, movies, dispatch }) => {
  const { handleOpen, listContainer, chip } = useMovieList({ open, dispatch });
  return (
    <Grid container spacing={1}>
      {movies.length && (
        <Grid item xs={12} md={12} lg={12}>
          <Box width="50%" margin="auto">
            <List dense className={listContainer}>
              {movies.map((movie, index) => (
                <React.Fragment key={movie.poster_path}>
                  <ListItem
                    onClick={() => handleOpen({ title: movie.title, index })}
                  >
                    <ListItemText
                      primary={movie.title}
                      secondary={`${movie.vote_average}/10`}
                    />
                    {movie.genre_ids.map((id: string) => (
                      <Chip
                        color="primary"
                        className={chip}
                        key={id}
                        label={genres.find((genre) => genre.id === id).name}
                      />
                    ))}
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  {open[index] && (
                    <Box padding="1em">Movie Details in Wikipedia</Box>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default React.memo(MovieList);
