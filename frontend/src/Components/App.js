import React, { Fragment, useEffect } from 'react';
//import LoadingBar from 'react-redux-loading';
import { userLoading } from '../features/user/userSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login.js';
import SignUp from './SignUp.js';
import Shops from './Shops.js';
import NavMenu from './NavMenu.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

const NotFound = () => {
  return (
    <h1> Not Found :(</h1>
  )
}
const App = () => {
  /* componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  } */
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const navigate = useNavigate();

  useEffect(() => {
      dispatch(userLoading());
      console.log('first run');
  }, []);

  useEffect(() => {
    console.log('loading: ', loading);
    if(loading === 'pending') {
      navigate('/login');
      console.log('pending, redirect');
    } else {
      navigate('/Shops/Near');
    }
  }, [loading]);

  return (
    <>
    <NavMenu />
    <Routes>
      <Route path="*" element={<NotFound />} />
      { loading === 'pending'
        ?
        <>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </>
        :
        <>
            <Route path='/Shops/Near' exact element={
              <Shops key='NearShops' isPreferedPage={false} />
            } />
            <Route path='/Shops/Prefered' element={
              <Shops key='PreferedShops' isPreferedPage={true} />
            } />
        </>
      }
    </Routes>
    </>
  );
}
export default App;
