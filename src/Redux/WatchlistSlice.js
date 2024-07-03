import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    watchlists: [
        {
          id: 1,
          name: 'Sci-Fi Classics',
          movies: [
            {
              id: 101,
              title: 'Blade Runner',
              image: 'https://image.tmdb.org/t/p/original/AtI5X2UkM08XjGGjB3okULwxpRw.jpg',
              description: 'A hacker discovers reality is a simulation.',
              year: 1982,
              genre: 'Sci-Fi',
              watched: false,
              rating: 0,
              review: ''
            },
            {
              id: 102,
              title: 'The Matrix',
              image: 'https://image.tmdb.org/t/p/original/AtI5X2UkM08XjGGjB3okULwxpRw.jpg',
              description: 'A hacker discovers reality is a simulation.',
              year: 1999,
              genre: 'Sci-Fi',
              watched: false,
              rating: 0,
              review: ''
            }
          ]
        }
      ]
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    addWatchlist: (state, action) => {
      state.watchlists.push({ id: Date.now(), name: action.payload, movies: [] });
    },
    deleteWatchlist: (state, action) => {
        // alert(action.payload);
      state.watchlists = state.watchlists.filter(watchlist => watchlist.id !== action.payload);
    },
    addMovie: (state, action) => {
      const { watchlistId, movie } = action.payload;
      const watchlist = state.watchlists.find(w => w.id === watchlistId);
      if (watchlist) {
        watchlist.movies.push(movie);
      }
    },
    deleteMovie: (state, action) => {
      const { watchlistId, movieId } = action.payload;
      const watchlist = state.watchlists.find(w => w.id === watchlistId);
    //   alert(movieId);
      if (watchlist) {
        watchlist.movies = watchlist.movies.filter(movie => movie.id !== movieId);
      }
    },
    editMovie: (state, action) => {
      const { watchlistId, movie } = action.payload;
      const watchlist = state.watchlists.find(w => w.id === watchlistId);
      if (watchlist) {
        const movieIndex = watchlist.movies.findIndex(m => m.id === movie.id);
        if (movieIndex >= 0) {
          watchlist.movies[movieIndex] = movie;
        }
      }
    },
    toggleWatched: (state, action) => {
        const { watchlistId, movieId } = action.payload;
        const watchlist = state.watchlists.find(w => w.id === watchlistId);
        if (watchlist) {
          const movie = watchlist.movies.find(m => m.id === movieId);
          if (movie) {
            movie.watched = !movie.watched;
          }
        }
    },
    rateMovie: (state, action) => {
        const { watchlistId, movieId, rating, review } = action.payload;
        const watchlist = state.watchlists.find(w => w.id === watchlistId);
        if (watchlist) {
          const movie = watchlist.movies.find(m => m.id === movieId);
          if (movie) {
            movie.rating = rating;
            movie.review = review;
          }
        }
    }
  },
});

export const { addWatchlist, deleteWatchlist, addMovie, deleteMovie, editMovie, toggleWatched, rateMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;
