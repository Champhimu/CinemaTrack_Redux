import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addWatchlist, deleteWatchlist } from '../../Redux/WatchlistSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const watchlists = useSelector(state => state.watchlist.watchlists);
  const [watchlistName, setWatchlistName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteWatchListId, setDeleteWatchListId] = useState();

  const navigate = useNavigate();

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

  const handleAddWatchlist = () => {
    if (watchlistName) {
      dispatch(addWatchlist(watchlistName));
    }
    setShowModal(false);
    showToast('Watchlist created successfully')
    setWatchlistName('');
  };


  return (
    <>
      <div className="text-light p-3 d-flex flex-column" style={{ maxWidth: "220px", backgroundColor: "", height: "100vh" }}>
        {/* <h2 className="text-danger">Watchlists</h2> */}
        <div>
          <img src='/Images/Logo.png' alt='Logo' style={{ width: "100%", height: "140px" }} />
          {/* <input type="text" className="form-control mb-3" placeholder="Search" /> */}
          <div className="nav nav-pills flex-column">
            {/* <div className='nav-item'> */}
            <a onClick={() => navigate("/dashboard")} className="nav-link active">Home</a>
            {/* </div> */}
          </div>
          <button className="btn w-100 mt-3" style={{ backgroundColor: "#AB2928", color: "white" }} onClick={() => setShowModal(!showModal)}> Create watchlist</button>
          <div className="mt-3">
            <h5 className='text-dark'>My Lists</h5>
            {/* Add your lists here */}
            {
              watchlists?.length > 0 ? (
                <ul class="nav nav-pills flex-column">
                  {watchlists.map((watchlist, index) => (
                    <li className="nav-item" key={index}>
                      <div className="d-flex justify-content-between">
                        <a className="nav-link" aria-current="page" style={{ color: "black" }} href="#" onClick={() => navigate(`/dynamicList/${watchlist.id}`)}>{watchlist.name}</a>
                        {/* <button className='btn btn-md' style={{fontSize: "20px"}} > X </button> */}
                        <button type="button" class="btn-close btn-sm" style={{ fontSize: "12px", marginTop: "12px" }} data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setDeleteWatchListId(watchlist.id)}></button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                null
              )
            }

          </div>
        </div>
        <div className="mt-auto">
          <button className="btn btn-outline-dark w-100">GUEST</button>
        </div>
      </div>

      {/* Adding WatchList Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} id="staticCreateWatchList" tabindex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Create WatchList</h1>
              <button type="button" class="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div class="modal-body">
              <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-3 col-form-label">WatchList Name</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" id="staticWatchList" placeholder='Type here..' value={watchlistName} onChange={e => setWatchlistName(e.target.value)} />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" class="btn btn-primary" onClick={() => handleAddWatchlist()}>Create</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}

      <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              Are you sure you want to remove the WatchList?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-danger" data-bs-dismiss="modal" onClick={() => dispatch(deleteWatchlist(deleteWatchListId)) && navigate('/dashboard')}>Yes</button>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Sidebar