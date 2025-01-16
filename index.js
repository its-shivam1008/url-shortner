const express = require("express");
const PORT = 5000;
const app = express();
const urlRoute = require("./routes/url");

const URL = require("./models/url");
const { connectToMongoDB } = require("./connection");

app.use(express.urlencoded({extended:false}));

app.use(express.json());
connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner-DB-1")
  .then(() => console.log("Mongo Connected"))
  .catch((err) => console.log(err, "Error from mongo"));
app.use("/url", urlRoute);

app.get("/", (req, res) => {
  return res.send("hey there");
});

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry =await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry?.redirectURL);
});

app.listen(PORT, () => {
  console.log(PORT, " at server is started");
});
