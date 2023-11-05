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
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#15284C', maxWidth: '600px', margin: '0 auto' }}>
            <h1 style={{ color: '#15284C', textAlign: 'center', borderBottom: '2px solid #15284C' }}>Create Assessment</h1>
            {message && <p style={{ color: '#15284C', textAlign: 'center' }}>{message}</p>}
            {error && <p style={{ color: '#faa307', textAlign: 'center' }}>{error}</p>}
            <form onSubmit={submitForm} style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <label style={{ color: '#15284C', marginBottom: '5px' }}>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ borderColor: '#15284C', padding: '8px', backgroundColor: '#fff', color: '#15284C', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                <label style={{ color: '#15284C', marginBottom: '5px' }}>Description:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required style={{ borderColor: '#15284C', padding: '8px', backgroundColor: '#fff', color: '#15284C', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }}></textarea>
                {questions.map((question, index) => (
                    <div key={index} style={{ marginBottom: '20px', width: '100%' }}>
                        <label style={{ color: '#15284C', marginBottom: '5px' }}>Question {index + 1}:</label>
                        <input type="text" value={question.text_question} name={`text_question_${index}`} onChange={(e) => handleQuestionChange(index, e)} required style={{ borderColor: '#15284C', padding: '8px', backgroundColor: '#fff', color: '#15284C', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                        <label style={{ color: '#15284C', marginBottom: '5px' }}>Options:</label>
                        {question.options.map((option, i) => (
                            <input key={i} type="text" value={option} name={`options_${index}_${i}`} onChange={(e) => handleQuestionChange(index, e)} required style={{ borderColor: '#15284C', padding: '8px', backgroundColor: '#fff', color: '#15284C', borderRadius: '5px', width: '100%', boxSizing: 'border-box', marginBottom: '5px' }} />
                        ))}
                        <label style={{ color: '#15284C', marginBottom: '5px' }}>Correct Answer:</label>
                        <input type="text" value={question.correct_answer} name={`correct_answer_${index}`} onChange={(e) => handleQuestionChange(index, e)} required style={{ borderColor: '#15284C', padding: '8px', backgroundColor: '#fff', color: '#15284C', borderRadius: '5px', width: '100%', boxSizing: 'border-box' }} />
                    </div>
                ))}
                <button type="button" onClick={addQuestion} style={{ backgroundColor: '#faa307', color: '#15284C', padding: '8px', border: 'none', cursor: 'pointer', borderRadius: '5px' }}>Add Question</button>
                <button type="submit" style={{ backgroundColor: '#faa307', color: '#15284C', padding: '8px', border: 'none', cursor: 'pointer', borderRadius: '5px', marginTop: '20px' }}>Create Assessment</button>
            </form>


        </div>
    );
};

export default CreateAssessment;
