import React from 'react';
import PropTypes from 'prop-types';
export default class Shop extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLiked: false
    }
  }

  doAction = (isLiked) => {
    return isLiked;
  }
  render() {
    const { name, isLiked } = this.props.shop;
    return (
      <div className='box_shop'>
        <p>{name}</p>
        <br />
        <input type='button' className='like_btn' onClick={this.doAction(this.isLiked)} style={{display: isLiked ? 'none' : 'inline' }} value='Like'/>
        <input type='button' className='dislike_btn' onClick={this.doAction(this.isLiked)} style={{display: isLiked ? 'inline' : 'none' }} value='Dislike'/>
      </div>
    );
  }
}

Shop.propTypes = {
  shop: PropTypes.object
};
