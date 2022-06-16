import React from 'react'


const Register = () => {
  return (
    <>
        <div className="textbox">
            <h1>
                page
            </h1>
            <h2>
                Page helps you connect and share<br/> with the people in your life.
            </h2>
        </div>
        <div className="container">
            <div className="form">
                <input type="text" className="text" placeholder="Enter Your Email or Phone number"> <br/></input>
                <input type="password" className="text" placeholder="Password"><br/></input>
                <button>
                    Log In
                </button>
                <p><a href="">forgot password?</a><br/></p>
                <div className="btn">
                    <button>Create New Account</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register