import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectAdmin = () => {
  const { user } = useSelector((state) => state.auth)
    let role;
    if (user)
      role = Object.values(user);
    // console.log('role === 5150' + role[3] === 5150)
    return (
      <>
        
       { 
       !user 
            ? <Navigate to="/login" />
            : user && role[3] === 5150  
                ? <Outlet/> 
                : <Navigate to="/unauthorized" />
           }
         
      </>
  )
}

export default ProtectAdmin