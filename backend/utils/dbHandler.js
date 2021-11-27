import mongoose from 'mongoose';

const mongoUtil = {
  connect: (callback) => {
    mongoose.connect(
      'mongodb://localhost:27017/Shops',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false
      }
    ).then(
      () => {
        return callback();
      },
      err => {
        console.error('App starting error:', err.stack);
        process.exit(1);
      }
    );
  }
};

export default mongoUtil;
