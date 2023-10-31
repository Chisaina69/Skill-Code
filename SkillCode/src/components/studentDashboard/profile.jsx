import React from 'react';

function StudentProfile({ student }) {
  const placeholderImageURL = `https://picsum.photos/200/200?random=${student.id}`; // Generating a random placeholder image
  

  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg">
      <img src={placeholderImageURL} alt={student.name} className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{student.name}</div>
        <p className="text-gray-700 text-base mb-2">{student.major}</p>
        <p className="text-gray-700 text-base mb-2">{student.batch}</p>
        <p className="text-gray-700 text-base">{student.email}</p>
      </div>
    </div>
  );
}

export default StudentProfile;

