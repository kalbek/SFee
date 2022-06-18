import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectUsers = () => {
  const { user } = useSelector((state) => state.auth)
  let role;
  if (user)
    role = Object.values(user);
  // console.log('role === 2001: ' + role[3] === 2001)
  return (
    <>
      { 
        !user 
        ? <Navigate to="/login" />
        : user && role[3] === 2001  
            ? <Outlet/> 
            : <Navigate to="/unauthorized" />
       }
    </>
  )
}

export default ProtectUsers