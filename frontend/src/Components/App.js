import React from 'react';
import './../App.css';
import Shop from './Shop.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Shop shop={{name: 'Mai', isLiked: false}} />
      </div>
    );
  }
}

export default App;
