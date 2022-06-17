import React from 'react'
import authSlice from '../features/auth/authSlice'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
    const { roles, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
      );

      useEffect(() => {
        if (roles == 5150)
            Navigate('/Admin')
      },[])
  return (
    <div>VerifyUser</div>
  )
}

export default VerifyUser