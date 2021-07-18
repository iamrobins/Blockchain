import express, { Express } from "express";

const app: Express = express();

app.get("/", (_, res) => res.send("Root Url"));

app.listen(5000, () =>
  console.log("The application is listening on port 5000")
);
