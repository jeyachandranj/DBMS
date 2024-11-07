import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContestForm from "./components/ContestForm";
import ChallengeForm from "./components/ChallengeForm";
import StudentTest from './Pages/StudentTest';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContestForm />} />
        <Route path="/challenge/:contestId" element={<ChallengeForm />} />
        <Route path="/test" element={<StudentTest />} />
      </Routes>
    </Router>
  );
}

export default App;
