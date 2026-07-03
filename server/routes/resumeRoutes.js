const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Groq = require("groq-sdk");
require("dotenv").config();

const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const domain = req.body.domain;
    const filePath = req.file.path;

    // Read PDF
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    // Prompt
    const prompt = `
You are an ATS Resume Analyzer.

Analyze this resume for ${domain} role.

Return ONLY in this format:

ATS_SCORE: number only

MATCHING_SKILLS:
skill1
skill2
skill3

MISSING_SKILLS:
skill1
skill2
skill3


SUGGESTION: provide 4 short actionable points to improve resume for ${domain} role.
Return exactly 4 points.
Each point must be ONE short sentence only (max 10 words).
Example:
Improve React state management for better frontend architecture.
Learn Docker basics for containerized deployment.
Build AWS deployment projects.
Add CI/CD knowledge to resume.


Resume:
${resumeText}
`;

    // AI response
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const analysis = chatCompletion.choices[0].message.content;

    console.log("AI RAW RESPONSE:\n", analysis);

    // Parse score
    const scoreMatch = analysis.match(/ATS_SCORE:\s*(\d+)/);
    const score = scoreMatch ? Number(scoreMatch[1]) : 0;

    // Parse matching skills
    const matchingSection =
      analysis.split("MATCHING_SKILLS:")[1]?.split("MISSING_SKILLS:")[0] || "";

    const matching = matchingSection
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 10);

    // Parse missing skills
    const missingSection =
      analysis.split("MISSING_SKILLS:")[1]?.split("SUGGESTION:")[0] || "";

    const missing = missingSection
      .split(/[\n,]/)
      .map(item => item.trim())
      .filter(Boolean);
      

    // Parse suggestion
    const suggestionSection =
  analysis.split("SUGGESTION:")[1] || "";

    const suggestion = suggestionSection
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    // Send clean JSON
    res.status(200).json({
      score,
      matching,
      missing,
      suggestion,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      message: "Resume analysis failed",
      error: error.message,
    });
  }
});

module.exports = router;