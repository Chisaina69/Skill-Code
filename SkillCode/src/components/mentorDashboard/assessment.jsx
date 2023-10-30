import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    //  fetching assessments from a mock API
    const fetchAssessments = async () => {
      try {
        //  endpoint URL
        const endpoint = 'https://api.mockendpoint.com/assessments'; // Replace this with your actual API endpoint

        // Fetching data
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          setAssessments(data); 
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        
      }
    };

    fetchAssessments(); 
  }, []); 

  return (
    <div className='assessment-search'>
      <input type='text' placeholder='Search assessments...' />
      <ul className='assessment-list'>
        {assessments.map(assessment => (
          <li key={assessment.id}>{assessment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default YourComponent;
