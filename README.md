# Project Setup - React.js with Vite & Node.js API

This repository contains the backend (Node.js API) and frontend (React + Vite) applications. Follow the steps below to set up and run both servers locally.

## Prerequisites

Before you start, ensure that you have the following installed on your local machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (>= version 14 recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Kaillr/feedback-case-study.git
cd feedback-case-study
```

### 2. Install Backend (Node.js API)

Navigate to the `backend` directory:

```bash
cd backend
```

#### Install Dependencies

Install the required dependencies for the Node.js backend:

```bash
npm install
```
or if you are using Yarn:

```bash
yarn install
```

#### Configure Environment Variables

Make sure to create a `.env` file in the root of the `backend` folder. You can refer to the `.env.example` file and copy it into your own `.env`. Update the necessary environment variables such as database configurations and API keys.

Example:

```conf
PORT = 3000
API_URL = http://localhost:3000

DB_HOST = 127.0.0.1
DB_PORT = 3306
DB_USER = user
DB_PASSWORD = password
DB_NAME = database
```

#### Run the Backend Server

Once you've installed the dependencies and configured your `.env` file, you can run the backend API server:

```bash
npm run start
```
or using Yarn:

```bash
yarn dev
```

The backend API will start running on `http://localhost:3000` (or the port you configured).

### 3. Install Frontend (React + Vite)

Navigate to the `frontend` directory:

```bash
cd ../frontend
```

#### Install Dependencies

Install the required dependencies for the React frontend:

```bash
npm install
```
or using Yarn:

```bash
yarn install
```

#### Configure Environment Variables

Make sure to create a `.env` file in the root of the `frontend` folder. You may refer to `.env.example` for the structure.

Example:

```env
VITE_API_URL=http://localhost:3000
```

#### Run the Frontend Server

Once you've installed the dependencies and configured your `.env` file, you can run the frontend React app:

```bash
npm run dev
```
or using Yarn:

```bash
yarn dev
```

This will start the Vite development server, and you can view the app by navigating to `http://localhost:5173` in your browser (default port).

### 4. Additional Tips

- **Database Setup**: Make sure your database is properly configured before starting the backend. You can refer to the `database.sql` file for the database schema and structure, which provides the necessary tables.
- **CORS Configuration**: If you’re using CORS, ensure that your frontend URL (`http://localhost:5173`) is included in the allowed origins list of your API.