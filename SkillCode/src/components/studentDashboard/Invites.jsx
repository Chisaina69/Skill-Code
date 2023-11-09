import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

function AssessmentInvites() {
  const [inviteData, setInviteData] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Fetch assessment invites
    fetch('api/SkillCode/students/1/assessment_invites') // Replace 123 with the actual student ID
      .then((response) => response.json())
      .then((data) => setInviteData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const acceptAssessmentInvite = (assessmentId) => {
    // Make a POST request to accept the invite
    fetch(`api/SkillCode/students/1/assessments/${assessmentId}/accept_invite`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response from the server
        // Navigate to the assignment page after accepting the invite
        navigate(`/Assessment1/${assessmentId}`);
      })
      .catch((error) => console.error('Error accepting invite:', error));
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
