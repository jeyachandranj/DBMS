import React, { useState } from 'react';
import './EntityTypes.css';

const entityDescriptions = [
  {
    title: 'Tangible Entity',
    content: `A tangible entity is a physical object or a physical thing that can be physically touched, seen, or measured. 
    It has a physical existence or can be seen directly. Examples include physical products like "inventory items" or people such as customers or employees.`,
  },
  {
    title: 'Intangible Entity',
    content: `Intangible entities are abstract or conceptual objects that are not physically present but have meaning in the database. 
    They are defined by attributes that aren't directly visible, such as "Product Categories" or "Service Types".`,
  },
  {
    title: 'Entity Types in DBMS',
    content: `Strong Entity Types exist independently and have unique identifiers. Weak Entity Types depend on other entities and do not have unique identifiers on their own.`,
  },
];

const EntityTypes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < entityDescriptions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="entity-container">
      {entityDescriptions.slice(0, currentIndex + 1).map((desc, index) => (
        <div key={index} className="entity-box">
          <h2>{desc.title}</h2>
          <p>{desc.content}</p>
        </div>
      ))}
      {currentIndex < entityDescriptions.length - 1 && (
        <button className="next-button" onClick={handleNext}>Next</button>
      )}
    </div>
  );
};

export default EntityTypes;
