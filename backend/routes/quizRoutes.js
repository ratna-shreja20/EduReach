const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'firstName');
    res.json(quizzes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get quizzes by subject and class
router.get('/:subject/:classLevel', async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      subject: req.params.subject,
      classLevel: req.params.classLevel
    });
    res.json(quizzes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Submit quiz answers
router.post('/submit', auth, async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await Quiz.findById(quizId);
    
    let score = 0;
    const results = quiz.questions.map((question, index) => {
      const isCorrect = question.options[answers[index]].isCorrect;
      if (isCorrect) score++;
      return {
        question: question.questionText,
        selectedOption: question.options[answers[index]].text,
        isCorrect,
        correctAnswer: question.options.find(opt => opt.isCorrect).text,
        explanation: question.explanation
      };
    });

    res.json({
      score,
      total: quiz.questions.length,
      results
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;