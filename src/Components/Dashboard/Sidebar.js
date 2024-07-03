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
            <button onClick={() => navigate("/dashboard")} className="nav-link active">Home</button>
            {/* </div> */}
          </div>
          <button className="btn w-100 mt-3" style={{ backgroundColor: "#AB2928", color: "white" }} onClick={() => setShowModal(!showModal)}> Create watchlist</button>
          <div className="mt-3">
            <h5 className='text-dark'>My Lists</h5>
            {/* Add your lists here */}
            {
              watchlists?.length > 0 ? (
                <ul className="nav nav-pills flex-column">
                  {watchlists.map((watchlist, index) => (
                    <li className="nav-item" key={index}>
                      <div className="d-flex justify-content-between">
                        <button className="nav-link" aria-current="page" style={{ color: "black" }} onClick={() => navigate(`/dynamicList/${watchlist.id}`)}>{watchlist.name}</button>
                        {/* <button className='btn btn-md' style={{fontSize: "20px"}} > X </button> */}
                        <button type="button" className="btn-close btn-sm" style={{ fontSize: "12px", marginTop: "12px" }} data-bs-target="#exampleModalToggle" data-bs-toggle="modal" onClick={() => setDeleteWatchListId(watchlist.id)}></button>
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
      <div className={`modal fade ${showModal ? 'show' : ''}`} id="staticCreateWatchList" tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Create WatchList</h1>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-3 col-form-label">WatchList Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="staticWatchList" placeholder='Type here..' value={watchlistName} onChange={e => setWatchlistName(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={() => handleAddWatchlist()}>Create</button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show" onClick={() => setShowModal(false)}></div>}

      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              Are you sure you want to remove the WatchList?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button className="btn btn-danger" data-bs-dismiss="modal" onClick={() => dispatch(deleteWatchlist(deleteWatchListId)) && navigate('/dashboard')}>Yes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Sidebar