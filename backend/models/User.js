import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';
import 'mongoose-schema-types';
import 'mongoose-type-email';
import Point from './geoPoint.js';
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid!';

const Users = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  Email: {
    type: mongoose.SchemaTypes.Email,
    correctTld: true,
    required: [true, 'Email is required'],
    unique: true
  },
  Password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (v) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid password!`
    },
    Location: {
      type: Point,
      index: '2dsphere',
      required: true
    },
    LikedShops: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shops'
    }]
  }
});

export default mongoose.model('Users', Users, 'Users');
