import React, { useState } from 'react';
import axios from 'axios';
import NavBar from './Navbar';

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
            const formattedOptions = question.options.map(option => option.trim()); // Remove extra spaces
            return { ...question, options: formattedOptions };
        });

        try {
            const response = await axios.post('https://skill-code.onrender.com//SkillCode/assessments/create', {
                title: title,
                description: description,
                questions: formattedQuestions
            }, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setMessage(response.data.message);
            setError('');
            resetForm();
            alert('Assessment created successfully!')
        } catch (error) {
            setMessage('');
            setError(error.response?.data?.error || 'An error occurred');
        }
    };

    return (
        <div className='flex'>
            <NavBar />
            <div className='flex-column'>
                <h1 className=' font-medium  font-sans text-lg p-10 py-1 px-10 bg-orange-600 rounded inline-block mt-11 text-white w-full text-center'>Create Assessment</h1>
                {message && <p className='text-center'>{message}</p>}
                {error && <p className='text-orange-500 text-center'>{error}</p>}

                <form className='flex-column' onSubmit={submitForm}>
                    {/* Your form input fields and question mapping logic */}
                    <p>Title</p>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                    <p className='text-primary-color mb-2 flex-column'>Description:</p>
                    <input
                    type='text'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      />
                    {questions.map((question, index) => (
                      <div key={index} className='question-inputs'>
                        <p className='text-primary-color mb-2'>Question {index + 1}:</p>
                        <input
                          type="text"
                          value={question.text_question}
                          name={`text_question_${index}`}
                          onChange={(e) => handleQuestionChange(index, e)}
                          required
                        />
                        <p className='text-primary-color mb-2'>Options:</p>
                        {question.options.map((option, i) => (
                          <input
                            key={i}
                            type="text"
                            value={option}
                            name={`options_${index}_${i}`}
                            onChange={(e) => handleQuestionChange(index, e)}
                            required
                          />
                          ))}
                        <p className='text-primary-color mb-2'>Correct Answer:</p>
                        <input
                          type="text"
                          value={question.correct_answer}
                          name={`correct_answer_${index}`}
                          onChange={(e) => handleQuestionChange(index, e)}
                          required
                  
                        />

                      </div>))}
                    <button type="button" onClick={addQuestion} className="mr-4 bg-blue-950 text-white font-bold m-4 py-2 px-4 rounded">Add Question</button>
                    <span className="mx-2"></span>
                    <button type="submit" className="bg-blue-950 text-white font-bold py-2 px-4 rounded">Publish Assessment</button>
                </form>
            </div>
        </div>
    );
};

export default CreateAssessment;
