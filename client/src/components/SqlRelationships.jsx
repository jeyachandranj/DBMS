import React, { useState } from 'react';
import './SqlRelationships.css';

const relationshipDescriptions = [
  {
    title: 'One-to-One Relationship',
    content: `Each record in Table A is associated with one and only one record in Table B, and vice versa.
    Example: A users table and a user_profiles table, where each user has a single corresponding profile.
    SQL Example:
    CREATE TABLE users (
      user_id INT PRIMARY KEY,
      username VARCHAR(50)
    );
    CREATE TABLE user_profiles (
      profile_id INT PRIMARY KEY,
      user_id INT UNIQUE,
      profile_data VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
  },
  {
    title: 'One-to-Many Relationship',
    content: `Each record in Table A can be associated with multiple records in Table B, but each record in Table B is associated with only one record in Table A.
    Example: A departments table and an employees table, where each department has multiple employees.
    SQL Example:
    CREATE TABLE departments (
      department_id INT PRIMARY KEY,
      department_name VARCHAR(50)
    );
    CREATE TABLE employees (
      employee_id INT PRIMARY KEY,
      employee_name VARCHAR(50),
      department_id INT,
      FOREIGN KEY (department_id) REFERENCES departments(department_id)
    );`,
  },
  {
    title: 'Many-to-Many Relationship',
    content: `Each record in Table A can be associated with multiple records in Table B, and vice versa.
    Example: A students table and a courses table, where each student can enroll in multiple courses, and each course can have multiple students.
    SQL Example:
    CREATE TABLE students (
      student_id INT PRIMARY KEY,
      student_name VARCHAR(50)
    );
    CREATE TABLE courses (
      course_id INT PRIMARY KEY,
      course_name VARCHAR(50)
    );
    CREATE TABLE student_courses (
      student_id INT,
      course_id INT,
      PRIMARY KEY (student_id, course_id),
      FOREIGN KEY (student_id) REFERENCES students(student_id),
      FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );`,
  },
];

const SqlRelationships = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % relationshipDescriptions.length);
  };

  return (
    <div className="relationship-container">
      <div className="relationship-box">
        <h2>{relationshipDescriptions[currentIndex].title}</h2>
        <pre>{relationshipDescriptions[currentIndex].content}</pre>
      </div>
      <button className="next-button" onClick={handleNext}>Next</button>
    </div>
  );
};

export default SqlRelationships;
