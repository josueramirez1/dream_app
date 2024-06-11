import * as dotenv from "dotenv";
dotenv.config();
// access the .env variables that are defined in that file

import OpenAI from "openai";
// variables are used to initialize openAI SDK
// used to make request to openAI

const openai = new OpenAI({
  // This uses the key
  apiKey: process.env.OPENAI,
});

// const openai = new OpenAIApi(configuration);

import express from "express";
import cors from "cors";
// These two are used to make a restful API
// express brings two important features: cors() and express()
// cors is used for security mechanism
// express tells servers that I only want json files

const app = express();
app.use(cors());
app.use(express.json());

// I can start using an endpoint. POST is used because I am creating something
app.post("/dream", async (req, res) => {
  try {
    // I want to access the description that the user is wanting to generate

    const prompt = req.body.prompt;
    // prompt is passed to the generate function using await to wait for open AI to create image
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    //I am given the url back and I need to send it to the user, so use the send function
    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.message || "Something went wrong");
  }
});
// This creates the server
app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
