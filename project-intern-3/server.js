const express = require("express");

const app = express();

/* IMPORT ROUTES */

const studentRoutes =
require("./routes/studentRoutes");

/* IMPORT MIDDLEWARE */

const logger =
require("./middleware/logger");

/* MIDDLEWARE */

app.use(express.json());

app.use(logger);

/* ROUTES */

app.use("/", studentRoutes);

/* SERVER */

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});