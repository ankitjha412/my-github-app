import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Callback from "./components/Callback/Callback";
import Dashboard from "./components/Dashboard/Dashboard";
import CommitDetails from "./pages/CommitDetails";
import ReadmeViewer from "./components/Readme/ReadmeViewer";
import SearchPageDetails from "./pages/SeachPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commits/:owner/:repo" element={<CommitDetails/>} />
        <Route path="/readme/:owner/:repo" element={<ReadmeViewer />} /> {/* ✅ New Route */}
        <Route path="/search/:username" element={<SearchPageDetails />} /> {/* ✅ New Route */}



      </Routes>
    </Router>
  );
}

export default App;
