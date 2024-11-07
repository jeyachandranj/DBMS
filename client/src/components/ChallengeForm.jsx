import React, { useState } from "react";
import axios from "axios";
import "./ChallengeForm.css";
import { useParams } from "react-router-dom";

const ChallengeForm = () => {
  const { contestId } = useParams();
  const [file, setFile] = useState(null);
  const [outputFile, setOutputFile] = useState(null);  // For the output CSV file
  const [tableName, setTableName] = useState("");
  const [attributes, setAttributes] = useState("");
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [hints, setHints] = useState("");
  const [tags, setTags] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOutputFileChange = (e) => {
    setOutputFile(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !tableName || !attributes || !question || !description || !outputFile) {
      alert("Please provide all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("tableName", tableName);
    formData.append("attributes", attributes);

    try {
      const response = await axios.post("http://localhost:5000/api/uploadExcel", formData);
      console.log("File uploaded and data inserted:", response.data);

      const outputFormData = new FormData();
      outputFormData.append("tableName", tableName);
      outputFormData.append("attributes", JSON.stringify(attributes));
      outputFormData.append("question", question);
      outputFormData.append("description", description);
      outputFormData.append("hints", hints);
      outputFormData.append("tags", tags);
      outputFormData.append("outputFile", outputFile);  // Attach the file
      
      const respons = await axios.post(
        `http://localhost:5000/api/challenge/${contestId}/createChallenge`,
        outputFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      console.log("Challenge and output data saved:", respons.data);



    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form className="challenge-form" onSubmit={handleSubmit}>
      <h3>Create Callenges</h3>

      <label>Question *</label>
      <input
        type="text"
        name="question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
      />

      <label>Description *</label>
      <input
        type="text"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Hints </label>
      <input
        type="text"
        name="hints"
        value={hints}
        onChange={(e) => setHints(e.target.value)}
      />

      <label>Tags </label>
      <input
        type="text"
        name="tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />


      <label>Table Name *</label>
      <input
        type="text"
        name="tableName"
        value={tableName}
        onChange={(e) => setTableName(e.target.value)}
        required
      />

      <label>Attributes (comma-separated) *</label>
      <input
        type="text"
        name="attributes"
        value={attributes}
        onChange={(e) => setAttributes(e.target.value)}
        placeholder="e.g., name,email,age"
        required
      />

  <label htmlFor="file-input">Upload CSV File *</label>
  <input
    type="file"
    id="file-input"
    accept=".csv"
    onChange={handleFileChange}
    required
  />
  <label className="upload-button" htmlFor="file-input">Choose File</label>

  <label htmlFor="output-file-input">Upload Output CSV File *</label>
  <input
    type="file"
    id="output-file-input"
    accept=".csv"
    onChange={handleOutputFileChange}
    required
  />
  <label className="upload-button" htmlFor="output-file-input">Choose File</label>

      <button type="submit" className="add-button">Upload and Insert Data</button>
    </form>
  );
};

export default ChallengeForm;


