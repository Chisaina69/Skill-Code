import React, { useState } from 'react';
import axios from 'axios';

const CreateAssessment = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ text_question: '', options: ['', '', '', ''], correct_answer: '' }]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const addQuestion = () => {
        setQuestions([...questions, { text_question: '', options: ['', '', '', ''], correct_answer: '' }]);
    };

    const handleQuestionChange = (index, event) => {
        const { name, value } = event.target;
        const updatedQuestions = questions.map((question, qIndex) => {
            if (qIndex !== index) {
                return question;
            }
    
            if (name.startsWith('text_question')) {
                return { ...question, text_question: value };
            } else if (name.startsWith('options')) {
                const optionIndex = parseInt(name.split('_')[2]);
                const updatedOptions = question.options.map((option, oIndex) =>
                    oIndex === optionIndex ? value : option
                );
                return { ...question, options: updatedOptions };
            } else if (name.startsWith('correct_answer')) {
                return { ...question, correct_answer: value };
            } else {
                return question;
            }
        });
    
        setQuestions(updatedQuestions);
    };
    
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setQuestions([{ text_question: '', options: ['', '', '', ''], correct_answer: '' }]);
        setMessage('');
        setError('');
    };
    
    const submitForm = async (event) => {
        event.preventDefault();

        const formattedQuestions = questions.map(question => {
            const formattedOptions = question.options.map(option => option + '*');
            return { ...question, options: formattedOptions };
        });
        
        console.log("formatted",formattedQuestions)
        try {
            const response = await axios.post('http://127.0.0.1:5000/SkillCode/assessments/create', {
                title: title,
                description: description,
                questions: formattedQuestions
            });
    
            setMessage(response.data.message);
            setError('');
            resetForm(); 
        } catch (error) {
            setMessage('');
            setError(error.response?.data?.error || 'An error occurred');
        }
    };
    console.log("title", title)
    console.log("description", description)
    console.log("questions", questions)

    return (
        <div className='student-scores-list'>
  <h1 className='font-medium text-lg p-10 py-1 px-10 bg-orange-600 rounded inline-block mt-11 text-white w-full text-center'>Create Assessment</h1>
  {message && <p className='text-center'>{message}</p>}
  {error && <p className='text-orange-500 text-center'>{error}</p>}
  <form onSubmit={submitForm} className='assessment-form'>
    <label className='text-primary-color mb-2'>Title:</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
      className='input-style'
    />
    <label className='text-primary-color mb-2'>Description:</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      required
      className='input-style'
    ></textarea>
    {questions.map((question, index) => (
      <div key={index} className='question-inputs'>
        <label className='text-primary-color mb-2'>Question {index + 1}:</label>
        <input
          type="text"
          value={question.text_question}
          name={`text_question_${index}`}
          onChange={(e) => handleQuestionChange(index, e)}
          required
          className='input-style'
        />
        <label className='text-primary-color mb-2'>Options:</label>
        {question.options.map((option, i) => (
          <input
            key={i}
            type="text"
            value={option}
            name={`options_${index}_${i}`}
            onChange={(e) => handleQuestionChange(index, e)}
            required
            className='input-style'
          />
        ))}
        <label className='text-primary-color mb-2'>Correct Answer:</label>
        <input
          type="text"
          value={question.correct_answer}
          name={`correct_answer_${index}`}
          onChange={(e) => handleQuestionChange(index, e)}
          required
          className='input-style'
        />
      </div>
    ))}
    <button type="button" onClick={addQuestion} className='button-style'>Add Question</button>
    <button type="submit" className='button-style'>Create Assessment</button>
  </form>
</div>

    );
};

export default CreateAssessment;
