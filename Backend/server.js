// server.js (Ollama version)
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());

// AI Endpoint (Local Ollama)
app.post("/api/ux-buddy", async (req, res) => {
  try {
    const { userMessage } = req.body;

    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: userMessage,
      stream: false
    });

    res.json({ aiReply: response.data.response });
  } catch (error) {
    console.error("Ollama error:", error);
    res.status(500).json({ error: "Local AI failed." });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 UX Buddy (Local AI) running on http://localhost:${PORT}`)
);
