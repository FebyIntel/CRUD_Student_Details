// src/components/StudentForm.js
import React from 'react';
// import axios from 'axios';
import './studentForm.css'; // Add your CSS for styling the modal

function StudentForm({ editingStudent, handleChange, handleSave, closeModal }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>{editingStudent._id ? 'Edit Student' : 'Create Student'}</h2>
        <form className="student-form" onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={editingStudent.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editingStudent.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          <label>Department:</label>
          <input
            type="text"
            name="department"
            value={editingStudent.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
}

export default StudentForm;
