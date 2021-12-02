import React, { useEffect, useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import { Navigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
//import { withRouter } from 'react-router';

const NavMenu = () => {
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    if (user === null) {
      return <Navigate to='/' />
    }
  }, []);

  const changeActive = useCallback((e) => {
    if(user === null)
      e.preventDefault();
  }, [user]);

  const logout = useCallback(() => {
    this.props.removeAuthUser(null);
    return <Navigate
        to={{
          pathname: '/login',
          search: '',
          state: { referrer: window.location.pathname }
        }}
    />
  }, []);

  return (

    <div>
      <Nav variant="tabs" defaultActiveKey="/">
        <Nav.Item>
            <NavLink to='/Shops' className='nav-link' onClick={(e) => changeActive(e)}>
              Near Shops
            </NavLink>
        </Nav.Item>
        <Nav.Item>
            <NavLink to='/Shops/' className='nav-link' onClick={(e) => changeActive(e)}>
              Prefered Shops
            </NavLink>
        </Nav.Item>
        <span className='ml-5'></span>
        <span className='ml-5'></span>
        <span className='ml-5'></span>
        { user !== null &&
          <div>
            <span>
              Hello, { user.name }
            </span>
          </div>
        }
        { user !== null &&
            <span className='logout' onClick={() => logout()}>
              Logout
            </span>
        }
      </Nav>
      <br />
    </div>
  )
}

export default NavMenu;
