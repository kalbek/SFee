import {Outlet, Navigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectAdmin = () => {
    const { user } = useSelector((state) => state.auth)
    // console.log(`user: ${user}`)
    // console.log(`user role: ${user.roles}`)
    // let userRole = user.roles;
    // console.log(userRole)
    const userRole = (user ? user.roles : 5555)
    console.log(`admin route protected`)
    
    return (
      <>
        { 
          // if user does not come from register page

          (userRole === 5150 || !user  ? <Outlet/> : <Navigate to="/unauthorized" />)
         }
      </>
  )
}

export default ProtectAdmin