const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyBnXBNICqdGetk2wh7yR68xm5Frzu-gI88"; // replace with your key

app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateMessage?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: {
            messages: [{ role: "user", content: question }]
          },
          temperature: 0.7,
          candidateCount: 1,
          maxOutputTokens: 256
        })
      }
    );

    const data = await response.json();
    console.log(data);

    const reply = data?.candidates?.[0]?.content?.[0]?.text || "No response from AI";
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.json({ reply: "Error connecting to AI" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});