import React, { useEffect, useState } from 'react'
import axios from 'axios';

const MainContent = () => {

  const [data, setData] = useState([]);

  const getMoviesData = async () => {
    const response = await axios.get('https://jsonfakery.com/movies/random/4');
    setData(response.data);
    console.log(response);
  }

  useEffect(() => {
    getMoviesData();
  }, [])

  return (
    <div className="p-4 flex-grow-1 text-dark" style={{ maxWidth: "83%" }}>
      <h3>Welcome Back</h3>
      <p>Browse movies, add them to watchlists, and rate and review them. Simply click the <b>+</b> to add a movie, the poster to view details or <b>✔</b> to mark the movie as watched.</p>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Search for movies by title" />
        <button className="btn" type="button" style={{ backgroundColor: "#AB2928", color: "white" }}>Search</button>
      </div>

      <h4 className='mb-3'>Hot Picks: Movies Trending</h4>
      <div className='mb-3'>
        <div className="row">
          {data.map((movie, index) => (
            <div class="col-sm-3 mb-3 mb-sm-0" key={index}>
              <div class="card h-100">
                <img src={`${movie.poster_path}`} class="card-img-top" alt={movie.original_title} style={{ maxHeight: "250px" }} />
                <div class="card-body" style={{ background: "#ededf1" }}>
                  <h5 class="card-title">{movie.original_title}</h5>
                  <div className="d-flex justify-content-between" style={{ fontSize: "20px" }}>
                    <p className="card-year mb-0">{movie.release_date}</p>
                    <p className="card-rating mb-0" style={{ color: "green" }}>{movie.vote_average}/10</p>
                  </div>
                  <button className="btn btn-outline-light">+</button>
                </div>
              </div>
            </div>

            //           <div className="col-md-3 mb-4" key={index}>
            //     <div className="card bg-dark text-light h-100">
            //       <img
            //         src={`${movie.poster_path}`}
            //         className="card-img-top"
            //         style={{ maxHeight: '200px', objectFit: 'cover' }}
            //         alt={movie.title}
            //       />
            //       <div className="card-body">
            //         <h5 className="card-title">{movie.original_title}</h5>
            //         <p className="card-text">{movie.release_date}</p>
            //         <p className="card-text">Rating: {movie.vote_average}/10</p>
            //         {/* Replace the button with your functionality */}
            //         <button className="btn btn-outline-light">+</button>
            //       </div>
            //     </div>
            //   </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MainContent