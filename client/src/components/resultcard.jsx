import "./resultcard.css";

function ResultCard({ result }) {
  return (
    <div className="result-card">
      <h2>✅ Matching Skills</h2>
      <div className="skills">
        {result.matching.map((skill, index) => (
          <span className="skill good" key={index}>
            {skill}
          </span>
        ))}
      </div>

      <h2>❌ Missing Skills</h2>
      <div className="skills">
        {result.missing.map((skill, index) => (
          <span className="skill bad" key={index}>
            {skill}
          </span>
        ))}
      </div>

      <h2>💡 Suggestions</h2>

      <ul className="suggestion-list">
        {result.suggestion.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ResultCard;