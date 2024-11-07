import React from 'react';
import './DatabaseDesign.css';

const DatabaseDesign = () => {
  return (
    <div className="database-design-container">
      <h1>Database Design</h1>
      <div className="content-box">
        <p><strong>Primary Terminologies Used in Database Design</strong></p>
        <ul>
          <li><strong>Redundancy:</strong> Refers to duplicity of the data. For example, in a banking system, we may need to prevent redundancy strictly.</li>
          <li><strong>Schema:</strong> A logical container defining the structure and managing the organization of data.</li>
          <li><strong>Records/Tuples:</strong> The storage location of data inside a table.</li>
          <li><strong>Indexing:</strong> A data structure technique to enable efficient data retrieval.</li>
          <li><strong>Data Integrity & Consistency:</strong> Integrity ensures the quality of data, and consistency ensures its correctness.</li>
          <li><strong>Data Models:</strong> Visual techniques to showcase data and relationships, e.g., Relational, Network, Hierarchical models.</li>
          <li><strong>Normalization:</strong> Organizing data to reduce redundancy and dependency.</li>
          <li><strong>Functional Dependency:</strong> A relationship where the value of one attribute depends on another, e.g., {`{A -> B}`}</li>
          <li><strong>Transaction:</strong> A single logical unit of work that must satisfy ACID or BASE properties.</li>
          <li><strong>Schedule:</strong> The sequence of transactions executed.</li>
          <li><strong>Concurrency:</strong> Multiple transactions operating simultaneously without conflicts.</li>
          <li><strong>Constraints:</strong> Rules applied to table fields, e.g., NOT NULL, UNIQUE, CHECK.</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseDesign;
