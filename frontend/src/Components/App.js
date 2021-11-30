import React from 'react';
import './../App.css';
import Shop from './Shop.js';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Shop shop={{name: 'Mai', isLiked: false, shopId: '61a47f7f3e317fa6634a7de0'}} userId='61a39ce307772a185e4a2024' />
      </div>
    );
  }
}

export default App;
