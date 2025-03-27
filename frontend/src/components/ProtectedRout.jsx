import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRout = () => {
  return (
    <div>
      let location=useLocation();
      let token=localStorage.getItem("token");
      return token?<Outlet/> : <Navigate to={`/login`}/>
    </div>
  )
}

export default ProtectedRout
