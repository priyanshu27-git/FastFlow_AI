FastFlow AI - Starter package
=============================
This archive contains a minimal backend (Node/Express) and frontend (Vite + React) starter for FastFlow AI.

How to run backend:
  cd backend
  npm install
  copy .env.example to .env and set AI_API_KEY and FIREBASE_CERT_PATH if using Firestore
  npm run dev

How to run frontend:
  cd frontend
  npm install
  npm run dev

Notes:
- The backend uses an in-memory store for quick testing. To persist tasks, configure Firebase Admin (serviceAccount.json) and the code will try to save to Firestore.
- Set VITE_API_BASE to http://localhost:4000/api when running locally (or your deployed backend URL when hosted).
- Do NOT commit secrets to GitHub.
