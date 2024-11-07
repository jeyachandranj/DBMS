import React from 'react';
import './Editor.css';

function Editor() {
  return (
    <div className="editor">
      <div className="editor-header">
        <h1>SQL COMPAILER</h1>
      </div>
      <div className="query-container">
        <textarea placeholder="Write your SQL query statement below"></textarea>
      </div>
      <button style={{ 
  padding: '10px 20px', 
  backgroundColor: '#007bff', 
  color: 'white', 
  border: 'none', 
  borderRadius: '5px', 
  cursor: 'pointer', 
  fontSize: '16px' 
}}>
  Execute
</button>
      <div className="table-container">
        <h2>OUTPUT</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>referee_id</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Will</td>
              <td>null</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane</td>
              <td>null</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Alex</td>
              <td>2</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Bill</td>
              <td>null</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Zack</td>
              <td>1</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Mark</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Editor;
