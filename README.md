# Peer Review and Collaboration Platform for Students

A full-stack web application for students to collaborate, review each other's work, and provide constructive feedback.

## Features List
- **Authentication**: Role-based access (Teacher and Student) without database dependency
- **Teacher Dashboard**: Create assignments, view all submissions, monitor reviews
- **Student Dashboard**: Submit project files, view deadlines, and see peer feedback
- **Peer Review**: Anonymous double-blind-style (or open depending on setup) peer code review with 1-5 star ratings
- **No Database**: Uses simple JSON files for portable, beginner-friendly data storage

## Tech Stack
- Frontend: HTML5, CSS3 (Vanilla via Custom Styles), JavaScript (Vanilla)
- Backend: Node.js, Express.js
- Data Storage: JSON files (fs module)

## Setup Instructions

1. Ensure you have Node.js installed on your system.
2. Open your terminal and navigate to the `backend` folder:
   ```bash
   cd project/backend
   ```
3. Install the required dependencies:
   ```bash
   npm install express cors
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the app!

## Test Accounts (Pre-configured)
Since actual user registration does not use email verification, we have seeded test variants:

**Teacher Admin:**
- Email: teacher@test.com
- Password: password123

**Students:**
- Email: student1@test.com
- Password: password123
- Email: student2@test.com
- Password: password123
