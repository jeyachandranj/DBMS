import React, { useState } from "react";
import ContestForm from "../components/ContestForm";
import ChallengeForm from "../components/ChallengeForm";
import "./ContestPage.css";

const ContestPage = () => {
  const [contestId, setContestId] = useState(null);

  const handleContestCreated = (contest) => {
    setContestId(contest._id);
  };

  return (
    <div className="contest-page">
      {!contestId ? (
        <ContestForm onContestCreated={handleContestCreated} />
      ) : (
        <ChallengeForm contestId={contestId} />
      )}
    </div>
  );
};

export default ContestPage;
