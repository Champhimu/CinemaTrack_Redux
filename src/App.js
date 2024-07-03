import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import DashboardPage from './Pages/DashboardPage';
import DynamicWatchList from './Pages/DynamicWatchList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/dynamicList/:id' element={<DynamicWatchList />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
