import React, { useState } from 'react';
import './NormalizationProcess.css';

const normalizationDetails = [
  {
    title: 'First Normal Form (1NF)',
    content: `First Normal Form (1NF) ensures that each column in a table contains only atomic, indivisible values. It also requires that each record is unique, preventing duplicate rows in the table. This form aims to simplify data by eliminating repeating groups and ensuring that the structure is straightforward. 
    For example, a table with a 'Phone Numbers' column that lists multiple phone numbers separated by commas would not be in 1NF. Splitting these into separate rows or columns ensures atomicity.`,
  },
  {
    title: 'Second Normal Form (2NF)',
    content: `Second Normal Form (2NF) builds on 1NF by ensuring that all non-key attributes are fully functionally dependent on the primary key. This means that data should not depend on just part of a composite primary key but the whole key. 
    For instance, in a table with a composite primary key made up of 'StudentID' and 'CourseID', a column like 'StudentName' depends only on 'StudentID'. This violates 2NF, and to resolve it, the data should be split into separate tables.`,
  },
  {
    title: 'Third Normal Form (3NF)',
    content: `Third Normal Form (3NF) ensures that all the non-key attributes are only dependent on the primary key and not on any other non-key attributes. It eliminates transitive dependencies, which means attributes should not depend on other non-primary key attributes.
    For example, if a 'Course' table has columns 'CourseID', 'CourseName', and 'DepartmentName', and 'DepartmentName' depends on 'DepartmentID' in a different table, this creates a transitive dependency. To meet 3NF, 'DepartmentName' should be moved to a separate table.`,
  },
];

const NormalizationProcess = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div className="normalization-container">
      {normalizationDetails.map((detail, index) => (
        <div key={index} className="normalization-box">
          <h2 onClick={() => toggleExpand(index)} className="normalization-title">
            {detail.title}
          </h2>
          {expandedIndex === index && (
            <p className="normalization-content">{detail.content}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default NormalizationProcess;
