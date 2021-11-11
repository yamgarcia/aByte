const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json()); //converts req body into json

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
