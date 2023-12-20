const express = require("express");
const jwt = require("jsonwebtoken");
const { connection } = require("./connection/db");
const bodyParser = require("body-parser");
const authJWT = require("./middlewares/auth.middleware");
const rateLimit = require("express-rate-limit");
const quizRoute = require("./routes/quiz.route");
require("dotenv").config();
const app = express();
// app.use((req, res, next) => {
//     console.log('Incoming request:', req.method, req.url);
//     console.log('Headers:', req.headers);
//     next();
//   });
app.use(bodyParser.json());
app.use(express.json());

const users = [
    { id: 1, username: "haroonhussain97", password: "Haroon007" },
  ];

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = jwt.sign({ userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    res.json({ token });
  });

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/quizzes", rateLimiter);

app.use("/quizzes", authJWT, quizRoute);

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
    console.log("Database is not connected");
  }
  console.log(`Server is running at port ${process.env.PORT}`);
});
