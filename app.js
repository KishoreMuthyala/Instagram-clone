const express = require("express");
const app = express();
const url = require("./keys");
const mongoose = require("mongoose");
const PORT = 5000;

mongoose.connect(url.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("db connected");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

require("./models/user");
require("./models/post");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
