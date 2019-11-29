import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
  timeLimit: mongoose.Schema.Types.Number,
  answer: { type:String , required: true },
  description: { type:String }
});

const Question = mongoose.model('Question', questionSchema);

export default Question;