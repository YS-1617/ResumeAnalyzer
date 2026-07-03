# 🚀 AI Resume Optimizer

An AI-powered full-stack web application that analyzes resumes using ATS scoring, extracts skills, identifies missing skills, and provides improvement suggestions using LLM (Groq API).

---

## 📸 Live Demo

🌐 Frontend: https://resume-analyzer-ys17.vercel.app  
⚙️ Backend: https://resume-analyzer-backend-k4ap.onrender.com

---

## 🧠 Features

- 📄 Upload PDF Resume
- 🤖 AI-based Resume Analysis (Groq LLM)
- 📊 ATS Score Calculation
- ✅ Matching Skills Extraction
- ❌ Missing Skills Detection
- 💡 Smart Improvement Suggestions
- 📈 Interactive UI with Score Visualization (Donut Gauge)
- ⚡ Fast backend processing with Node.js

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- Multer (File Upload)
- pdf-parse
- Groq SDK (LLM API)

### Deployment
- Frontend: Vercel
- Backend: Render

---

## 📂 Project Structure
AI-RESUME-OPTIMIZER
│
├── client (Frontend)
│ ├── src
│ ├── components
│ ├── App.jsx
│ └── index.html
│
├── server (Backend)
│ ├── routes
│ │ └── resumeroutes.js
│ ├── server.js
│ ├── db.js
│ └── uploads


---

## ⚙️ How It Works

1. User uploads a PDF resume
2. Backend extracts text using `pdf-parse`
3. AI (Groq LLM) analyzes resume content
4. Response includes:
   - ATS Score
   - Matching Skills
   - Missing Skills
   - Suggestions
5. Frontend displays results visually

---

 📦 Installation (Local Setup)
 Clone repo
 
git clone https://github.com/YS-1617/ResumeAnalyzer.git

Client setup
cd client
npm install
npm run dev

Server setup
cd server
npm install
node server.js

📊 Future Improvements
JWT Authentication
Save resume history (MongoDB)
Download ATS report as PDF
Better analytics dashboard
👨‍💻 Author

Built by YS 🚀
Aspiring Full Stack & AI Developer

⭐ Show your support

If you like this project, give a ⭐ on GitHub!
