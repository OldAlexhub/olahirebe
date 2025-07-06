# OlaHire Backend

This is the backend for **OlaHire**, an AI-enhanced hiring platform that focuses on fair, contextual, and intelligent applicant-job matching. Built with Node.js, Express, and MongoDB, it powers resume management, job postings, recruiter tools, and integrates with a separate Python microservice for AI scoring and analysis.

---

## 🚀 Core Features

### 👤 Applicants

- Signup/login with secure password handling (bcrypt + JWT)
- Create, update, and delete structured resumes
- Apply to jobs with semantic match scoring (via AI service)
- Track past applications with `match_percent` metadata

### 🧑‍💼 Admins / Recruiters

- Admin signup and login
- Role-based data separation
- Post, retrieve, and delete job listings
- View applicants filtered by company
- Access full applicant profiles and AI insights

### 🤖 AI Integration (via Python service)

Handled on the frontend with calls to `/summarize`, `/extractkeywords`, and `/row-application`.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express
- **Database**: MongoDB via Mongoose
- **Security**: Helmet, CORS, bcrypt, JWT
- **Data Handling**: Express body parser with 32MB limits
- **Env Config**: `dotenv`

---

## 📦 Project Structure

```bash
.
├── server.js
├── routes/
│   └── routes.js
├── controllers/
│   ├── AdminLogin&Signup.js
│   ├── Login&Signup.js
│   ├── Post&GetApplicant.js
│   ├── Post&GetApplications.js
│   └── GetAllJobs.js
├── middleware/
│   └── protectRoute.js
├── models/
│   ├── Admins.js
│   ├── Users.js
│   ├── ApplicantModel.js
│   ├── Applications.js
│   └── Jobs.js
├── db/
│   └── connectToDb.js
├── public/
│   └── index.html

```

## 🔐 Authentication

- Users: JWT-based login (7-day expiration)

- Admins: Separate JWT with role flag (role: "Yes" or "No")

- Middleware: protectRoute.js (currently accepts token as param, can be improved via headers)

## 🔗 RESTful API Overview

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/signup`      | Register applicant       |
| POST   | `/login`       | Login applicant          |
| POST   | `/adminsignup` | Register recruiter/admin |
| POST   | `/adminlogin`  | Login recruiter/admin    |

## 📄 Resume Management

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/applicant`         | Create resume |
| GET    | `/applicant/:userId` | Get resume    |
| PUT    | `/applicant/:userId` | Update resume |
| DELETE | `/applicant/:userId` | Delete resume |

## 🧳 Job Management

| Method | Endpoint                      | Description                 |
| ------ | ----------------------------- | --------------------------- |
| GET    | `/alljobs`                    | Get all job listings        |
| GET    | `/ajob/:job_number`           | Get specific job by ID      |
| POST   | `/postajob`                   | Post a new job (admin only) |
| DELETE | `/deletejob/:job_number`      | Delete job (admin only)     |
| GET    | `/getonecompanyjobs/:company` | Get jobs for one company    |

## 📬 Applications

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/getapps/:userId`           | Get applications for applicant  |
| GET    | `/applicantcompany/:company` | Get all applications to company |

## 🧑‍💼 Admin Info

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/admininfo/:userId` | Get profile of admin by ID |

## 🧠 AI Functionality (External Integration)

Although not handled directly in this Node backend, AI-powered operations are tightly coupled through the frontend:

- /summarize – summarizes structured resume

- /extractkeywords – extracts key terms from experience

- /row-application – used for semantic scoring between resume and job description

- These hit a separate Python API (see REACT_APP_BASE_PYTHON on frontend).

## 🧪 Improvements Suggested

- Middleware: Move token check from req.params to Authorization header

- Add validation and error boundaries for all required fields

- Add request logging (e.g. with morgan)

- Add PATCH support for partial resume edits

- Create separate admin middleware

## 🧑 Author

**_Mohamed Gad_**

## 📄 License

MIT — free to use, fork, improve.

“Ethical hiring isn’t a feature — it’s a foundation.”
