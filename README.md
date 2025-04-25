# 📚 Study BuddAI - Backend

Welcome to the backend repository for Study BuddAI, our final group project as part of the Northcoders Bootcamp.

Study BuddAI allows users to upload their PDF study notes and generates educational quizzes based on the content using the Gemini AI API. This repository contains the server-side code that powers the application.

## 🚀 Tech Stack

| Technology     | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| **Node.js**    | Backend runtime environment with **TypeScript**                             |
| **Express**    | Web framework for creating RESTful APIs                                     |
| **MySQL**      | Relational database to store user, file, quiz, and question data            |
| **Multer**     | Middleware for handling file uploads                                        |
| **Gemini AI**  | Google's AI model for generating quiz questions from PDF content            |
| **PDF Parse**  | Library for extracting text from PDF files                                  |
| **Jest**       | Testing framework for unit and integration tests                            |
| **Docker**     | Containerization for consistent development and production environments (yet to be implemented)   |
| **AWS**        | Hosting platform for the backend services                                   |

## 💡 Features

- **PDF Upload & Processing**: Upload study materials in PDF format and extract text content
- **Quiz Generation**: Create quizzes with multiple-choice questions using Gemini AI
- **User Management**: Register and authenticate users with secure password handling
- **Quiz Attempts**: Track quiz attempts and calculate scores
- **RESTful API**: Well-structured API endpoints for frontend integration

## 🏗️ Project Structure

```
study-buddai-be/
├── controllers/         # Request handlers for API routes
├── db/                  # Database connection and seed data
│   ├── connection.ts    # Database connection setup
│   ├── seeds/           # Seed scripts for development/testing
│   └── data/            # Test and development data
├── models/              # Database models and queries
├── routes/              # API route definitions
├── services/            # Service layer (PDF parsing, file upload)
├── middleware/          # Custom middleware
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── app.ts               # Express application setup
└── listen.ts            # Server startup
```

## 📋 API Endpoints

| Endpoint                       | Method | Description                                      |
|--------------------------------|--------|--------------------------------------------------|
| `/api/users`                   | POST   | Register a new user                              |
| `/files/upload`                | POST   | Upload a PDF file                                |
| `/api/quizzes`                 | POST   | Create a new quiz                                |
| `/api/quizzes/:user_id`        | GET    | Get all quizzes for a specific user              |
| `/api/questions`               | POST   | Add questions to a quiz                          |
| `/api/questions/:quiz_id`      | GET    | Get all questions for a specific quiz            |
| `/api/question_options`        | POST   | Add answer options for a question                |
| `/api/question_options/:id`    | GET    | Get options for a specific question              |
| `/api/attempt`                 | POST   | Start a quiz attempt                             |
| `/api/attempt/:id/submit`      | GET    | Submit and score a quiz attempt                  |
| `/api/attempt_answer`          | POST   | Save an answer for a question in an attempt      |
| `/api/attempt_answer/:id`      | GET    | Get a saved answer for a question                |
| `/api/generate_quiz`           | POST   | Generate a quiz from PDF content using AI        |

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- Google Gemini API key

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/study-buddai-be.git
   cd study-buddai-be
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following:
   ```
   # Database Configuration
   MYSQL_HOST=localhost
   MYSQL_USER=your_mysql_username
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DATABASE=study_buddai
   
   # Google API
   GOOGLE_API_KEY=your_gemini_api_key
   
   # Server Configuration
   PORT=8080
   NODE_ENV=development
   ```

4. Setup the database:
   ```bash
   npm run setup-db
   npm run compile-seed
   npm run seed
   ```

### Development

Start the development server with hot reload:
```bash
npm run dev
```

### Production

Build and start the production server:
```bash
npm run build
npm start
```

### Docker Setup (yet to be implemented)

1. Build the Docker image:
   ```bash
   docker build -t study-buddai-be .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 -d --name study-buddai-backend study-buddai-be
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run specific tests:
```bash
npm test -- controllers/quizzes_controller.test.ts
```

## 📊 Database Schema

The application uses a MySQL database with the following main tables:

- **users**: User accounts and authentication
- **files**: Uploaded PDF files and extracted text
- **quizzes**: Generated quizzes
- **questions**: Quiz questions
- **questionOptions**: Multiple choice options for questions
- **attempt**: Quiz attempts by users
- **attemptAnswer**: Answers selected during quiz attempts

## 🔄 How Quiz Generation Works

1. User uploads a PDF file with study notes
2. The PDF is processed to extract text content
3. The extracted text is sent to Google's Gemini AI API
4. Gemini AI generates multiple-choice questions based on the content
5. Questions and answers are stored in the database
6. The frontend presents the quiz to the user for completion

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

👥 Contributors
This project was developed as a team and part of the Northcoders Bootcamp with:
 
[emerrafter1](https://github.com/emerrafter1)
[joshnajoshy](https://github.com/joshnajoshy)
[nimashakaranahala ](https://github.com/nimashakaranahala) 
[Jamie145](https://github.com/Jamie145)
