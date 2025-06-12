import * as dotevn from "dotenv";
import express from "express";
import cors from "cors";
import OpenAi from "openai";

dotevn.config();
const openai = new OpenAi({
  apiKey: process.env.OPENAI,
});
const app = express();
app.use(cors());
app.use(express.json());
// express does not parse json by default
// cors is middleware that will parse json before every endpoint callback

app.post("/dream", async (req, res) => {
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
  console.log("make art on https://dream-app-m0u7.onrender.com")
);
