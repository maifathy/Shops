import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.BrowserRouter>
    <App />
  </React.BrowserRouter>
  , document.getElementById('root'));
