import React, { useState } from 'react';
import DatabaseDesign from '../components/DatabaseDesign';
import EntityTypes from '../components/EntityTypes'; // Adjust the path as necessary
import SqlRelationships from '../components/SqlRelationships';
import EntityAttributes from '../components/EntityAttributes';
import NormalizationProcess from '../components/NormalizationProcess.JSX';
import './Project.css';

const topicsWithIcons = [
  { name: 'Database Design', icon: '🗂️' },
  { name: 'Entity', icon: '📋' },
  { name: 'Relationship', icon: '🔗' },
  { name: 'ER Diagram', icon: '🖼️' },
  { name: 'Normalization', icon: '⚙️' },
  { name: 'OOPS', icon: '💻' },
  { name: 'Java', icon: '☕' },
  { name: 'Console Application', icon: '🖥️' },
];

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(topicsWithIcons[0].name);

  const handleNext = () => {
    const currentIndex = topicsWithIcons.findIndex(topic => topic.name === selectedTopic);
    if (currentIndex < topicsWithIcons.length - 1) {
      setSelectedTopic(topicsWithIcons[currentIndex + 1].name);
    }
  };

  const handlePrev = () => {
    const currentIndex = topicsWithIcons.findIndex(topic => topic.name === selectedTopic);
    if (currentIndex > 0) {
      setSelectedTopic(topicsWithIcons[currentIndex - 1].name);
    }
  };

  const renderContent = () => {
    switch (selectedTopic) {
      case 'Database Design':
        return <DatabaseDesign />;
      case 'Entity':
        return <EntityTypes/>
      case 'Relationship':
        return <SqlRelationships/>
      case 'ER Diagram':
        return <EntityAttributes/>
      case 'Normalization':
        return <NormalizationProcess/>
      case 'OOPS':
            return <DatabaseDesign/>
      case 'Java':
            return <SqlRelationships/>
      default:
        return (
          <div className="content-box">
            <h1>{selectedTopic}</h1>
            <pre>{contentMap[selectedTopic]}</pre>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Topics</h2>
        <ul>
          {topicsWithIcons.map((topic, index) => (
            <li
              key={index}
              className={selectedTopic === topic.name ? 'active' : ''}
              onClick={() => setSelectedTopic(topic.name)}
            >
              {topic.icon} {topic.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {renderContent()}
        <div className="navigation-buttons">
          <button
            onClick={handlePrev}
            disabled={topicsWithIcons.findIndex(topic => topic.name === selectedTopic) === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={topicsWithIcons.findIndex(topic => topic.name === selectedTopic) === topicsWithIcons.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
