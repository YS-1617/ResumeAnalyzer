import ResumeUpload from "./components/resumeupload";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="main-card">
        <h1>Resume Analyzer</h1>
        <p>Upload your resume and get ATS analysis instantly</p>

        <ResumeUpload />
      </div>
    </div>
  );
}

export default App;