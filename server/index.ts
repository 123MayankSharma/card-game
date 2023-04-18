import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

const redis: Redis = new Redis(process.env.REDIS_KEY as string);

const transform = (userScoresArray: Array<string>) => {
  const tempArray = [];

  for (let counter = 0; counter < userScoresArray.length - 1; counter += 2) {
    tempArray.push({
      username: userScoresArray[counter],
      score: parseInt(userScoresArray[counter + 1]),
    });
  }

  return tempArray;
};
app.post("/score", async (req: Request, res: Response) => {
  try {
    const { username, score } = req.body;
    const val = await redis.zscore("userScores", username);
    if (val === null || val! < score) {
      await redis.zadd("userScores", score, username);
      const rank = await redis.zrevrank("userScores", username);
      return res.status(200).json({ username: username, rank: rank });
    }
    return res.status(200).json({ Status: "Success" });
  } catch (err) {
    return res.status(500).json({ err: "error..." });
  }
});

app.get("/leaderboard", async (req: Request, res: Response) => {
  try {
    const userScoresArray = await redis.zrevrange(
      "userScores",
      0,
      20,
      "WITHSCORES"
    );

    const userScores = transform(userScoresArray);
    return res.status(200).json(userScores);
  } catch (err) {
    res.status(500).json({ err: "error..." });
  }
});

app.listen(8000, () => {
  console.log(`listening on port ${8000}`);
});
