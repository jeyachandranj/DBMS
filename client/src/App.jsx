import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestForm from "./components/ContestForm";
import ChallengeForm from "./components/ChallengeForm";
import StudentTest from './Pages/StudentTest';
import Project from "./Pages/Project"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestForm />} />
        <Route path="/challenge/:contestId" element={<ChallengeForm />} />
        <Route path="/test" element={<StudentTest />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;
