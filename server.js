const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
// ============================== >> DATABASE-CONFIG << ==================================
const db =
  require("./config/keys").mongoURI ||
  "mongodb://localhost/TODO-LIST?retryWrites=true&w=majority";
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => console.log("Couldn't connect to Mongodb " + err));
// ============================= >> END-OF-DB-CONFIG << ==================================
// ============================= >> ROUTERS-CONFIG << ====================================
const itemsRoute = require("./routes/apis/items");

app.use("/api/items", itemsRoute);

// ============================= >> END-OF-R-CONFIG << ===================================

// ============== >> LISTENING << ========================
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at 5000");
});
