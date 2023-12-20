const mongoose = require('mongoose');

const QuizSchema = mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      text: { type: String, required: true },
      options: [{ type: String, required: true }],
      rightAnswer: { type: Number, required: true },
    },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  duration: { type: Number, required: true }, 
});

const QuizModel = mongoose.model("Quiz", QuizSchema);

module.exports = {QuizModel};
