const express = require("express");
const router = express.Router();
const QuizModel = require("../models/quiz.model");

function getQuizStatus(quiz) {
  const currentDate = new Date();

  if (currentDate < quiz.startDate) {
    return "not started";
  } else if (currentDate > quiz.endDate) {
    return "ended";
  } else {
    return "ongoing";
  }
}

router.post("/", async (req, res) => {
    const { question, options, rightAnswer, startDate, endDate } = req.body;
  
    if (!question || !options || !rightAnswer || !startDate || !endDate) {
      return res.status(400).json({ message: 'Incomplete data. Please provide question, options, rightAnswer, startDate, and endDate.' });
    }
  
    const quiz = new QuizModel({
      title: "Generated Quiz Title",
      questions: [{
        text: question,
        options: options,
        rightAnswer: rightAnswer,
      }],
      startDate,
      endDate,
      duration: 60, 
    });
  
    try {
      const newQuiz = await quiz.save();
      res.status(201).json(newQuiz);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

router.get("/active", async (req, res) => {
  try {
    const currentDate = new Date();

    const activeQuiz = await QuizModel.findOne({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
    });

    if (!activeQuiz) {
      return res.status(404).json({ message: 'No active quiz found.' });
    }

    let status = "not started";
    if (currentDate >= activeQuiz.startDate && currentDate <= activeQuiz.endDate) {
      status = "ongoing";
    } else if (currentDate > activeQuiz.endDate) {
      status = "ended";
    }

    res.json({
      quiz: activeQuiz,
      status: status,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id/result", async (req, res) => {
  const quizId = req.params.id;

  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    const currentDate = new Date();

    if (currentDate < quiz.endDate) {
      return res.status(400).json({ message: 'The quiz result is not available yet. The quiz has not ended.' });
    }

    const fiveMinutesAfterEnd = new Date(quiz.endDate.getTime() + 5 * 60000); 
    if (currentDate < fiveMinutesAfterEnd) {
      return res.status(400).json({ message: "The quiz result is not available yet. Please wait for at least 5 minutes after the quiz ends." });
    }

    res.json({
      correctAnswers: quiz.questions.map(question => question.rightAnswer),
      additionalInfo: "Additional information if needed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allQuizzes = await QuizModel.find();

    const quizzesWithInfo = allQuizzes.map(quiz => ({
      _id: quiz._id,
      title: quiz.title,
      startDate: quiz.startDate,
      endDate: quiz.endDate,
      duration: quiz.duration,
      status: getQuizStatus(quiz),
    }));

    res.json(quizzesWithInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
