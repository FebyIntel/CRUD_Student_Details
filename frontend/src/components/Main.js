import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';
import './main.css';

function Main() {
  const initialStudent = { _id: null, name: '', email: '', department: '' };
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(initialStudent);
  const [showModal, setShowModal] = useState(false); // State for showing/hiding modal
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login if not logged in
    } else {
      fetchStudents();
    }
  }, [navigate]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({ ...student });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingStudent(initialStudent);
    setShowModal(true); // Show modal when creating new student
  };

  const handleSave = async () => {
    try {
      if (editingStudent._id) {
        await axios.put(`http://localhost:4000/api/students/${editingStudent._id}`, editingStudent, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('http://localhost:4000/api/students', editingStudent, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      setShowModal(false); // Close modal after save
      fetchStudents(); // Refresh students list
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:4000/api/students/${studentId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchStudents(); // Refresh students list
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingStudent({ ...editingStudent, [name]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear login state
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="main-container">
      <h2 style={{ color: 'rgba(255, 255, 255, 0.586)' }}>Student Details</h2>
      <div className="button-container">
        <button onClick={handleCreate} className="create-button">Add New Student</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      <StudentTable students={students} handleEdit={handleEdit} handleDelete={handleDelete} />
      {showModal && (
        <StudentForm
          editingStudent={editingStudent}
          handleChange={handleChange}
          handleSave={handleSave}
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}

export default Main;
