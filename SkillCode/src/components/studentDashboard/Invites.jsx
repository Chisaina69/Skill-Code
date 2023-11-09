import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function AssessmentInvites() {
  const [inviteData, setInviteData] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/SkillCode/students/assessment_invites', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include the access token in the request headers
      },
    })
      .then((response) => response.json())
      .then((data) => setInviteData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleAcceptInvite = (assessmentId) => {
    fetch(`/api/SkillCode/assessments/${assessmentId}/accept_invite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Show an alert when an invite is accepted
        alert(`Invite accepted for assessment: ${assessmentId}`);
        // Remove the accepted invite from the state
        setInviteData((prevInvites) => prevInvites.filter((invite) => invite.assessment_id !== assessmentId));
      })
      .catch((error) => console.error('Error accepting invite:', error));
  };

  const handleDeclineInvite = (assessmentId) => {
    // Implement the logic to decline the invite if needed
    // You can make a DELETE request or handle it based on your backend implementation
    // Example:
    // fetch(`/api/SkillCode/assessments/${assessmentId}/decline_invite`, {
    //   method: 'DELETE',
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //   },
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log(data);
    //   // Handle the response as needed
    // })
    // .catch((error) => console.error('Error declining invite:', error));
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
              onClick={() => handleAcceptInvite(invite.assessment_id)}
              className="mt-2 mr-2 px-4 py-2 bg-orange-500 text-white hover:bg-orange-600"
            >
              Accept
            </button>
            <button
              onClick={() => handleDeclineInvite(invite.assessment_id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white hover:bg-red-600"
            >
              Decline
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssessmentInvites;
