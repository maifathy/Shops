import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';

const Shops = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  LikedByUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }]
});

// Shops.plugin(uniqueValidator);
export default mongoose.model('Shops', Shops, 'Shops');
