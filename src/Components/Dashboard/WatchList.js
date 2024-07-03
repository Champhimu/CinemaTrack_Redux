import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, toggleWatched, deleteMovie, editMovie, rateMovie } from '../../Redux/WatchlistSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Watchlist({ movies, watchlistName, watchlistId }) {

  const [deleteMovieId, setDeleteMovieId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showRating, setShowRating] = useState(false);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const showToast = (mssg) => {
    toast.success(mssg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      newestOnTop: false,
      closeOnClick: true,
      rtl: false,
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "light",
    });
  };

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');


  const dispatch = useDispatch();

  const handleDeleteMovie = (movieId) => {
    // alert(id);
    dispatch(deleteMovie({ watchlistId, movieId }));
  };


  const handleOpenEditModal = (movie) => {
    setShowEditModal(!showEditModal)
    setSelectedMovie(movie);
    setTitle(movie.title);
    setImage(movie.image);
    setDescription(movie.description);
    setYear(movie.year);
    setGenre(movie.genre);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const editedMovie = {
      id: selectedMovie.id,
      title,
      image,
      description,
      year,
      genre,
    };
    dispatch(editMovie({ watchlistId, movie: editedMovie }));
    setShowEditModal(false);
    showToast('Movies updated in this watchlist');
    clearForm();
    document.getElementById('exampleModal').click();
  };

  const clearForm = () => {
    setSelectedMovie(null);
    setTitle('');
    setImage('');
    setDescription('');
    setYear('');
    setGenre('');
  };

  const handleReviewModal = (movie) => {
    setRating(movie.rating);
    setReview(movie.review);
    setShowRating(true);
    setDeleteMovieId(movie.id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMovie = { id: Date.now(), title, image, description, year, genre, watched: false, rating: 0, review: '' };
    handleAddMovie(newMovie);
    setShowModal(false);
    showToast('Movies added in this Watchlist');
    clearForm();

  };

  const handleRating = (event) => {
    handleRateMovie(deleteMovieId, rating, review);
    setShowRating(false);
    showToast('Thank you for rating');
    setRating('');
    setReview('');
  }

  const handleToggleWatched = (movieId) => {
    dispatch(toggleWatched({ watchlistId, movieId }));
  };

  const handleRateMovie = (movieId, rating, review) => {
    dispatch(rateMovie({ watchlistId, movieId, rating, review }));
  };

  const handleAddMovie = (movie) => {
    dispatch(addMovie({ watchlistId, movie }));
  };


  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="my-4">{watchlistName}</h1>
          </div>
          <div className="col m-auto d-flex justify-content-end me-5">
            <button className="btn btn-primary" onClick={() => setShowModal(!showModal)}>
              Add Movies
            </button>
          </div>
        </div>
        <div className="row">
          {movies.length === 0 ? (
            <p className="text-center">No movies in your watchlist. Add some!</p>
          ) : (
            movies.map((movie) => (
              <div className="col-sm-3 mb-3" key={movie.id}>
                <div className="card h-100">
                  <img
                    src={movie.poster_path || movie.image || "https://nextlevelpictures.com/wp-content/uploads/Popcorn-drink-and-filmstrip.jpg"}
                    className="card-img-top"
                    alt={movie.title}
                    style={{ maxHeight: "195px" }}
                  />
                  <div className="card-body" style={{ background: "#ededf1" }}>
                    {/* <h5 className="card-title text-center">{movie.title}</h5> */}
                    <strong>{movie.title}</strong> ({movie.year}) - <span class="badge rounded-pill bg-info">{movie.genre}</span>
                    <p>{movie.description}</p>
                    <p>Watched: {movie.watched ? 'Yes' : 'No'}</p>
                    <p>Rating: {movie.rating}</p>
                    <p>Review: {movie.review}</p>
                    <div className="d-flex justify-content-between mt-2 mb-2">
                      <button className="btn btn-secondary btn-sm" onClick={() => handleOpenEditModal(movie)}>Edit</button>
                      <button className="btn btn-danger btn-sm" data-bs-target="#exampleModalToggle1" data-bs-toggle="modal" onClick={() => setDeleteMovieId(movie.id)}>Delete</button>
                    </div>
                    <div className="d-flex justify-content-between mt-2 mb-2">
                      <button className="btn btn-secondary" onClick={() => handleToggleWatched(movie.id)}>
                        Mark as {movie.watched ? 'Unwatched' : 'Watched'}
                      </button>
                      {/* <button className="btn btn-primary me-2" onClick={() => openDeleteModal(watchlist.id, movie)}>Delete</button> */}
                      <button className="btn btn-success" onClick={() => handleReviewModal(movie)}>
                        Rate & Review
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" style={{ display: showEditModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleEditSubmit}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Update Movie
                </h1>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(!showEditModal)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image Link</label>
                  <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">
                    Release Year
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(!showEditModal)}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <div class={`modal fade ${showModal ? 'show' : ''}`} id="addMoviesModal" style={{ display: showModal ? 'block' : 'none' }} tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Add Movie</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(!showModal)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image Link</label>
                  <input type="text" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input type="text" className="form-control" id="year" value={year} onChange={(e) => setYear(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="genre" className="form-label">Genre</label>
                  <input type="text" className="form-control" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" onClick={() => setShowModal(!showModal)}>Close</button>
                <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}


      <div class="modal fade" id="exampleModalToggle1" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to remove from the WatchList?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleDeleteMovie(deleteMovieId)}>Yes</button>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${showRating ? 'show' : ''}`} style={{ display: showRating ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rate and Review Movie</h5>
              <button type="button" className="btn-close" onClick={() => setShowRating(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">Rating</label>
                <select
                  className="form-select"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={1}>1 (Lowest)</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5 (Highest)</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">Review</label>
                <textarea
                  className="form-control"
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowRating(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleRating()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      {showRating && <div className="modal-backdrop fade show" onClick={() => setShowRating(false)}></div>}
    </>
  );
}

export default Watchlist;
