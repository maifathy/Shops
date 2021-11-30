import React from 'react';
import PropTypes from 'prop-types';
import { likeShop, dislikeShop } from '../utils/api.js';

export default class Shop extends React.Component{
  constructor(props){
    super(props);
    this.doAction = this.doAction.bind(this);
    this.message = React.createRef();
    this.state = {
      isPrefered: false,
      isLikePage: true
    }
  }

  async doAction (isLiked, shopId, userId){
    let response;
    if(isLiked){
      response = await likeShop(shopId, userId);
    } else {
      response = await dislikeShop(shopId, userId);
    }
    if(response.status === 200){
      this.setState(() => ({
        isPrefered: !isLiked
      }))
    } else {
      this.message.current.innerHTML = 'An error occurred, please try again';
    }
  }

  render() {
    const { name, isLiked, shopId } = this.props.shop;
    const { userId } = this.props;
    const { isPrefered, isLikePage } = this.state;
    return (
      <div>
        <p ref={this.message}></p>
        { !isPrefered && isLikePage &&
          <div className='box_shop'>
            <p>{name}</p>
            <br />
            <input type='button' className='like_btn' onClick={() => this.doAction(!isLiked, shopId, userId)} style={{display: isLiked ? 'none' : 'inline' }} value='Like'/>
            <input type='button' className='dislike_btn' onClick={() => this.doAction(isLiked, shopId, userId)} style={{display: isLiked ? 'inline' : 'none' }} value='Dislike'/>
          </div>
        }
      </div>
    );
  }
}

Shop.propTypes = {
  shop: PropTypes.object,
  userId: PropTypes.string
};
