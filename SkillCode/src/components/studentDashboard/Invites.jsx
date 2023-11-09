import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AssessmentInvites() {
  const [inviteData, setInviteData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found.');
        return;
      }

      const response = await fetch('https://skill-code.onrender.com/SkillCode/students/assessment_invites', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      setInviteData(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run once when the component mounts

  const acceptAssessmentInvite = async (assessmentId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token not found.');
        return;
      }

      const response = await fetch(`https://skill-code.onrender.com/SkillCode/students/assessments/${assessmentId}/accept_invite`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate(`/Assessment1/${assessmentId}`);
    } catch (error) {
      console.error('Error accepting invite:', error.message);
    }
  };

  return (
    <div className="assessment-invites-container bg-blue-950 text-white p-4">
      <h2 className="text-2xl font-extrabold">Assessment Invites</h2>
      <ul>
        {inviteData.map((invite) => (
          <li key={invite.assessment_id} className="my-4 p-4 bg-blue-950">
            <div className="text-xl font-semibold text-orange-500">
              {invite.assessment_title}
            </div>
            <div className="text-white">Description: {invite.assessment_description}</div>
            <div className="text-white">Mentor: {invite.mentor_name}</div>
            <button
              onClick={() => acceptAssessmentInvite(invite.assessment_id)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            >
              Accept
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssessmentInvites;

