import * as dotevn from "dotenv";
import OpenAi from "openai";
import express from "express";
import cors from "cors";

dotevn.config();
const openai = new OpenAi({
  apiKey: process.env.OPENAI,
});

const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://rainbow-fenglisu-47934b.netlify.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Must handle OPTIONS requests explicitly:
app.options("*", (req, res) => {
  res.sendStatus(200);
});

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
      .send(error?.response.data.error.message || `Something went wrong.`);
  }
});

app.listen(8080, () =>
  console.log("make art on https://rainbow-fenglisu-47934b.netlify.app")
);
