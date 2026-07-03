import { useState } from "react";
import axios from "axios";
import "./resumeupload.css";
import ScoreGauge from "./scoregauge";
import ResultCard from "./resultcard";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload resume");
      return;
    }

    if (!domain) {
      alert("Please select domain");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("domain", domain);

    
    try {
  setLoading(true);

  const response = await axios.post(
    "https://resume-analyzer-backend-k4ap.onrender.com/api/resume/upload",
    formData
  );

  console.log(response.data);

  setScore(response.data.score);

  setResult({
    matching: response.data.matching,
    missing: response.data.missing,
    suggestion: response.data.suggestion
  });

} catch (error) {
  console.log("FULL ERROR:", error);
  alert("Upload failed");
} finally {
  setLoading(false);
}  
};

  return (
    <div className="upload-box">
      <label className="custom-file-upload">
        <input
          type="file"
          accept=".pdf"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file ? file.name : "Choose Resume File"}
      </label>

      <select
        className="dropdown"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      >
        <option value="">Select Domain</option>
        <option value="Software Engineer">Software Engineer</option>
        <option value="Full Stack Developer">Full Stack Developer</option>
        <option value="Machine Learning Engineer">ML Engineer</option>
        <option value="Data Scientist">Data Scientist</option>
      </select>

      <button className="upload-btn" onClick={handleUpload}>
        {loading ? (
          <div className="loader-box">
            <div className="spinner"></div>
            Analyzing...
          </div>
        ) : (
          "Analyze Resume"
        )}
      </button>

      {result && (
        <div className="result-container">
          <ScoreGauge score={score} />
          <ResultCard result={result} />
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;