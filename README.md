# GuruCool_Assignment

# ANC Backend Developer Challenge

Welcome to the ANC (Awesome Node.js Challenge) backend developer challenge! This Node.js API provides functionality for managing quizzes with timed questions.

## Table of Contents

- [Overview](#overview)
- [Base URL](#baseurl)
- [Authentication](#authentication)
  - [Login](#login)
- [Endpoints](#endpoints)
  - [Create a Quiz](#create-a-quiz)
  - [Get Active Quiz](#get-active-quiz)
  - [Get Quiz Result](#get-quiz-result)
  - [Get All Quizzes](#get-all-quizzes)
- [Running Locally](#running-locally)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running](#running)

## Overview

The ANC API allows users to create and participate in timed quizzes. It includes features such as quiz creation, fetching the currently active quiz, retrieving quiz results, and listing all quizzes.

## Base URL

The base URL for making requests to this API is:

http://localhost:5000/

## Authentication
To interact with the API, you need to authenticate by obtaining an access token.

Login
POST /login

Request
{
  "username": "example_user",
  "password": "example_password"
}

Response
{
  "token": "YOUR_ACCESS_TOKEN"
}

Create a Quiz
POST /quizzes

Request
{
  "question": "Sample Question",
  "options": ["Option A", "Option B", "Option C"],
  "rightAnswer": 1,
  "startDate": "2023-01-01T12:00:00Z",
  "endDate": "2023-01-01T13:00:00Z"
}

Response
{
  "quizId": "123456",
  "message": "Quiz created successfully."
}

Get Active Quiz
GET /quizzes/active

Response
{
  "quiz": {
    "quizId": "123456",
    "question": "Sample Question",
    "status": "ongoing"
  }
}

Get Quiz Result
GET /quizzes/:id/result


Response
{
  "correctAnswers": [1, 0, 2],
  "additionalInfo": "Additional information if needed"
}

Get All Quizzes
GET /quizzes/all


Response
[
  {
    "quizId": "123456",
    "title": "Quiz Title",
    "startDate": "2023-01-01T12:00:00Z",
    "endDate": "2023-01-01T13:00:00Z",
    "duration": 60,
    "status": "ongoing"
  },
]

Running Locally
 Prerequisites
. Node.js installed
. MongoDB installed and running

Installation
1. Clone the repository: git clone https://github.com/your-username/anc-backend.git
2. Navigate to the project folder: cd anc-backend
3. Install dependencies: npm install

Running
Start the API locally:
npm start

The API will be accessible at http://localhost:5000