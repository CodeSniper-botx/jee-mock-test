const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://shubhiajju24_db_user:Shubhi1234@cluster0.ue0pls1.mongodb.net/JEE_MOCK_TEST?retryWrites=true&w=majority")

    .then(() => console.log("MongoDB connected to:", mongoose.connection.name))
    .catch(err => console.log("MongoDB Error:", err));

// Models
const User = require("./models/User");
const Question = require("./models/Question");

// SIGNUP API
app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send({ message: "Signup successful!" });
    } catch (error) {
        res.send({ message: "Error during signup", error });
    }
});

// LOGIN API
app.post("/login", async (req, res) => {
    try {
        const user = await User.findOne(req.body);
        if (user) {
            res.send({ message: "Login successful!" });
        } else {
            res.send({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.send({ message: "Error during login", error });
    }
});

// ADD QUESTION API
app.post("/add-question", async (req, res) => {
    try {
        const q = new Question(req.body);
        await q.save();
        res.send({ message: "Question added!" });
    } catch (error) {
        res.send({ message: "Error adding question", error });
    }
});

// GET ALL QUESTIONS API
app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.send(questions);
    } catch (error) {
        res.send({ message: "Error fetching questions", error });
    }
});

// Start Server
app.listen(5000, () => {
    console.log("Backend running at http://localhost:5000");
});
app.use(express.static("../frontend"));
// GET ALL QUESTIONS API
app.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});
// Submit-Test
app.post("/submit-test", async (req, res) => {
    try {
        const responses = req.body.responses;
        let totalMarks = 0;

        for (const r of responses) {
            const question = await Question.findById(r.questionId);

            if (!question) continue;

            // Not attempted
            if (!r.selected || r.selected === "") {
                totalMarks += 0;
            }
            // Correct answer
            else if (r.selected === question.correctAnswer) {
                totalMarks += 4;
            }
            // Wrong answer
            else {
                totalMarks -= 1;
            }
        }

        res.json({
            message: "Test evaluated",
            score: totalMarks
        });

    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
let results = []; // all students result stored in RAM

app.post("/save-result", (req, res) => {
    const { score } = req.body;
    results.push(score);

    results.sort((a, b) => b - a); // highest first

    const rank = results.indexOf(score) + 1;

    res.send({ rank, total: results.length });
});








