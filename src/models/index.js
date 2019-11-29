import mongoose from 'mongoose';

import User from './user';
import Test from './test';
import Question from './question';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

const models = { User, Test , Question };

export { connectDb };

export default models;
