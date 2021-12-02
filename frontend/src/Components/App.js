import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//import LoadingBar from 'react-redux-loading';
import { Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './Login.js';
import Shops from './Shops.js';
import NavMenu from './NavMenu.js';
import history from '../utils/history.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  render() {
    return (
      <Router history={history} location={history.location} navigator={history}>
        <Fragment>
          <Routes>
            <Route path='/login' element={<Login />} />
            {this.props.loading === true
              ? <Navigate
                  to={{
                    pathname: '/login',
                    search: '',
                    state: { referrer: window.location.pathname }
                  }}
                />
              :
              <>
                <Route path='/' element={NavMenu} />
                <Route path='/Shops' exact element={
                  <Shops isPreferedPage={false} />
                } />
                <Route path='/Shops/Prefered' exact element={
                  <Shops isPreferedPage={true} />
                } />
              </>
            }
            </Routes>
          </Fragment>
      </Router>
    );
  }
}
App.propTypes = {
  loading: PropTypes.bool
};

export default App;
