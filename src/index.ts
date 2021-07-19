import express from "express";

const app = express();

import blockchain from "./routes/blockchain";

app.get("/", (_, res) => res.send("Root Url"));

app.use(blockchain);

app.listen(5000, () =>
  console.log("The application is listening on port 5000")
);
