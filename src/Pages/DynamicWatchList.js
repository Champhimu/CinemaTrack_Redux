import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Dashboard/Sidebar';
import Watchlist from '../Components/Dashboard/WatchList';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DynamicWatchList = () => {
  const { id } = useParams();
  const watchlists = useSelector((state) => state.watchlist.watchlists)
  const existingWatchlist = watchlists.filter(f => f.id === Number(id));

  console.log(id);
  console.log(existingWatchlist);

  const [movies, setMovies] = useState([])
  const [watchlistName, setWatchlistName] = useState('');
  const [watchlistId, setWatchlistId] = useState();

  useEffect(() => {
    setMovies(existingWatchlist[0].movies);
    setWatchlistName(existingWatchlist[0].name);
    setWatchlistId(existingWatchlist[0].id)
  }, [existingWatchlist])

  return (
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#EAF7FF' }}>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="watchlist">
        <Watchlist movies={movies} watchlistName={watchlistName} watchlistId={watchlistId} />
      </div>
    </div>
  )
}

export default DynamicWatchList