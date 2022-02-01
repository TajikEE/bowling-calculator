import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import calculatorApiRoutes from "./controllers/calculator-api";

const app: express.Application = express();
const port = 4000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
calculatorApiRoutes(app);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
