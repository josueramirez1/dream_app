import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import OpenAi from "openai";

dotenv.config();
const openai = new OpenAi({
  apiKey: process.env.OPENAI,
});

const app = express();

app.use(
  cors({
    origin: "https://rainbow-fenglisu-47934b.netlify.app",
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image = aiResponse.data[0].url;
    res.status(200).send({ image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response?.data?.error?.message || `Something went wrong.`);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log("make art on https://rainbow-fenglisu-47934b.netlify.app")
);
