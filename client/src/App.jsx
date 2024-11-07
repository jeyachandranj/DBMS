import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestForm from "./components/ContestForm";
import ChallengeForm from "./components/ChallengeForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestForm />} />
        <Route path="/challenge/:contestId" element={<ChallengeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
