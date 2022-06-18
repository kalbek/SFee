import {Outlet, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

const ProtectUsers = () => {
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
    // console.log(`user: ${user}`)
    // console.log(`user role: ${user.roles}`)
    // let userRole = user.roles;
    // console.log(userRole)
    const userRole = (user ? user.roles : 11111)
    // console.log(`user route protected ${userRole}`)
    // console.log("is loading "+ isLoading)
    // console.log("is Error " + isError)
    // console.log("isSuccess " + isSuccess)
    // console.log("message " + message)

    // useEffect(() => {
    //   console.log(user)
    // }, user)
    // if (user){
    //   const userRole = {...user}
    //   console.log('user detected: '+ user._id)
    //   if (user.roles === '5150') {
    //     console.log('admin role detected.')
    //     {<Navigate to='/admindashboard'/> }
    //     return;
    //   }
    //   else  if (user.roles === '2001' ){
    //     console.log('user role detected.')
    //     {
    //       <Navigate to='/'/> 
    //       return;
    //     }
    //   }
    // }
    // (!user ? console.log('no user ') : console.log("user detected"))


    return (
      <>
        {
          // (user ? <Outlet/> : <Navigate to='/'/>)
           (userRole === 2001 || !user ? <Outlet/> : <Navigate to="/unauthorized" />) 
        }
      </>
  )
}

export default ProtectUsers