import React, { useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../features/user/userSlice.js';
import { login } from '../utils/api.js';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const message = useRef(null);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    let isMounted = true;
    async function getUser() {
      return await login(username, password);
    }
    e.preventDefault();
    getUser()
    .then((userObj) => {
      if(userObj.status === 200) {
        dispatch(setAuthUser(userObj.user));
        // if(isMounted) setMsg('');
        navigate('/Shops/Near', { replace: true, state: userObj.user });
      } else {
        if(isMounted) setMsg(userObj.message);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [username, password]);

  return(
    <div className='login_wrapper'>
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type='text' onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type='password' onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type='submit' disabled={username === '' || password === ''}>Submit</button>
        </div>
      </form>
      <p>Not a user, <Link to='/signup'>Sign Up Now!</Link></p>
      <p style={{ color: 'red' }} ref={message}>{msg}</p>
    </div>
  )
}

export default Login;
