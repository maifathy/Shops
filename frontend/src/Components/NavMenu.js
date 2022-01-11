import React, { useEffect, useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import { removeAuthUser } from '../features/user/userSlice.js';
import { useSelector, useDispatch } from 'react-redux';

const NavMenu = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate('/login');
    }
  }, []);

  const changeActive = useCallback((e) => {
    if(Object.keys(user).length === 0)
      e.preventDefault();
  }, [user]);

  const logout = useCallback(() => {
    dispatch(removeAuthUser());
    navigate('/login');
  }, []);

  return (
      <div>
        { Object.keys(user).length > 0 &&
          <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
                <NavLink to='/Shops/Near' className='nav-link' onClick={(e) => changeActive(e)}>
                  Near Shops
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to='/Shops/Prefered' className='nav-link' onClick={(e) => changeActive(e)}>
                  Prefered Shops
                </NavLink>
            </Nav.Item>
            <span className='ml-5'></span>
            <span className='ml-5'></span>
            <span className='ml-5'></span>
            { Object.keys(user).length > 0 &&
              <div>
                <span>
                  Hello, { user.Name }
                </span>
              </div>
            }
            { Object.keys(user).length > 0 &&
                <span className='logout' onClick={() => logout()}>
                  Logout
                </span>
            }
          </Nav>
        }
      </div>
  )
}

export default NavMenu;
