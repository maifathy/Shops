import mongoose from 'mongoose';
import Point from './geoPoint.js';
// import uniqueValidator from 'mongoose-unique-validator';

const Shops = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  Location: {
    type: Point,
    required: true,
    index: { type: '2dsphere', sparse: false }
  },
  LikedByUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

// Shops.plugin(uniqueValidator);
export default mongoose.model('Shops', Shops, 'Shops');
