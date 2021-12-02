import React from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../features/user/userSlice.js';
import { login } from '../utils/api.js';
import history from '../utils/history.js';

export default class Login extends React.Component{
  constructor() {
    super();
    this.state ={
      username: '',
      password: '',
    }
  }

  setUsername(e){
    this.setState(() =>({
      username: e.target.value
    }));
  }

  setPassword(e){
    this.setState(() =>({
      username: e.target.value
    }));
  }

  async handleSubmit(e){
    e.preventDefault();
    //const user = useSelector((state) => state.user.value);
    const dispatch = useDispatch();
    const userObj = await login(this.state.username, this.state.password);
    if(userObj !== undefined){
      dispatch(setAuthUser(userObj));
      history.push('/Shops');
    }
  }
  render(){
    const { username, password } = this.state;
    return(
      <div className='login_wrapper'>
        <h1>Please Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Username</p>
            <input type='text' onChange={(e) => this.setUsername(e)}/>
          </label>
          <label>
            <p>Password</p>
            <input type='password' onChange={(e) => this.setPassword(e)}/>
          </label>
          <div>
            <button type='submit' disabled={username === '' || password === ''}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
