import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import {FaUser} from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Register() {
  const USER_REGEX = /^[a-zA-Z][a-zA-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  const [someMessage, setMessage] = useState("");

  const userNameErrMsg =
    "Username must be 4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.";
  const emailErrMsg =
    "Must be a valid Email Address. Existing email address is preffered.";
  const pwdErrMsg =
    "Password must be 8 to 24 characters. Must include upper and lowercase letters, a number and minimum one special character from !@#$%";
  const matchErrMsg =
    "Confirm Password filed must match the first password input field.";

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);


  // To check form fields validity
  const allFormFieldsAreValid = () => {
    const validity =
      validName && validPwd && validEmail && validMatch ? true : false;
    return validity;
  };
  // Update error message status

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  // Setting success and error messages on submit
  // useEffect(() => {
  //   if (isError) setMessage(message);
  //   if (isSuccess || user) {
  //     navigate("/");
  //   }
  // }, [user, isError, isSuccess, message, navigate]);

  // handle register
  useEffect(() => {
    if (isError) {
      setMessage(message)
      setErrMsg(message)
      // toast.error(message)
    }

    if (isSuccess || user) {
      const userRole = {...user}
      if (userRole.roles === 5150)
        navigate('/admindashboard')
      else {
        navigate('/')
      }
      // (userRole.roles === 5150 ? navigate('/admin') : navigate('/'))
    }

    dispatch(reset())
  }, [ user, isError, isSuccess, message, navigate, dispatch])
  // Resetting submit error message
  useEffect(() => {
    if (nameFocus || emailFocus || pwdFocus || matchFocus) setMessage("");
  }, [nameFocus, emailFocus, pwdFocus, matchFocus, message]);

  // to focus on name field initially
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // to validate userName
  useEffect(() => {
    setValidName(USER_REGEX.test(name));
  }, [name]);

  // to validate email
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  // validate password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === password2);
  }, [password, password2]);

  // for invalid name error message
  useEffect(() => {
    nameFocus && !validName && name ? setErrMsg(userNameErrMsg) : setErrMsg("");
  }, [name]);

  // for Invalid email error message
  useEffect(() => {
    emailFocus && !validEmail && email ? setErrMsg(emailErrMsg) : setErrMsg("");
  }, [email]);

  // for invalid passowrd error message
  useEffect(() => {
    pwdFocus && !validPwd && password ? setErrMsg(pwdErrMsg) : setErrMsg("");
  }, [password]);

  // for invalid password match error message
  useEffect(() => {
    matchFocus && !validMatch && password2
      ? setErrMsg(matchErrMsg)
      : setErrMsg("");
  }, [password2]);

  
  // display guiding error messages
  function displayErrorMessage() {
    if (nameFocus && !validName && name) return userNameErrMsg;
    if (emailFocus && !validEmail && email) return emailErrMsg;
    if (pwdFocus && !validPwd && password) return pwdErrMsg;
    if (matchFocus && !validMatch && password2) return matchErrMsg;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage(message);
    // here
    try {
      const userData = {
        name,
        email,
        password,
      };
      if (allFormFieldsAreValid()) {
        dispatch(register(userData));
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setMessage("No Server Response");
      } else if (err.response?.status === 409) {
        // setMessage("Username Taken");
      } else {
        setMessage("Registration Failed");
      }
      // errRef.current.focus();
    }
  };
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1 className="gradient__text">
          <FaUser size={36} color="#AE67FA" />
          Sign Up
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <p
            id="errMsg"
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
            {someMessage}{" "}
          </p>
         
          <div className="form-group">
            <input
              className={validName ? "valid" : "invalid"}
              id={name ? "name" : "idle-name"}
              type="text"
              ref={userRef}
              autoComplete="off"
              name="name"
              value={name}
              placeholder="User name"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="name"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </div>
          <div className="form-group">
            <input
              className={validEmail ? "valid" : "invalid"}
              id={email ? "email" : "idle-email"}
              type="email"
              name="email"
              autoComplete="off"
              value={email}
              placeholder="Email"
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="email"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <div className="form-group">
            <input
              className={validPwd ? "valid" : "invalid"}
              id={password ? "password" : "idle-password"}
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="password"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
          <div className="form-group">
            <input
              className={validMatch ? "valid" : "invalid"}
              id={password2 ? "password2" : "idle-password2"}
              type="password"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="password2"
              onChange={(e) => setPassword2(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </div>
          <p
            id="errMsg"
            className={errMsg ? "errMsg" : "offscreen"}
            aria-live="assertive"
          >
            {" "}
            {displayErrorMessage()}{" "}
          </p>
          <button
            className={
              !validName || !validPwd || !validMatch
                ? "btn-signup"
                : "btn-valid"
            }
          >
            Sign Up
          </button>
          <p className="sign-in">
            Already Registered?{" "}
            <a href="login" className="sign-i">
              <u>Sign In</u>
            </a>{" "}
          </p>
          <p className="terms">
            By signing up you agree to CBE School Fee{" "}
            <a href="#" className="terms-a">
              {" "}
              <u> terms and conditions</u>
            </a>
          </p>
        </form>
      </section>
    </>
  );
}

export default Register;
