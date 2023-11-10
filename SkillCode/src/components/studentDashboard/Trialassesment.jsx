import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import TopBar from '../topbar';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

function Trials() {
  const initialQuestions = [
    { id: 1, question: 'Write a function to add two numbers.', expectedAnswer: 'function add(a, b) { return a + b; }' },
    { id: 2, question: 'Write a function to multiply two numbers.', expectedAnswer: 'function multiply(a, b) { return a * b; }' },
    { id: 3, question: 'Write a function to find the maximum of two numbers.', expectedAnswer: 'function findMax(a, b) { return a > b ? a : b; }' },
    { id: 4, question: 'Write a function to find the minimum of two numbers.', expectedAnswer: 'function findMin(a, b) { return a < b ? a : b; }' },
    { id: 5, question: 'Write a function to calculate the square of a number.', expectedAnswer: 'function square(a) { return a * a; }' },
  ];

  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(''));
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (timer !== null && timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerInterval);
    } else if (timer === 0) {
      setFeedback('Time is up! Please submit your answer.');
    }
  }, [timer]);

  const startTimer = () => {
    setTimer(300); // 5 minutes
  };

  const handleAnswerSubmit = () => {
    if (selectedQuestion === null) {
      return;
    }

    // Check if the answer is empty
    const submittedAnswer = userAnswers[selectedQuestion].trim();
    if (submittedAnswer === '') {
      setFeedback('Please enter your answer before submitting.');
      return;
    }

    // Evaluate the submitted answer
    const expectedAnswer = questions[selectedQuestion].expectedAnswer;

    try {
      const evalResult = eval(`(function() { return ${submittedAnswer}; })()`);

      // Check if the result matches the expected answer
      if (evalResult === eval(expectedAnswer)) {
        setFeedback('Correct! Moving to the next question.');
        setUserAnswers(userAnswers.map((answer, index) => (index === selectedQuestion ? '' : answer)));

        // Move to the next set of questions
        if (selectedQuestion === 4) {
          const nextQuestions = [
            { id: 6, question: 'Write a function to calculate the factorial of a number.', expectedAnswer: 'function factorial(n) { if (n <= 1) return 1; return n * factorial(n - 1); }' },
            { id: 7, question: 'Write a function to check if a number is even.', expectedAnswer: 'function isEven(n) { return n % 2 === 0; }' },
            { id: 8, question: 'Write a function to check if a number is prime.', expectedAnswer: 'function isPrime(n) { if (n <= 1) return false; if (n <= 3) return true; if (n % 2 === 0 || n % 3 === 0) return false; let i = 5; while (i * i <= n) { if (n % i === 0 || n % (i + 2) === 0) return false; i += 6; } return true; }' },
            { id: 9, question: 'Write a function to reverse a string.', expectedAnswer: 'function reverseString(str) { return str.split("").reverse().join(""); }' },
            { id: 10, question: 'Write a function to find the sum of an array of numbers.', expectedAnswer: 'function sumArray(arr) { return arr.reduce((acc, current) => acc + current, 0); }' },
          ];
          setQuestions(nextQuestions);
        }

        const nextQuestion = selectedQuestion + 1;
        setSelectedQuestion(nextQuestion < questions.length ? nextQuestion : null);
        setTimer(null);
      } else {
        setFeedback('Incorrect! Please try again.');
      }
    } catch (error) {
      setFeedback('Code execution error. Please check your code.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-orange-400 to-blue-600 p-4">
      <TopBar />
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-600">Coding Challenges</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-orange-600">Questions</h3>
            <ul>
              {questions.map((question, index) => (
                <li key={question.id}>
                  <button
                    className={`text-blue-500 hover:underline ${selectedQuestion === index ? 'font-semibold' : ''}`}
                    onClick={() => {
                      setSelectedQuestion(index);
                      startTimer();
                    }}
                    disabled={(index >= 5 && !feedback.includes('Correct')) || (index === selectedQuestion && feedback.includes('Correct'))}
                  >
                    Question {question.id}: {question.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {selectedQuestion !== null && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-600">
                  Question {selectedQuestion + 1}:
                </h3>
                <p className="text-gray-700">
                  {questions[selectedQuestion].question}
                </p>
                <AceEditor
                  mode="javascript"
                  theme="monokai"
                  value={userAnswers[selectedQuestion]}
                  onChange={(value) =>
                    setUserAnswers(userAnswers.map((answer, index) =>
                      index === selectedQuestion ? value : answer
                    ))
                  }
                  editorProps={{ $blockScrolling: true }}
                  style={{ width: '100%', height: '200px' }}
                />
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleAnswerSubmit}
                >
                  Submit Answer
                </button>
              </div>
            )}
          </div>
        </div>
        {feedback && (
          <div className={`text-white ${feedback.includes('Correct') ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-lg mt-4`}>
            {feedback}
          </div>
        )}
        {timer !== null && (
          <div className="bg-orange-500 text-white px-4 py-1 rounded-lg mt-4">
            Timer: {timer} seconds
          </div>
        )}
      </div>
    </div>
  );
}

export default Trials;




