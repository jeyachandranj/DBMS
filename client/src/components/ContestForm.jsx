import React, { useState } from "react";
import axios from "axios";
import "./ContestForm.css";
import { useNavigate } from "react-router-dom";

const ContestForm = () => {
  const [contestData, setContestData] = useState({
    contestName: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/contest/create", contestData);
      navigate(`/challenge/${response.data.contestId}`);
    } catch (error) {
      console.error("Error creating contest:", error);
    }
  };

  return (
    <form className="contest-form" onSubmit={handleSubmit}>
      <h2>Create Contest</h2>

      <label>Contest Name *</label>
      <input
        type="text"
        name="contestName"
        value={contestData.contestName}
        onChange={handleChange}
        required
      />

      <label>Description *</label>
      <textarea
        name="description"
        value={contestData.description}
        onChange={handleChange}
        required
      />

      <label>Start Time *</label>
      <input
        type="datetime-local"
        name="startTime"
        value={contestData.startTime}
        onChange={handleChange}
        required
      />

      <label>End Time *</label>
      <input
        type="datetime-local"
        name="endTime"
        value={contestData.endTime}
        onChange={handleChange}
        required
      />

    

      <button type="submit">Get Started</button>
    </form>
  );
};

export default ContestForm;
