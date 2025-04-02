const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  subject: {
    type: String,
    required: true,
    enum: ['Math', 'Science', 'English', 'History', 'Geography']
  },
  classLevel: {
    type: String,
    required: true,
    enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  },
  questions: [{
    questionText: {
      type: String,
      required: true
    },
    options: [{
      text: {
        type: String,
        required: true
      },
      isCorrect: {
        type: Boolean,
        required: true,
        default: false
      }
    }],
    explanation: {
      type: String
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', QuizSchema);