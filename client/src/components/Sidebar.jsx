import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>SQL Schema</h2>

      {/* Question Name Section */}
      <div className="question-name">
        <h3>Question Name</h3>
        <p>Customer Table Structure</p>
      </div>

      {/* Description Section */}
      <div className="description">
        <h3>Description</h3>
        <p>This is a sample SQL schema for the Customer table, containing basic columns like id, name, and referee_id.</p>
      </div>

      {/* Table Section */}
      <div className="schema">
        <h3>Table: Customer</h3>
        <table>
          <thead>
            <tr>
              <th>Column Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>int</td>
            </tr>
            <tr>
              <td>name</td>
              <td>varchar</td>
            </tr>
            <tr>
              <td>referee_id</td>
              <td>int</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Hint Section */}
      <div className="hint">
        <h3>Hint</h3>
        <p>Ensure that the id is a unique identifier for each customer and that referee_id refers to another customer.</p>
      </div>

      {/* Tags Section */}
      <div className="tags">
        <h3>Tags</h3>
        <p>#SQL #Database #Customer #Schema</p>
      </div>
    </div>
  );
}

export default Sidebar;
