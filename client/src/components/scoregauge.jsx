import "./scoregauge.css";

function ScoreGauge({ score }) {
  const radius = 50;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  let label = "Needs Work";

  if (score >= 80) label = "EXCELLENT";
  else if (score >= 60) label = "GOOD";
  else if (score >= 40) label = "AVERAGE";

  return (
    <div className="gauge-wrapper">
      <div className="donut-container">
        <svg height={radius * 2} width={radius * 2}>
          {/* Background circle */}
          <circle
            stroke="#334155"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />

          {/* Progress circle */}
          <circle
            stroke="#4ade80"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
            }}
          />
        </svg>

        <div className="score-text">{score}</div>
      </div>

      <div className="score-label">{label}</div>
    </div>
  );
}

export default ScoreGauge;