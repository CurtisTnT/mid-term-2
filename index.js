import express from "express";

import connectDatabase from "./src/database/db.js";
import RootRouterV1 from "./src/routers/index.js";

const app = express();

connectDatabase();

app.use(express.json());

app.use("/api/v1", RootRouterV1);

app.listen(8080, () => {
  console.log("Server is running!");
});
