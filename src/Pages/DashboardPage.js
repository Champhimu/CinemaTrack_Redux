import React from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'
import MainContent from '../Components/Dashboard/MainContent'

const DashboardPage = () => {
  return (
    <>
    <div className="d-flex" style={{ height: '100vh', backgroundColor: '#EAF7FF' }}>
      <Sidebar />
      <MainContent />
    </div>
    
    </>
  )
}

export default DashboardPage