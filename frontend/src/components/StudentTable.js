// src/components/StudentTable.js
import React from 'react';
import './studentTable.css';

const StudentTable = ({ students, handleEdit, handleDelete }) => {
  return (
    <table className="students-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.department}</td>
            <td>
              <button onClick={() => handleEdit(student)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(student._id)} className="delete-button">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
