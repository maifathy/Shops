import React from 'react';
import PropTypes from 'prop-types';
import Shop from './Shop.js'

const Shops = (props) => (
  <div className="App">
    <ol>
      {props.shops.map((shop) =>
        <li key={shop.shopId}>
          <Shop shop={shop} isPreferedPage={props.isPreferedPage} />
        </li>
      )}

    </ol>
  </div>
);
Shops.propTypes = {
  isPreferedPage: PropTypes.bool,
  shops: PropTypes.array
}

export default Shops;
