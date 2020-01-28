const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use(express.json());
// ============================== >> DATABASE-CONFIG << ==================================
const db =
  process.env.DBURL ||
  "mongodb://localhost/TODO-LIST?retryWrites=tamrue&w=majority";

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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// ============================= >> END-OF-R-CONFIG << ===================================

// ============== >> LISTENING << ========================
app.listen(process.env.PORT || 5000, () => {
  console.log("Server started at 5000");
});
