import React from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'
import MainContent from '../Components/Dashboard/MainContent'

const DashboardPage = () => {
  return (
    <>
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#EAF7FF' }}>
  <div className="sidebar">
    <Sidebar />
  </div>
  <div className="watchlist">
    <MainContent />
  </div>
</div>
    
    </>
  )
}

export default DashboardPage